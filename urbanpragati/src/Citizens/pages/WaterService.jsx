import './WaterService.css';
import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';
import ComplaintCard from '../components/ComplaintCard';
import MapPlaceholder from '../components/MapPlaceholder';

const placeholderComplaints = [
  { id: 'WC001', title: 'No water supply since 3 days', location: 'Sector 14, Block B', date: '2026-06-01', status: 'Pending', image: null },
  { id: 'WC002', title: 'Pipe leakage near main road', location: 'Gandhi Nagar, Ward 5', date: '2026-05-28', status: 'In Progress', image: null },
  { id: 'WC003', title: 'Contaminated water supply', location: 'Nehru Colony, Zone 3', date: '2026-05-25', status: 'Resolved', image: null },
];

export default function WaterService() {
  return (
    <div className="water-service-page">
      <CitizenNavbar />

      <main className="water-main">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <span>Water Supply Services</span>
        </nav>

        <header className="service-page-header water-header">
          <div className="service-header-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 4C32 4 10 28 10 40a22 22 0 0 0 44 0C54 28 32 4 32 4z" fill="#0B5FFF" opacity="0.2" stroke="#0B5FFF" strokeWidth="2.5" />
              <path d="M22 44a10 10 0 0 0 14 0" stroke="#0B5FFF" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="service-header-text">
            <h1>Water Supply Services</h1>
            <p>Report water supply issues, pipe leakages, contamination, and request new connections.</p>
          </div>
        </header>

        <div className="service-two-col">
          <section className="service-left-col">
            <div className="service-info-card card">
              <div className="service-info-icon-wrap water-icon-wrap">
                <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
                  <path d="M32 4C32 4 10 28 10 40a22 22 0 0 0 44 0C54 28 32 4 32 4z" fill="#0B5FFF" opacity="0.15" stroke="#0B5FFF" strokeWidth="2.5" />
                </svg>
              </div>
              <h2>Report a Water Issue</h2>
              <p>Fill in the details below to register your complaint. Our team will respond within 48 hours.</p>

              <form className="service-form" onSubmit={e => e.preventDefault()} aria-label="Water complaint form">
                <div className="form-group">
                  <label htmlFor="w-name">Your Full Name</label>
                  <input id="w-name" type="text" placeholder="e.g. Rajesh Kumar" />
                </div>
                <div className="form-group">
                  <label htmlFor="w-phone">Mobile Number</label>
                  <input id="w-phone" type="tel" placeholder="e.g. 9876543210" />
                </div>
                <div className="form-group">
                  <label htmlFor="w-address">Address / Location</label>
                  <input id="w-address" type="text" placeholder="Street, Ward, Sector" />
                </div>
                <div className="form-group">
                  <label htmlFor="w-issue">Issue Type</label>
                  <select id="w-issue">
                    <option value="">-- Select Issue --</option>
                    <option>No water supply</option>
                    <option>Pipe leakage</option>
                    <option>Contaminated water</option>
                    <option>New connection request</option>
                    <option>Billing dispute</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="w-desc">Description</label>
                  <textarea id="w-desc" rows={4} placeholder="Describe your issue in detail..." />
                </div>
                <div className="form-group">
                  <label htmlFor="w-photo">Upload Photo (optional)</label>
                  <input id="w-photo" type="file" accept="image/*" className="file-input" />
                </div>
                <button type="submit" className="btn btn-primary btn-full">Submit Complaint</button>
              </form>
            </div>

            <div className="service-mini-stats">
              <div className="mini-stat-card">
                <span className="mini-stat-num">142</span>
                <span className="mini-stat-label">Complaints This Month</span>
              </div>
              <div className="mini-stat-card">
                <span className="mini-stat-num">89%</span>
                <span className="mini-stat-label">Resolution Rate</span>
              </div>
              <div className="mini-stat-card">
                <span className="mini-stat-num">36h</span>
                <span className="mini-stat-label">Avg. Response Time</span>
              </div>
            </div>
          </section>

          <section className="service-right-col">
            <h2 className="section-heading">Recent Water Complaints</h2>
            <div className="complaint-list">
              {placeholderComplaints.map(c => (
                <ComplaintCard key={c.id} complaint={c} />
              ))}
            </div>
            <div className="map-section">
              <h3 className="section-heading sm">Complaint Hotspots</h3>
              <MapPlaceholder />
            </div>
          </section>
        </div>
      </main>

      <CitizenFooter />
    </div>
  );
}
