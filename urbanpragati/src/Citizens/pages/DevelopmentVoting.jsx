import { useState } from 'react';
import './DevelopmentVoting.css';
import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';

const proposals = [
  { id: 'P001', title: 'New Community Park', category: 'Recreation', description: 'A 5-acre green park with walking trails, children\'s play area, and seating zones in Sector 22.', interested: 1284, notInterested: 142, status: 'Active', color: '#006400' },
  { id: 'P002', title: 'Digital Library Hub', category: 'Education', description: 'A modern public library with high-speed internet, e-reading stations, and study rooms.', interested: 976, notInterested: 88, status: 'Active', color: '#0B5FFF' },
  { id: 'P003', title: 'Children\'s Playground', category: 'Recreation', description: 'Safe, modern playground equipment for kids aged 3–14 near the primary school zone.', interested: 1540, notInterested: 64, status: 'Active', color: '#FF6F00' },
  { id: 'P004', title: 'Rainwater Harvesting Units', category: 'Environment', description: 'Installing 50 rooftop rainwater harvesting systems across residential zones.', interested: 822, notInterested: 203, status: 'Active', color: '#006400' },
  { id: 'P005', title: 'Smart Street Lighting', category: 'Infrastructure', description: 'Sensor-based LED street lights that auto-dim at low-traffic hours, saving 40% energy.', interested: 1105, notInterested: 97, status: 'Active', color: '#0B5FFF' },
  { id: 'P006', title: 'Solid Waste Recycling Centre', category: 'Environment', description: 'A community-level dry waste recycling facility with collection bins and processing units.', interested: 744, notInterested: 312, status: 'Completed', color: '#006400' },
];

export default function DevelopmentVoting() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="voting-page">
      <CitizenNavbar />

      <main className="voting-main">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <span>Development Voting</span>
        </nav>

        <header className="voting-header">
          <div>
            <h1>Development Proposals</h1>
            <p>Vote on upcoming urban development projects. Your opinion shapes the future of your city.</p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
            aria-haspopup="dialog"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
            </svg>
            Add Proposal
          </button>
        </header>

        <div className="voting-stats-bar">
          <div className="voting-stat">
            <span className="vs-num">6</span>
            <span className="vs-label">Total Proposals</span>
          </div>
          <div className="voting-stat">
            <span className="vs-num">5</span>
            <span className="vs-label">Active Voting</span>
          </div>
          <div className="voting-stat">
            <span className="vs-num">6,473</span>
            <span className="vs-label">Total Votes Cast</span>
          </div>
          <div className="voting-stat">
            <span className="vs-num">1</span>
            <span className="vs-label">Completed</span>
          </div>
        </div>

        <div className="proposals-grid">
          {proposals.map((p) => {
            const total = p.interested + p.notInterested;
            const pct = Math.round((p.interested / total) * 100);
            return (
              <article className="proposal-card card" key={p.id}>
                <div className="proposal-band" style={{ background: p.color }} aria-hidden="true" />

                <div className="proposal-body">
                  <div className="proposal-top">
                    <span className="proposal-category">{p.category}</span>
                    <span className={`status-chip ${p.status === 'Completed' ? 'resolved' : 'in-progress'}`}>
                      {p.status}
                    </span>
                  </div>
                  <h2 className="proposal-title">{p.title}</h2>
                  <p className="proposal-desc">{p.description}</p>

                  <div className="vote-meter" aria-label={`${pct}% interested`}>
                    <div className="vote-meter-bar">
                      <div className="vote-meter-fill" style={{ width: `${pct}%`, background: p.color }} />
                    </div>
                    <span className="vote-pct">{pct}% Support</span>
                  </div>

                  <div className="vote-counters">
                    <div className="vote-counter interested">
                      <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                      </svg>
                      <span className="vote-count">{p.interested.toLocaleString()}</span>
                      <span className="vote-label">Interested</span>
                    </div>
                    <div className="vote-counter not-interested">
                      <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                        <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"/>
                      </svg>
                      <span className="vote-count">{p.notInterested.toLocaleString()}</span>
                      <span className="vote-label">Not Interested</span>
                    </div>
                  </div>

                  <div className="proposal-actions">
                    <button type="button" className="btn btn-vote-yes" disabled={p.status === 'Completed'}>Vote Interested</button>
                    <button type="button" className="btn btn-ghost btn-sm">View Details</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {modalOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div className="modal-box">
            <div className="modal-header">
              <h2 id="modal-title">Add New Proposal</h2>
              <button
                type="button"
                className="modal-close"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
                </svg>
              </button>
            </div>
            <form className="modal-form" onSubmit={e => e.preventDefault()} aria-label="Add proposal form">
              <div className="form-group">
                <label htmlFor="m-title">Proposal Title</label>
                <input id="m-title" type="text" placeholder="e.g. Community Sports Complex" />
              </div>
              <div className="form-group">
                <label htmlFor="m-category">Category</label>
                <select id="m-category">
                  <option value="">-- Select Category --</option>
                  <option>Recreation</option>
                  <option>Education</option>
                  <option>Infrastructure</option>
                  <option>Environment</option>
                  <option>Healthcare</option>
                  <option>Transport</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="m-location">Location / Ward</label>
                <input id="m-location" type="text" placeholder="e.g. Sector 11, Ward 6" />
              </div>
              <div className="form-group">
                <label htmlFor="m-desc">Description</label>
                <textarea id="m-desc" rows={4} placeholder="Describe the proposed development in detail..." />
              </div>
              <div className="form-group">
                <label htmlFor="m-benefit">Expected Benefit</label>
                <textarea id="m-benefit" rows={2} placeholder="How will this benefit the community?" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit Proposal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <CitizenFooter />
    </div>
  );
}
