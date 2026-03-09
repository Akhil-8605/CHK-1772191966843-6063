import { useState } from 'react';
import CitizenNavbar from './Citizens/components/CitizenNavbar';
import CitizenFooter from './Citizens/components/CitizenFooter';
import ServiceCard from './Citizens/components/ServiceCard';
import ComplaintCard from './Citizens/components/ComplaintCard';
import LeaderboardCard from './Citizens/components/LeaderboardCard';
import MapPlaceholder from './Citizens/components/MapPlaceholder';
import './HomePage.css';

const recentComplaints = [
  { id: 'C-2401', title: 'Water pipe burst on MG Road', location: 'MG Road, Sector 4', date: '10 Jan 2026', status: 'In Progress', dept: 'Water Dept.' },
  { id: 'C-2398', title: 'Street light not working', location: 'Green Park, Block A', date: '8 Jan 2026', status: 'Pending', dept: 'Electricity' },
  { id: 'C-2390', title: 'Garbage not collected for 3 days', location: 'Lajpat Nagar', date: '5 Jan 2026', status: 'Resolved', dept: 'Sanitation' },
];

const leaderboard = [
  { name: 'Priya Sharma', city: 'New Delhi', points: 1860, complaints: 48, verified: 42 },
  { name: 'Amit Patel', city: 'Mumbai', points: 1650, complaints: 41, verified: 35 },
  { name: 'Kavya Reddy', city: 'Bengaluru', points: 1420, complaints: 38, verified: 31 },
  { name: 'Rajesh Singh', city: 'Ahmedabad', points: 1210, complaints: 30, verified: 26 },
  { name: 'Sunita Nair', city: 'Hyderabad', points: 1080, complaints: 27, verified: 22 },
];

const steps = [
  { num: '01', title: 'Register', desc: 'Create your free citizen account in minutes.', icon: '👤' },
  { num: '02', title: 'Report', desc: 'Log any civic issue with a photo and your location.', icon: '📷' },
  { num: '03', title: 'Track', desc: 'Watch real-time status updates as your complaint is resolved.', icon: '📡' },
  { num: '04', title: 'Rate & Earn', desc: 'Rate resolved issues and earn Pragati Points for being proactive.', icon: '⭐' },
];

function HomePage() {
  return (
    <div className="cdash-page">
      <CitizenNavbar />

      <section className="cdash-hero" aria-labelledby="hero-title">

        <img
          src="https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNpdHl8ZW58MHwwfDB8fHww"
          alt="Smart City"
          className="cdash-hero__bg"
        />

        <div className="cdash-hero__overlay" />

        <div className="container cdash-hero__content">

          <div className="cdash-hero-top">
            <div className="cdash-hero__badge">
              Government of India — Smart City Initiative
            </div>
          </div>

          <h1 className="cdash-hero__title" id="hero-title">
            Urban Pragati
          </h1>

          <p className="cdash-hero__tagline">
            Empowering Citizens, Improving Cities
          </p>

          <p className="cdash-hero__sub">
            Report civic issues, track resolutions, pay taxes, and vote on city
            projects — all in one unified digital platform.
          </p>

          <div className="cdash-hero__ctas">
            <a href="#services" className="btn-primary">
              Explore Services
            </a>

            <a href="/login" className="btn-secondary">
              Login / Register
            </a>
          </div>

          <div className="cdash-hero__stats">
            {[
              { num: "2.4M+", label: "Citizens Registered" },
              { num: "98K+", label: "Issues Resolved" },
              { num: "4.7★", label: "Average Rating" },
            ].map((s, i) => (
              <div key={i} className="cdash-hero-stat">
                <span className="cdash-hero-stat__num">{s.num}</span>
                <span className="cdash-hero-stat__label">{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      <main>

        <section className="cdash-how" aria-labelledby="how-heading">
          <div className="container">
            <div className="text-center" style={{ marginBottom: 'var(--space-10)' }}>
              <h2 className="section-title" id="how-heading">How It Works</h2>
              <p className="section-subtitle">Four simple steps to a better city</p>
            </div>
            <div className="cdash-steps">
              {steps.map((step, i) => (
                <div key={i} className="cdash-step fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="cdash-step__num">{step.num}</div>
                  <div className="cdash-step__icon" aria-hidden="true">{step.icon}</div>
                  <h3 className="cdash-step__title">{step.title}</h3>
                  <p className="cdash-step__desc">{step.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="cdash-step__arrow" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cdash-section" aria-labelledby="complaints-heading">
          <div className="container">
            <div className="cdash-2col">
              <div>
                <div className="cdash-section-header" style={{ marginBottom: 'var(--space-4)' }}>
                  <div>
                    <h2 className="section-title" id="complaints-heading">Recent Complaints</h2>
                    <p className="section-subtitle">Your latest civic reports</p>
                  </div>
                  <button className="btn btn-outline btn-sm">View All</button>
                </div>
                <div className="cdash-complaints-list">
                  {recentComplaints.map((c, i) => (
                    <ComplaintCard key={i} complaint={c} />
                  ))}
                </div>
              </div>

              <div>
                <div className="cdash-section-header" style={{ marginBottom: 'var(--space-4)' }}>
                  <div>
                    <h2 className="section-title">Complaint Map</h2>
                    <p className="section-subtitle">Issues near your location</p>
                  </div>
                </div>
                <MapPlaceholder height={360} />
              </div>
            </div>
          </div>
        </section>

        <section className="cdash-leaderboard" aria-labelledby="lb-heading">
          <div className="container">
            <div className="cdash-section-header" style={{ marginBottom: 'var(--space-6)' }}>
              <div>
                <h2 className="section-title" id="lb-heading">Best Citizens of the Month</h2>
                <p className="section-subtitle">Celebrating proactive civic contributors</p>
              </div>
              <a href="/citizen/best-citizen" className="btn btn-ghost btn-sm">Full Leaderboard</a>
            </div>
            <div className="cdash-lb-grid">
              {leaderboard.map((entry, i) => (
                <LeaderboardCard key={i} entry={entry} rank={i + 1} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <CitizenFooter />
    </div>
  );
}

export default HomePage;
