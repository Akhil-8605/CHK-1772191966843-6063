import { useState, useEffect } from 'react';
import './DevelopmentMgmt.css';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';
import { getComplaintsByDepartment } from '../../firebaseOperations/db';
const statusClass = { Active: 'chip-inprogress', 'Under Review': 'chip-pending', Approved: 'chip-resolved', 'Pending Approval': 'chip-pending' };
export default function DevelopmentMgmt() {
  const [proposalsList, setProposalsList] = useState([]);
  const [stats, setStats] = useState({ total: 0, approved: 0, active: 0, votes: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {

    const dummyProposals = [
      {
        id: "PR-001",
        title: "Construction of New Public Park in Ward 12",
        submitted: "Rahul Sharma",
        date: "2026-03-01",
        interested: 842,
        notInterested: 91,
        status: "Under Review"
      }
    ];

    setProposalsList(dummyProposals);

    setStats({
      total: dummyProposals.length,
      approved: dummyProposals.filter(p => p.status === "Approved").length,
      active: dummyProposals.filter(p => p.status === "Active" || p.status === "Under Review").length,
      votes: dummyProposals.reduce((sum, p) => sum + p.interested + p.notInterested, 0)
    });

    setLoading(false);
  };
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminNavbar />
        <main className="admin-content">
          <div className="admin-page-header">
            <div>
              <p className="breadcrumb">Admin &rsaquo; Development Management</p>
              <h1 className="admin-page-title">Development Management</h1>
            </div>
            <button className="btn btn-primary">+ Add Proposal</button>
          </div>
          <div className="devmgmt-summary">
            <div className="devmgmt-stat"><span className="devmgmt-num">{stats.total}</span><span className="devmgmt-label">Total Proposals</span></div>
            <div className="devmgmt-stat"><span className="devmgmt-num devmgmt-num--green">{stats.approved}</span><span className="devmgmt-label">Approved</span></div>
            <div className="devmgmt-stat"><span className="devmgmt-num devmgmt-num--amber">{stats.active}</span><span className="devmgmt-label">Active / Under Review</span></div>
            <div className="devmgmt-stat"><span className="devmgmt-num devmgmt-num--blue">{stats.votes.toLocaleString()}</span><span className="devmgmt-label">Total Votes Cast</span></div>
          </div>
          <section className="admin-table-section" aria-labelledby="devmgmt-table-heading">
            <h2 className="section-heading" id="devmgmt-table-heading">All Proposals</h2>
            <div className="admin-table-wrapper">
              <table className="admin-table" aria-label="Development proposals">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Proposal Title</th>
                    <th>Submitted By</th>
                    <th>Date</th>
                    <th>Interested</th>
                    <th>Not Interested</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && <tr><td colSpan="8" style={{ textAlign: 'center' }}>Loading proposals...</td></tr>}
                  {!loading && proposalsList.length === 0 && <tr><td colSpan="8" style={{ textAlign: 'center' }}>No proposals found.</td></tr>}
                  {!loading && proposalsList.map((p) => (
                    <tr key={p.id}>
                      <td><span className="table-id">{p.id}</span></td>
                      <td>{p.title}</td>
                      <td>{p.submitted}</td>
                      <td>{p.date}</td>
                      <td><span className="vote-count vote-count--yes">{p.interested}</span></td>
                      <td><span className="vote-count vote-count--no">{p.notInterested}</span></td>
                      <td><span className={`chip ${statusClass[p.status]}`}>{p.status}</span></td>
                      <td>
                        <div className="devmgmt-actions">
                          <button className="btn-table-action">Approve</button>
                          <button className="btn-table-action btn-table-action--danger">Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
