import { useState, useEffect } from 'react';
import './DeptPage.css';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';
import ComplaintDetailCard from '../components/ComplaintDetailCard';
import { getComplaintsByDepartment } from '../../firebaseOperations/db';

export default function PropertyTaxDept() {
  const [selected, setSelected] = useState(0);
  const [complaintsList, setComplaintsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getComplaintsByDepartment('Property Tax');

      const mappedComplaints = data.map(c => {
        const dateStr = c.createdAt?.toDate
          ? c.createdAt.toDate().toLocaleDateString()
          : new Date().toLocaleDateString();

        return {
          originalId: c.id,
          id: c.id.slice(-6).toUpperCase(),
          title: c.category || "Property Tax Issue",
          citizen: c.userName || c.userEmail || "Citizen",
          location: c.address || "Unknown",
          date: dateStr,
          status: c.status || "Pending",
          dept: "Property Tax",
          priority: c.priority || "Medium"
        };
      });

      setComplaintsList(mappedComplaints);
    } catch (err) {
      console.error(err);
      setError('Could not load data.');
    } finally {
      setLoading(false);
    }
  };

  const active =
    complaintsList.length > 0 && complaintsList[selected]
      ? complaintsList[selected]
      : null;
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminNavbar />
        <main className="admin-content">
          <div className="admin-page-header">
            <div>
              <p className="breadcrumb">Admin &rsaquo; Departments &rsaquo; Property Tax</p>
              <h1 className="admin-page-title">Property Tax Department</h1>
            </div>
            <button className="btn btn-primary">Export</button>
          </div>
          <div className="dept-layout">
            <div className="dept-list">
              <div className="dept-list-header">
                <span className="dept-count">{complaintsList.length} Complaints</span>
                <div className="dept-filter-row">
                  <button className="filter-chip filter-chip--active">All</button>
                  <button className="filter-chip">Pending</button>
                  <button className="filter-chip">Resolved</button>
                </div>
              </div>
              <div className="dept-list-scroll">
                {loading && <p>Loading...</p>}
                {!loading && complaintsList.map((c, i) => (
                  <ComplaintDetailCard key={c.id} complaint={c} isSelected={selected === i} onClick={() => setSelected(i)} />
                ))}
              </div>
            </div>
            <div className="dept-detail">
              {active ? (
                <>
                  <div className="dept-detail-header">
                    <div><span className="cdc-id">{active.id}</span><h2 className="dept-detail-title">{active.title}</h2></div>
                    <span className={`chip ${active.status === 'Rejected' ? 'chip-rejected' : active.status === 'Pending' ? 'chip-pending' : 'chip-resolved'}`}>{active.status}</span>
                  </div>
                  <div className="dept-info-grid">
                    <div className="dept-info-item"><span className="dept-info-label">Citizen</span><span>{active.citizen}</span></div>
                    <div className="dept-info-item"><span className="dept-info-label">Location</span><span>{active.location}</span></div>
                    <div className="dept-info-item"><span className="dept-info-label">Date Filed</span><span>{active.date}</span></div>
                    <div className="dept-info-item"><span className="dept-info-label">Priority</span><span>{active.priority}</span></div>
                  </div>
                  <div className="dept-img-placeholder" aria-label="Document placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    <span>Document / Receipt placeholder</span>
                  </div>
                  <div className="dept-assign-section">
                    <h3 className="dept-section-title">Assign Officer</h3>
                    <div className="dept-assign-row">
                      <select className="dept-select" aria-label="Select officer"><option value="">-- Select Officer --</option></select>
                      <button className="btn btn-primary">Assign</button>
                    </div>
                  </div>
                  <div className="dept-timeline-section">
                    <h3 className="dept-section-title">Status Timeline</h3>
                    <ol className="dept-timeline">
                      <li className="dept-timeline-item dept-timeline-item--done">
                        <span className="dept-timeline-dot" aria-hidden="true" />
                        <div className="dept-timeline-content"><span className="dept-timeline-step">Complaint Registered</span><span className="dept-timeline-date">{active.date}</span></div>
                      </li>
                      <li className={`dept-timeline-item ${active.status !== 'Pending' ? 'dept-timeline-item--done' : ''}`}>
                        <span className="dept-timeline-dot" aria-hidden="true" />
                        <div className="dept-timeline-content"><span className="dept-timeline-step">Review Verified</span><span className="dept-timeline-date">{active.status !== 'Pending' ? '✓' : '—'}</span></div>
                      </li>
                      <li className={`dept-timeline-item ${active.status === 'Resolved' || active.status === 'Rejected' ? 'dept-timeline-item--done' : ''}`}>
                        <span className="dept-timeline-dot" aria-hidden="true" />
                        <div className="dept-timeline-content"><span className="dept-timeline-step">Closed</span><span className="dept-timeline-date">{active.status === 'Resolved' || active.status === 'Rejected' ? '✓' : '—'}</span></div>
                      </li>
                    </ol>
                  </div>
                  <div className="dept-action-row">
                    <button className="btn btn-secondary">Reject</button>
                    <button className="btn btn-primary">Mark Resolved</button>
                  </div>
                </>
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                  <p>Select a complaint to view details.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
