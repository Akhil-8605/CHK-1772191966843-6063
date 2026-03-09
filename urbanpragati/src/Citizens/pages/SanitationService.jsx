import './SanitationService.css';
import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';
import ComplaintCard from '../components/ComplaintCard';
import MapPlaceholder from '../components/MapPlaceholder';

const placeholderComplaints = [
  { id: 'SC001', title: 'Garbage not collected for 5 days', location: 'Indira Colony, Block A', date: '2026-06-03', status: 'Pending', image: null },
  { id: 'SC002', title: 'Open drain causing health hazard', location: 'Patel Nagar, Ward 12', date: '2026-05-31', status: 'In Progress', image: null },
  { id: 'SC003', title: 'Blocked sewage line', location: 'Ambedkar Road, Zone 7', date: '2026-05-26', status: 'Resolved', image: null },
];

export default function SanitationService() {
  return (
    <div className="san-service-page">
      <CitizenNavbar />

      <main className="san-main">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <span>Sanitation Services</span>
        </nav>

        <header className="service-page-header san-header">
          <div className="service-header-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="16" y="24" width="32" height="28" rx="4" fill="#006400" opacity="0.15" stroke="#006400" strokeWidth="2.5"/>
              <path d="M24 24V18a8 8 0 0 1 16 0v6" stroke="#006400" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M32 34v8" stroke="#006400" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="service-header-text">
            <h1>Sanitation Services</h1>
            <p>Report garbage collection failures, open drains, sewage blockages, and public toilet maintenance issues.</p>
          </div>
        </header>

        <div className="service-two-col">
          <section className="service-left-col">
            <div className="service-info-card card">
              <h2>Report a Sanitation Issue</h2>
              <p>Help us keep your city clean. Fill in the details below and our sanitation team will address your concern promptly.</p>

              <form className="service-form" onSubmit={e => e.preventDefault()} aria-label="Sanitation complaint form">
                <div className="form-group">
                  <label htmlFor="s-name">Your Full Name</label>
                  <input id="s-name" type="text" placeholder="e.g. Priya Verma" />
                </div>
                <div className="form-group">
                  <label htmlFor="s-phone">Mobile Number</label>
                  <input id="s-phone" type="tel" placeholder="e.g. 9876543210" />
                </div>
                <div className="form-group">
                  <label htmlFor="s-address">Address / Location</label>
                  <input id="s-address" type="text" placeholder="Street, Ward, Block" />
                </div>
                <div className="form-group">
                  <label htmlFor="s-issue">Issue Type</label>
                  <select id="s-issue">
                    <option value="">-- Select Issue --</option>
                    <option>Garbage not collected</option>
                    <option>Open drain / nala</option>
                    <option>Sewage blockage</option>
                    <option>Public toilet maintenance</option>
                    <option>Littering / Dumping</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="s-urgency">Urgency</label>
                  <select id="s-urgency">
                    <option value="">-- Select Urgency --</option>
                    <option>Normal (within 3 days)</option>
                    <option>Urgent (within 24 hours)</option>
                    <option>Emergency (immediate)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="s-desc">Description</label>
                  <textarea id="s-desc" rows={4} placeholder="Please describe the sanitation issue..." />
                </div>
                <div className="form-group">
                  <label htmlFor="s-photo">Upload Photo (optional)</label>
                  <input id="s-photo" type="file" accept="image/*" className="file-input" />
                </div>
                <button type="submit" className="btn btn-primary btn-full">Submit Complaint</button>
              </form>
            </div>

            <div className="service-mini-stats">
              <div className="mini-stat-card san-stat">
                <span className="mini-stat-num">304</span>
                <span className="mini-stat-label">Complaints This Month</span>
              </div>
              <div className="mini-stat-card san-stat">
                <span className="mini-stat-num">78%</span>
                <span className="mini-stat-label">Resolution Rate</span>
              </div>
              <div className="mini-stat-card san-stat">
                <span className="mini-stat-num">72h</span>
                <span className="mini-stat-label">Avg. Response Time</span>
              </div>
            </div>
          </section>

          <section className="service-right-col">
            <h2 className="section-heading">Recent Sanitation Complaints</h2>
            <div className="complaint-list">
              {placeholderComplaints.map(c => (
                <ComplaintCard key={c.id} complaint={c} />
              ))}
            </div>
            <div className="map-section">
              <h3 className="section-heading sm">Issue Hotspots</h3>
              <MapPlaceholder />
            </div>
          </section>
        </div>
      </main>

      <CitizenFooter />
    </div>
  );
}
