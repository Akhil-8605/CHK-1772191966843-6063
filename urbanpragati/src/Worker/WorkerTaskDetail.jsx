import './WorkerTaskDetail.css';
import MapPlaceholder from '../Citizens/components/MapPlaceholder';
const task = {
  id: 'CMP-1042',
  title: 'Water Leak Near Block C',
  citizen: 'Ramesh Sharma',
  phone: '+91 98765 43210',
  location: 'Sector 14, Noida, UP - 201301',
  date: '12 Mar 2025, 10:30 AM',
  status: 'In Progress',
  priority: 'High',
  dept: 'Water',
  description:
    'A major water pipeline near Block C has been leaking for the past 2 days causing road damage and waterlogging. Immediate repair required to prevent further damage to the road and surrounding property.',
  images: [1, 2, 3],
};
const timeline = [
  { step: 'Complaint Registered', date: '12 Mar 2025, 10:30 AM', done: true },
  { step: 'Reviewed by Admin', date: '12 Mar 2025, 02:15 PM', done: true },
  { step: 'Worker Assigned', date: '13 Mar 2025, 09:00 AM', done: true },
  { step: 'Work In Progress', date: '13 Mar 2025, 11:00 AM', done: true },
  { step: 'Resolved', date: '—', done: false },
];
export default function WorkerTaskDetail() {
  return (
    <div className="worker-page">
      <header className="worker-navbar">
        <div className="worker-navbar-brand">
          <div className="worker-logo-dot" aria-hidden="true" />
          <span className="worker-brand-text">Urban Pragati — Task Detail</span>
        </div>
        <div className="worker-navbar-right">
          <a href="/worker/tasks" className="worker-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
            My Tasks
          </a>
          <div className="worker-avatar" aria-label="User avatar">R</div>
        </div>
      </header>
      <main className="worker-content">
        <div className="wtd-layout">
          <div className="wtd-main">
            <div className="wtd-header-card">
              <div className="wtd-header-top">
                <div>
                  <p className="breadcrumb">My Tasks &rsaquo; {task.id}</p>
                  <h1 className="wtd-title">{task.title}</h1>
                </div>
                <span className="chip chip-inprogress">{task.status}</span>
              </div>
              <div className="wtd-badges">
                <span className={`cdc-priority cdc-priority--${task.priority.toLowerCase()}`}>{task.priority} Priority</span>
                <span className="table-dept-badge">{task.dept}</span>
              </div>
            </div>
            <div className="wtd-card">
              <h2 className="dept-section-title">Complaint Details</h2>
              <p className="wtd-description">{task.description}</p>
              <div className="wtd-info-grid">
                <div className="dept-info-item"><span className="dept-info-label">Citizen</span><span>{task.citizen}</span></div>
                <div className="dept-info-item"><span className="dept-info-label">Phone</span><span>{task.phone}</span></div>
                <div className="dept-info-item"><span className="dept-info-label">Location</span><span>{task.location}</span></div>
                <div className="dept-info-item"><span className="dept-info-label">Filed On</span><span>{task.date}</span></div>
              </div>
            </div>
            <div className="wtd-card">
              <h2 className="dept-section-title">Photo Evidence</h2>
              <div className="wtd-gallery">
                {task.images.map((i) => (
                  <div key={i} className="wtd-gallery-item" aria-label={`Evidence photo ${i}`}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <span>Photo {i}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="wtd-card">
              <h2 className="dept-section-title">Upload Proof of Work</h2>
              <p className="wtd-upload-hint">Upload photos or documents as proof that the work has been completed.</p>
              <label className="wtd-upload-zone" htmlFor="proof-upload" aria-label="Upload proof files">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5" aria-hidden="true">
                  <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                </svg>
                <span className="wtd-upload-label">Click to upload or drag &amp; drop</span>
                <span className="wtd-upload-sub">PNG, JPG, PDF up to 10MB</span>
                <input id="proof-upload" type="file" multiple accept="image/*,.pdf" className="wtd-file-input" tabIndex={-1} />
              </label>
            </div>
            <div className="wtd-actions">
              <button className="btn btn-secondary">Report an Issue</button>
              <button className="btn btn-secondary">Start Work</button>
              <button className="btn btn-primary wtd-btn-resolve">Mark as Resolved</button>
            </div>
          </div>
          <aside className="wtd-sidebar">
            <div className="wtd-card">
              <h2 className="dept-section-title">Status Timeline</h2>
              <ol className="dept-timeline" aria-label="Task timeline">
                {timeline.map((t, i) => (
                  <li key={i} className={`dept-timeline-item ${t.done ? 'dept-timeline-item--done' : ''}`}>
                    <span className="dept-timeline-dot" aria-hidden="true" />
                    <div className="dept-timeline-content">
                      <span className="dept-timeline-step">{t.step}</span>
                      <span className="dept-timeline-date">{t.date}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="wtd-card">
              <h2 className="dept-section-title">Task Location</h2>
              <MapPlaceholder />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
