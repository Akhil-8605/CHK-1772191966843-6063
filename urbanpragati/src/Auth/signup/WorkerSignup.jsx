import React from 'react';
import { Link } from 'react-router-dom';
import './WorkerSignup.css';
import Modi from "../modi.webp";

const requiredDocs = [
  { icon: '🪪', title: 'Government ID', desc: 'Aadhaar / Voter Card / Passport' },
  { icon: '📋', title: 'Department Letter', desc: 'Appointment letter from department' },
  { icon: '📸', title: 'Passport Photograph', desc: 'Recent colour photo (white background)' },
  { icon: '🎓', title: 'Qualification Proof', desc: 'Educational certificates / training docs' },
];

const departments = [
  'Water Supply & Sanitation',
  'Electricity Department',
  'Road & Infrastructure',
  'Property Tax Division',
  'Solid Waste Management',
  'Urban Development',
  'Public Health',
];

function WorkerSignup() {
  return (
    <div className="wsignup-page">

      <header className="wsignup-header">
        <div className="container wsignup-header__inner">
          <div className="wsignup-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#FF6F00" />
              <text x="16" y="22" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">UP</text>
            </svg>
            <span>Urban Pragati</span>
          </div>
          <div className="wsignup-header__links">
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
          </div>
        </div>
      </header>

      <div className="wsignup-hero">
        <div className="container">
          <div className="wsignup-hero__inner">
            <div className="wsignup-hero__text">
              <div className="csignup-badge">Worker Portal Registration</div>
              <h1 className="wsignup-hero__title">Register as a<br /><span className="text-saffron">Municipal Worker</span></h1>
              <p className="wsignup-hero__sub">
                Join the Urban Pragati workforce and contribute to building better cities.
                Fill in your details to create your worker account.
              </p>
            </div>
            <div className="wsignup-hero__img-wrap">
              <img src={Modi} alt="Urban Pragati" className="wsignup-hero__img" />
              <div className="wsignup-hero__img-overlay" />
            </div>
          </div>
        </div>
      </div>

      <main className="wsignup-main">
        <div className="container wsignup-grid">

          <div className="card wsignup-form-card">
            <h2 className="section-title">Worker Details</h2>
            <div className="accent-bar" />

            <form className="wsignup-form" onSubmit={e => e.preventDefault()} noValidate>
              <div className="csignup-row">
                <div className="form-group">
                  <label htmlFor="wfullname" className="form-label">Full Name *</label>
                  <input id="wfullname" type="text" className="form-input" placeholder="Suresh Verma" />
                </div>
                <div className="form-group">
                  <label htmlFor="workerid" className="form-label">Worker ID *</label>
                  <input id="workerid" type="text" className="form-input" placeholder="WRK-2026-00142" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dept" className="form-label">Department *</label>
                <select id="dept" className="form-select">
                  <option value="">Select your department</option>
                  {departments.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>

              <div className="csignup-row">
                <div className="form-group">
                  <label htmlFor="wphone" className="form-label">Phone Number *</label>
                  <input id="wphone" type="tel" className="form-input" placeholder="+91 87654 32109" />
                </div>
                <div className="form-group">
                  <label htmlFor="wemail" className="form-label">Official Email *</label>
                  <input id="wemail" type="email" className="form-input" placeholder="worker@urbanpragati.gov.in" />
                </div>
              </div>

              <div className="csignup-row">
                <div className="form-group">
                  <label htmlFor="zone" className="form-label">Assigned Zone</label>
                  <input id="zone" type="text" className="form-input" placeholder="Zone C — South Delhi" />
                </div>
                <div className="form-group">
                  <label htmlFor="designation" className="form-label">Designation</label>
                  <input id="designation" type="text" className="form-input" placeholder="Field Supervisor" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="supervisorid" className="form-label">Supervisor ID</label>
                <input id="supervisorid" type="text" className="form-input" placeholder="SUP-2023-00021" />
              </div>

              <div className="csignup-row">
                <div className="form-group">
                  <label htmlFor="wpassword" className="form-label">Password *</label>
                  <input id="wpassword" type="password" className="form-input" placeholder="Min. 8 characters" autoComplete="new-password" />
                </div>
                <div className="form-group">
                  <label htmlFor="wconfirmpass" className="form-label">Confirm Password *</label>
                  <input id="wconfirmpass" type="password" className="form-input" placeholder="Repeat password" autoComplete="new-password" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Upload ID Proof *</label>
                <label className="file-upload-area" htmlFor="idproof">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="file-upload-area__text">Click to upload or drag & drop</span>
                  <span className="file-upload-area__hint">PDF, JPG, PNG up to 5 MB</span>
                  <input id="idproof" type="file" accept=".pdf,.jpg,.png" style={{ display: 'none' }} />
                </label>
              </div>

              <div className="wsignup-actions">
                <button type="submit" className="btn btn-secondary btn-lg" style={{ flex: 1, justifyContent: 'center' }}>
                  Submit Registration
                </button>
                <Link to="/login" className="btn btn-outline btn-lg" style={{ flex: 1, justifyContent: 'center' }}>
                  Back to Login
                </Link>
              </div>
            </form>
          </div>

          <aside className="wsignup-docs">
            <h3 className="wsignup-docs__title">Required Documents</h3>
            <p className="wsignup-docs__sub">Please keep scanned copies ready before you begin.</p>
            <div className="wsignup-docs__list">
              {requiredDocs.map((doc, i) => (
                <div key={i} className="doc-card">
                  <span className="doc-card__icon" aria-hidden="true">{doc.icon}</span>
                  <div>
                    <p className="doc-card__title">{doc.title}</p>
                    <p className="doc-card__desc">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="wsignup-help">
              <strong>Need help?</strong>
              <p>Contact the HR department of your respective municipal corporation.</p>
              <p className="wsignup-help__contact">1800-XXX-XXXX (Toll Free)</p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="csignup-footer">
        <p>© 2026 Urban Pragati — Ministry of Housing and Urban Affairs, Government of India</p>
      </footer>
    </div>
  );
}

export default WorkerSignup;
