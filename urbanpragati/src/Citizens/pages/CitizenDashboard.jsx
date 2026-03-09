import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';
import ServiceCard from '../components/ServiceCard';
import './CitizenDashboard.css';

const services = [
    { icon: '💧', title: 'Water Services', description: 'Report leaks, request new connections, and track water quality issues in your area.', to: '/citizen/water', color: '#3B82F6', stats: [{ value: '14', label: 'Open' }, { value: '82', label: 'Resolved' }] },
    { icon: '⚡', title: 'Electricity', description: 'Report power outages, faulty meters, and streetlight issues instantly.', to: '/citizen/electricity', color: '#F59E0B', stats: [{ value: '8', label: 'Open' }, { value: '61', label: 'Resolved' }] },
    { icon: '🗑️', title: 'Sanitation', description: 'Garbage collection requests, overflowing bins, and cleanliness grievances.', to: '/citizen/sanitation', color: '#10B981', stats: [{ value: '22', label: 'Open' }, { value: '95', label: 'Resolved' }] },
    { icon: '🏠', title: 'Property Tax', description: 'Pay property tax online, download receipts, and check assessment history.', to: '/citizen/property-tax', color: '#8B5CF6', stats: [{ value: '₹4,280', label: 'Due' }, { value: 'Paid', label: 'Status' }] },
    { icon: '🛣️', title: 'Road Repair', description: 'Report potholes, broken footpaths, and damaged road markings near you.', to: '/citizen/road-repair', color: '#EF4444', stats: [{ value: '7', label: 'Open' }, { value: '43', label: 'Resolved' }] },
    { icon: '🏗️', title: 'Development', description: 'Vote on proposed city projects, parks, libraries, and public infrastructure.', to: '/citizen/development', color: '#FF6F00', stats: [{ value: '12', label: 'Proposals' }, { value: '3.2K', label: 'Votes' }] },
    { icon: '💬', title: 'Feedback', description: 'Share your thoughts on city services and rate your recent experiences.', to: '/citizen/feedback', color: '#06B6D4', stats: [{ value: '4.2', label: 'Rating' }, { value: '340', label: 'Reviews' }] },
    { icon: '🏆', title: 'Best Citizen', description: 'Top contributors who make their city better. Monthly leaderboard updated live.', to: '/citizen/best-citizen', color: '#FFD700', stats: [{ value: '1.2K', label: 'Citizens' }, { value: '24', label: 'Winners' }] },
];

function CitizenDashboard() {
    return (
        <div className="cdash-page">
            <CitizenNavbar />
            <main>
                <section className="cdash-section" id="services" aria-labelledby="services-heading">
                    <div className="container">
                        <div className="cdash-section-header">
                            <div>
                                <h2 className="section-title" id="services-heading">City Services</h2>
                                <p className="section-subtitle">Access all municipal services in one seamless portal</p>
                            </div>
                            <div className="accent-bar" style={{ marginBottom: 0 }} />
                        </div>
                        <div className="cdash-services-grid">
                            {services.map((s, i) => (
                                <ServiceCard key={i} {...s} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <CitizenFooter />
        </div>
    );
}

export default CitizenDashboard;