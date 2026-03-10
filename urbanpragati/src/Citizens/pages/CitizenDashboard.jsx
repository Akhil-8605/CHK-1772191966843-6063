import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';
import ServiceCard from '../components/ServiceCard';
import { getComplaintsByUser } from '../../firebaseOperations/db';
import { getUserProfile } from '../../firebaseOperations/auth';
import './CitizenDashboard.css';

const servicesTemplate = [
    { icon: '💧', id: 'Water', title: 'Water Services', description: 'Report leaks, request new connections, and track water quality issues in your area.', to: '/citizen/water', color: '#3B82F6', stats: [] },
    { icon: '⚡', id: 'Electricity', title: 'Electricity', description: 'Report power outages, faulty meters, and streetlight issues instantly.', to: '/citizen/electricity', color: '#F59E0B', stats: [] },
    { icon: '🗑️', id: 'Sanitation', title: 'Sanitation', description: 'Garbage collection requests, overflowing bins, and cleanliness grievances.', to: '/citizen/sanitation', color: '#10B981', stats: [] },
    { icon: '🏠', id: 'Property Tax', title: 'Property Tax', description: 'Pay property tax online, download receipts, and check assessment history.', to: '/citizen/property-tax', color: '#8B5CF6', stats: [] },
    { icon: '🛣️', id: 'Road Repair', title: 'Road Repair', description: 'Report potholes, broken footpaths, and damaged road markings near you.', to: '/citizen/road-repair', color: '#EF4444', stats: [] },
    { icon: '🏗️', id: 'Development', title: 'Development', description: 'Vote on proposed city projects, parks, libraries, and public infrastructure.', to: '/citizen/development', color: '#FF6F00', stats: [] },
    { icon: '💬', id: 'Feedback', title: 'Feedback', description: 'Share your thoughts on city services and rate your recent experiences.', to: '/citizen/feedback', color: '#06B6D4', stats: [] },
    { icon: '🏆', id: 'Best Citizen', title: 'Best Citizen', description: 'Top contributors who make their city better. Monthly leaderboard updated live.', to: '/citizen/best-citizen', color: '#FFD700', stats: [] },
];

function CitizenDashboard() {
    const [userData, setUserData] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [timelineData, setTimelineData] = useState([]);
    const [services, setServices] = useState(servicesTemplate);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Get user from local storage initially
                const storedUserStr = localStorage.getItem('userData');
                let userParams = null;
                if (storedUserStr) {
                    userParams = JSON.parse(storedUserStr);
                } else {
                    // fallback if not found
                    return;
                }

                // Fetch latest user profile for points
                let freshUser = userParams;
                try {
                    const profile = await getUserProfile(userParams.uid, 'citizen');
                    if (profile) {
                        freshUser = profile;
                        setUserData(profile);
                    } else {
                        setUserData(userParams);
                    }
                } catch (e) {
                    // Profile fetch failed, use stored
                    setUserData(userParams);
                }

                // Fetch complaints
                const userComplaints = await getComplaintsByUser(freshUser.uid);
                setComplaints(userComplaints);

                // Process chart data
                const categoryCounts = {};
                userComplaints.forEach(c => {
                    const dept = c.department || c.category || 'Other';
                    if (!categoryCounts[dept]) categoryCounts[dept] = { name: dept, Pending: 0, Resolved: 0 };

                    if (c.status === 'Resolved' || c.status === 'Done' || c.status === 'Approved') {
                        categoryCounts[dept].Resolved += 1;
                    } else {
                        categoryCounts[dept].Pending += 1;
                    }
                });
                setChartData(Object.values(categoryCounts));

                // Process timeline data (complaints over time)
                const timelineCounts = {};
                const sortedComplaints = [...userComplaints].sort((a, b) => {
                    const timeA = a.createdAt?.seconds || 0;
                    const timeB = b.createdAt?.seconds || 0;
                    return timeA - timeB;
                });

                sortedComplaints.forEach(c => {
                    let dateStr = 'Unknown';
                    if (c.createdAt && c.createdAt.seconds) {
                        const d = new Date(c.createdAt.seconds * 1000);
                        dateStr = `${d.getDate()}/${d.getMonth() + 1}`;
                    }
                    if (!timelineCounts[dateStr]) timelineCounts[dateStr] = { date: dateStr, count: 0 };
                    timelineCounts[dateStr].count += 1;
                });
                setTimelineData(Object.values(timelineCounts));

                // Update services stats
                const updatedServices = servicesTemplate.map(s => {
                    const deptComplaints = userComplaints.filter(c => (c.department === s.id || c.category === s.id));
                    let pending = 0;
                    let resolved = 0;
                    deptComplaints.forEach(c => {
                        if (c.status === 'Resolved' || c.status === 'Done' || c.status === 'Approved') resolved++;
                        else pending++;
                    });

                    // Custom defaults for non-complaint categories
                    if (s.id === 'Property Tax') {
                        return { ...s, stats: [{ value: '₹0', label: 'Due' }, { value: 'Paid', label: 'Status' }] };
                    }
                    if (s.id === 'Development' || s.id === 'Best Citizen' || s.id === 'Feedback') {
                        return s; // Keep defaults or empty
                    }

                    return {
                        ...s,
                        stats: [
                            { value: pending.toString(), label: 'Open' },
                            { value: resolved.toString(), label: 'Resolved' }
                        ]
                    };
                });
                setServices(updatedServices);

                // Generate notifications based on recent events
                const recentNotifs = [];
                const recentComplaints = sortedComplaints.reverse().slice(0, 5);
                recentComplaints.forEach((c, idx) => {
                    let icon = '📩';
                    let title = 'Complaint Logged';
                    if (c.status === 'Approved' || c.status === 'Resolved' || c.status === 'Done') {
                        icon = '✅'; title = 'Complaint Resolved';
                    } else if (c.status === 'Assigned') {
                        icon = '👨‍🔧'; title = 'Worker Assigned';
                    }

                    let timeAgo = 'recently';
                    if (c.updatedAt && c.updatedAt.seconds) {
                        const diffHours = Math.floor((Date.now() / 1000 - c.updatedAt.seconds) / 3600);
                        if (diffHours < 24) timeAgo = `${diffHours}h ago`;
                        else timeAgo = `${Math.floor(diffHours / 24)}d ago`;
                    }

                    recentNotifs.push({
                        id: c.id || idx,
                        title: title,
                        desc: `Your ${c.department || 'service'} complaint is currently ${c.status}.`,
                        time: timeAgo,
                        icon: icon
                    });
                });

                // Add points notification if applicable
                if (freshUser.rewardPoints > 0) {
                    recentNotifs.unshift({
                        id: 'points-notif',
                        title: 'Reward Points Earned',
                        desc: `You have accumulated ${freshUser.rewardPoints} points for your proactive reporting!`,
                        time: 'Just now',
                        icon: '🏆'
                    });
                }

                setNotifications(recentNotifs);

            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const userPoints = userData?.rewardPoints || 0;
    const userRoleText = userPoints > 500 ? 'Elite Citizen' : userPoints > 200 ? 'Proactive Citizen' : 'Citizen';
    const rankColor = userPoints > 500 ? '#FFD700' : userPoints > 200 ? '#10B981' : '#3B82F6';

    return (
        <div className="cdash-gamified-page">
            <CitizenNavbar />

            <main className="cdash-main-content">
                {/* HERO / GAMIFICATION SECTION */}
                <section className="cdash-hero-gamify">
                    <div className="cdash-hero-content">
                        <div className="cdash-welcome">
                            <h1>Welcome back, <span className="cdash-highlight">{userData?.displayName || userData?.name || 'Citizen'}</span></h1>
                            <p>Track your impact, manage requests, and earn points for keeping the city clean.</p>
                        </div>

                        <div className="cdash-level-card">
                            <div className="cdash-level-badge" style={{ backgroundColor: `${rankColor}20`, color: rankColor, border: `1px solid ${rankColor}50` }}>
                                {userRoleText}
                            </div>
                            <div className="cdash-points-display">
                                <div className="cdash-points-number" style={{ color: rankColor }}>{userPoints}</div>
                                <div className="cdash-points-label">Pragati Points</div>
                            </div>
                            <div className="cdash-progress-container">
                                <div className="cdash-progress-info">
                                    <span>Level Progress</span>
                                    <span>{userPoints} / {userPoints > 200 ? (userPoints > 500 ? 1000 : 500) : 200}</span>
                                </div>
                                <div className="cdash-progress-bar">
                                    <div
                                        className="cdash-progress-fill"
                                        style={{
                                            width: `${Math.min(100, (userPoints / (userPoints > 200 ? (userPoints > 500 ? 1000 : 500) : 200)) * 100)}%`,
                                            backgroundColor: rankColor
                                        }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="cdash-grid-layout">
                    {/* LEFT COLUMN: CHARTS */}
                    <div className="cdash-left-col">
                        <div className="cdash-glass-panel">
                            <div className="cdash-panel-header">
                                <h3>Issue Distribution</h3>
                                <p className="cdash-panel-subtitle">Complaints by Category & Status</p>
                            </div>
                            <div className="cdash-chart-container">
                                {loading || chartData.length === 0 ? (
                                    <div className="cdash-empty-state">Not enough data to display chart.</div>
                                ) : (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff20" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                            <Tooltip
                                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                                contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(31,41,55,0.9)', color: '#fff' }}
                                                itemStyle={{ color: '#E5E7EB' }}
                                            />
                                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                                            <Bar dataKey="Pending" fill="#F59E0B" radius={[6, 6, 0, 0]} maxBarSize={40} animationDuration={1500} />
                                            <Bar dataKey="Resolved" fill="#10B981" radius={[6, 6, 0, 0]} maxBarSize={40} animationDuration={1500} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </div>

                        <div className="cdash-glass-panel">
                            <div className="cdash-panel-header">
                                <h3>Activity Timeline</h3>
                                <p className="cdash-panel-subtitle">Your submissions over time</p>
                            </div>
                            <div className="cdash-chart-container cdash-chart-small">
                                {loading || timelineData.length === 0 ? (
                                    <div className="cdash-empty-state">Submit complaints to see activity.</div>
                                ) : (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} fontSize={12} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} fontSize={12} allowDecimals={false} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: 'rgba(0,0,0,0.8)' }}
                                            />
                                            <Area type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" animationDuration={2000} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: NOTIFICATIONS */}
                    <div className="cdash-right-col">
                        <div className="cdash-glass-panel cdash-notifications-panel">
                            <div className="cdash-panel-header">
                                <h3>Notifications Center</h3>
                                <div className="cdash-pulse-indicator"></div>
                            </div>

                            <div className="cdash-notifs-list">
                                {loading ? (
                                    <p className="cdash-notif-loading">Loading notifications...</p>
                                ) : notifications.length > 0 ? (
                                    notifications.map((n, i) => (
                                        <div key={n.id} className="cdash-notif-card" style={{ animationDelay: `${i * 0.1}s` }}>
                                            <div className="cdash-notif-icon">{n.icon}</div>
                                            <div className="cdash-notif-body">
                                                <h4>{n.title}</h4>
                                                <p>{n.desc}</p>
                                                <span className="cdash-notif-time">{n.time}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="cdash-empty-state">No recent notifications.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <section className="cdash-services-section">
                    <div className="cdash-section-header">
                        <h2>City Services Hub</h2>
                        <p>Select a department to report issues or access services</p>
                        <div className="cdash-accent-line"></div>
                    </div>

                    <div className="cdash-services-grid">
                        {services.map((s, i) => (
                            <ServiceCard key={i} {...s} />
                        ))}
                    </div>
                </section>
            </main>

            <CitizenFooter />
        </div>
    );
}

export default CitizenDashboard;