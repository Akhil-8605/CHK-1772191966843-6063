import './RoadRepair.css';
import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';
import ComplaintCard from '../components/ComplaintCard';
import MapPlaceholder from '../components/MapPlaceholder';

const placeholderComplaints = [
  { id: 'RR001', title: 'Large pothole on main highway', location: 'NH-27, Km 14, Lucknow', date: '2026-06-04', status: 'In Progress', image: null },
  { id: 'RR002', title: 'Road cave-in near school zone', location: 'School Lane, Sector 8', date: '2026-06-01', status: 'Pending', image: null },
  { id: 'RR003', title: 'Broken footpath causing accidents', location: 'Civil Lines, Ward 3', date: '2026-05-29', status: 'Resolved', image: null },
];

export default function RoadRepair() {
  return (
    <div className="road-page">
      <CitizenNavbar />

      <main className="road-main">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <span>Road Repair</span>
        </nav>

        <header className="service-page-header road-header">
          <div className="service-header-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 56L22 8h20l14 48" stroke="#FF6F00" strokeWidth="2.5" strokeLinejoin="round"/>
              <line x1="32" y1="8" x2="32" y2="56" stroke="#FF6F00" strokeWidth="1.5" strokeDasharray="4 4"/>
              <circle cx="23" cy="36" r="5" fill="#FF6F00" opacity="0.3" stroke="#FF6F00" strokeWidth="2"/>
            </svg>
          </div>
          <div className="service-header-text">
            <h1>Road Repair Services</h1>
            <p>Report potholes, road cave-ins, broken footpaths, and damaged street infrastructure in your area.</p>
          </div>
        </header>

        <div className="service-two-col">
          <section className="service-left-col">
            <div className="service-info-card card">
              <h2>Report a Road Issue</h2>
              <p>Your report will be reviewed by the Public Works Department. Priority is given to safety hazards.</p>

              <form className="service-form" onSubmit={e => e.preventDefault()} aria-label="Road repair complaint form">
                <div className="form-group">
                  <label htmlFor="r-name">Your Full Name</label>
                  <input id="r-name" type="text" placeholder="e.g. Vikram Singh" />
                </div>
                <div className="form-group">
                  <label htmlFor="r-phone">Mobile Number</label>
                  <input id="r-phone" type="tel" placeholder="e.g. 9876543210" />
                </div>
                <div className="form-group">
                  <label htmlFor="r-road">Road Name / Landmark</label>
                  <input id="r-road" type="text" placeholder="e.g. MG Road near Bus Stand" />
                </div>
                <div className="form-group">
                  <label htmlFor="r-ward">Ward / Sector</label>
                  <input id="r-ward" type="text" placeholder="e.g. Ward 7, Sector 12" />
                </div>
                <div className="form-group">
                  <label htmlFor="r-issue">Issue Type</label>
                  <select id="r-issue">
                    <option value="">-- Select Issue --</option>
                    <option>Pothole</option>
                    <option>Road cave-in / sinkhole</option>
                    <option>Broken footpath</option>
                    <option>Damaged divider</option>
                    <option>Missing manhole cover</option>
                    <option>Waterlogging on road</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="r-severity">Severity</label>
                  <select id="r-severity">
                    <option value="">-- Select Severity --</option>
                    <option>Minor (cosmetic)</option>
                    <option>Moderate (slows traffic)</option>
                    <option>Severe (safety hazard)</option>
                    <option>Critical (road blocked)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="r-desc">Description</label>
                  <textarea id="r-desc" rows={4} placeholder="Please describe the road damage..." />
                </div>
                <div className="form-group">
                  <label htmlFor="r-photo">Upload Photo</label>
                  <input id="r-photo" type="file" accept="image/*" className="file-input" />
                </div>
                <button type="submit" className="btn btn-primary btn-full">Submit Report</button>
              </form>
            </div>

            <div className="service-mini-stats">
              <div className="mini-stat-card">
                <span className="mini-stat-num road-num">187</span>
                <span className="mini-stat-label">Reports This Month</span>
              </div>
              <div className="mini-stat-card">
                <span className="mini-stat-num road-num">83%</span>
                <span className="mini-stat-label">Resolution Rate</span>
              </div>
              <div className="mini-stat-card">
                <span className="mini-stat-num road-num">5d</span>
                <span className="mini-stat-label">Avg. Repair Time</span>
              </div>
            </div>
          </section>

          <section className="service-right-col">
            <h2 className="section-heading">Recent Road Complaints</h2>
            <div className="complaint-list">
              {placeholderComplaints.map(c => (
                <ComplaintCard key={c.id} complaint={c} />
              ))}
            </div>
            <div className="map-section">
              <h3 className="section-heading sm">Road Damage Map</h3>
              <MapPlaceholder />
            </div>
          </section>
        </div>
      </main>

      <CitizenFooter />
    </div>
  );
}
