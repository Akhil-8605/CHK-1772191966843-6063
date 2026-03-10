import { useState, useEffect } from 'react';
import './DeptPage.css';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';
import ComplaintDetailCard from '../components/ComplaintDetailCard';
import { getComplaintsByDepartment, getWorkersByDepartment, assignComplaintToWorker } from '../../firebaseOperations/db';

export default function RoadRepairDept() {
  const [selected, setSelected] = useState(0);
  const [complaintsList, setComplaintsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workersList, setWorkersList] = useState([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedWorkerId('');
  }, [selected]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const complaintsData = await getComplaintsByDepartment("Road Repair");
      const wData = await getWorkersByDepartment("Road Repair");

      setWorkersList(wData);

      const mappedComplaints = complaintsData.map(c => {
        const dateStr = c.createdAt?.toDate
          ? c.createdAt.toDate().toLocaleDateString()
          : new Date().toLocaleDateString();

        return {
          originalId: c.id,
          id: c.id.slice(-6).toUpperCase(),
          title: c.category || "Electricity Issue",
          citizen: c.userName || c.userEmail || "Citizen",
          location: c.address || "Unknown",
          date: dateStr,
          status: c.status || "Pending",
          dept: "Electricity",
          priority: c.priority || "High",
          workerId: c.workerId || null
        };
      });

      setComplaintsList(mappedComplaints);
    } catch (err) {
      console.error(err);
      setError("Could not load data.");
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
              <p className="breadcrumb">Admin &rsaquo; Departments &rsaquo; Road Repair</p>
              <h1 className="admin-page-title">Road Repair Department</h1>
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
                    <span className={`chip ${active.status === 'Pending' ? 'chip-pending' : active.status === 'In Progress' ? 'chip-inprogress' : 'chip-resolved'}`}>{active.status}</span>
                  </div>
                  <div className="dept-info-grid">
                    <div className="dept-info-item"><span className="dept-info-label">Citizen</span><span>{active.citizen}</span></div>
                    <div className="dept-info-item"><span className="dept-info-label">Location</span><span>{active.location}</span></div>
                    <div className="dept-info-item"><span className="dept-info-label">Date Filed</span><span>{active.date}</span></div>
                    <div className="dept-info-item"><span className="dept-info-label">Priority</span><span>{active.priority}</span></div>
                  </div>
                  <div className="dept-img-placeholder" aria-label="Road photo placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                    <span>Photo evidence placeholder</span>
                  </div>
                  <div className="dept-assign-section">
                    <h3 className="dept-section-title">Assign Worker</h3>
                    <div className="dept-assign-row">
                      <select
                        className="dept-select"
                        aria-label="Select worker"
                        value={selectedWorkerId}
                        onChange={(e) => setSelectedWorkerId(e.target.value)}
                        disabled={active.status !== 'Pending'}
                      >
                        <option value="">-- Select Worker --</option>
                        {workersList.map(w => (
                          <option key={w.id} value={w.id}>{w.displayName || w.name || w.email}</option>
                        ))}
                      </select>
                      <button
                        className="btn btn-primary"
                        disabled={!selectedWorkerId || active.status !== 'Pending'}
                        onClick={async () => {
                          if (!active) return;
                          try {
                            await assignComplaintToWorker(active.originalId, selectedWorkerId);
                            alert("Worker assigned successfully");

                            setSelectedWorkerId("");
                            fetchData();
                          } catch (err) {
                            console.error(err);
                            alert("Failed to assign worker");
                          }
                        }}
                      >Assign</button>
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
                        <div className="dept-timeline-content"><span className="dept-timeline-step">Worker Assigned</span><span className="dept-timeline-date">{active.status !== 'Pending' ? '✓' : '—'}</span></div>
                      </li>
                      <li className={`dept-timeline-item ${active.status === 'Resolved' ? 'dept-timeline-item--done' : ''}`}>
                        <span className="dept-timeline-dot" aria-hidden="true" />
                        <div className="dept-timeline-content"><span className="dept-timeline-step">Resolved</span><span className="dept-timeline-date">{active.status === 'Resolved' ? '✓' : '—'}</span></div>
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
