import './ElectricityService.css';
import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';
import ComplaintCard from '../components/ComplaintCard';
import MapPlaceholder from '../components/MapPlaceholder';

const placeholderComplaints = [
  { id: 'EC001', title: 'Power outage since morning', location: 'Rajiv Nagar, Block C', date: '2026-06-02', status: 'In Progress', image: null },
  { id: 'EC002', title: 'Transformer overloaded', location: 'MG Road, Ward 9', date: '2026-05-30', status: 'Pending', image: null },
  { id: 'EC003', title: 'Exposed live wires on street', location: 'Shastri Colony, Zone 2', date: '2026-05-27', status: 'Resolved', image: null },
];

export default function ElectricityService() {
  return (
    <div className="elec-service-page">
      <CitizenNavbar />

      <main className="elec-main">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <span>Electricity Services</span>
        </nav>

        <header className="service-page-header elec-header">
          <div className="service-header-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M36 4L16 36h18l-6 24L52 28H34L36 4z" fill="#FF6F00" opacity="0.2" stroke="#FF6F00" strokeWidth="2.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="service-header-text">
            <h1>Electricity Services</h1>
            <p>Report power outages, transformer faults, dangerous wiring, and billing disputes with your local electricity board.</p>
          </div>
        </header>

        <div className="service-two-col">
          <section className="service-left-col">
            <div className="service-info-card card">
              <h2>Report an Electricity Issue</h2>
              <p>Use the form below to register your complaint. Emergency issues are prioritised and attended within 4 hours.</p>

              <form className="service-form" onSubmit={e => e.preventDefault()} aria-label="Electricity complaint form">
                <div className="form-group">
                  <label htmlFor="e-name">Your Full Name</label>
                  <input id="e-name" type="text" placeholder="e.g. Sunita Sharma" />
                </div>
                <div className="form-group">
                  <label htmlFor="e-phone">Mobile Number</label>
                  <input id="e-phone" type="tel" placeholder="e.g. 9876543210" />
                </div>
                <div className="form-group">
                  <label htmlFor="e-consumer">Consumer / Meter Number</label>
                  <input id="e-consumer" type="text" placeholder="e.g. UP-12345678" />
                </div>
                <div className="form-group">
                  <label htmlFor="e-address">Address / Location</label>
                  <input id="e-address" type="text" placeholder="Street, Ward, Sector" />
                </div>
                <div className="form-group">
                  <label htmlFor="e-issue">Issue Type</label>
                  <select id="e-issue">
                    <option value="">-- Select Issue --</option>
                    <option>Power outage</option>
                    <option>Voltage fluctuation</option>
                    <option>Transformer fault</option>
                    <option>Exposed wires</option>
                    <option>Bill dispute</option>
                    <option>New connection</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="e-desc">Description</label>
                  <textarea id="e-desc" rows={4} placeholder="Describe the issue in detail..." />
                </div>
                <div className="form-group">
                  <label htmlFor="e-photo">Upload Photo (optional)</label>
                  <input id="e-photo" type="file" accept="image/*" className="file-input" />
                </div>
                <button type="submit" className="btn btn-primary btn-full">Submit Complaint</button>
              </form>
            </div>

            <div className="service-mini-stats">
              <div className="mini-stat-card elec-stat">
                <span className="mini-stat-num">218</span>
                <span className="mini-stat-label">Complaints This Month</span>
              </div>
              <div className="mini-stat-card elec-stat">
                <span className="mini-stat-num">92%</span>
                <span className="mini-stat-label">Resolution Rate</span>
              </div>
              <div className="mini-stat-card elec-stat">
                <span className="mini-stat-num">4h</span>
                <span className="mini-stat-label">Emergency Response</span>
              </div>
            </div>
          </section>

          <section className="service-right-col">
            <h2 className="section-heading">Recent Electricity Complaints</h2>
            <div className="complaint-list">
              {placeholderComplaints.map(c => (
                <ComplaintCard key={c.id} complaint={c} />
              ))}
            </div>
            <div className="map-section">
              <h3 className="section-heading sm">Outage Hotspots</h3>
              <MapPlaceholder />
            </div>
          </section>
        </div>
      </main>

      <CitizenFooter />
    </div>
  );
}
