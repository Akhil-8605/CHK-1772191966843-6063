import React from 'react';
import { Link } from 'react-router-dom';
import './CitizenSignup.css';
import Modi from "../modi.webp";

function CitizenSignup() {
  return (
    <div className="csignup-page">
      <header className="csignup-hero">
        <div className="csignup-hero__overlay" />
        <img src={Modi} alt="Urban Pragati" className="csignup-hero__bg" />
        <div className="csignup-hero__content container">
          <div className="csignup-badge">Citizen Registration</div>
          <h1 className="csignup-hero__title">
            Create Citizen Account<br />
            <span className="text-saffron" style={{ fontWeight:'800' }}>Urban Pragati</span>
          </h1>
          <p className="csignup-hero__sub">
            Join over 2.4 million citizens experiencing smarter city services
          </p>
        </div>
      </header>

      <main className="csignup-main">
        <div className="csignup-card card container">
          <div className="csignup-card__header">
            <h2 className="section-title">Personal Information</h2>
            <p className="section-subtitle">Please fill in all required details accurately.</p>
            <div className="accent-bar" />
          </div>

          <form className="csignup-form" onSubmit={e => e.preventDefault()} noValidate>
            <div className="csignup-row">
              <div className="form-group">
                <label htmlFor="fullname" className="form-label">Full Name *</label>
                <input id="fullname" type="text" className="form-input" placeholder="Ramesh Kumar Sharma" />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input id="email" type="email" className="form-input" placeholder="ramesh@example.com" />
              </div>
            </div>

            <div className="csignup-row">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input id="phone" type="tel" className="form-input" placeholder="+91 98765 43210" />
              </div>
              <div className="form-group">
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <input id="dob" type="date" className="form-input" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">Residential Address *</label>
              <textarea id="address" className="form-textarea" placeholder="Plot No. 12, Street 4, Sector 9..." rows="2" />
            </div>

            <div className="csignup-row">
              <div className="form-group">
                <label htmlFor="city" className="form-label">City *</label>
                <select id="city" className="form-select">
                  <option value="">Select city</option>
                  <option>New Delhi</option>
                  <option>Mumbai</option>
                  <option>Bengaluru</option>
                  <option>Hyderabad</option>
                  <option>Pune</option>
                  <option>Ahmedabad</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ward" className="form-label">Ward / Zone</label>
                <input id="ward" type="text" className="form-input" placeholder="Ward 14 — North Zone" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="aadhaar" className="form-label">Aadhaar Number</label>
              <input id="aadhaar" type="text" className="form-input" placeholder="XXXX XXXX XXXX" maxLength="14" />
              <span className="field-hint">Used for identity verification only</span>
            </div>

            <div className="csignup-row">
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password *</label>
                <input id="password" type="password" className="form-input" placeholder="Min. 8 characters" autoComplete="new-password" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmpass" className="form-label">Confirm Password *</label>
                <input id="confirmpass" type="password" className="form-input" placeholder="Repeat password" autoComplete="new-password" />
              </div>
            </div>

            <label className="check-label" style={{ fontSize:'var(--text-sm)', alignItems:'flex-start', gap:'var(--space-3)' }}>
              <input type="checkbox" style={{ marginTop: 2 }} />
              <span>
                I agree to the{' '}
                <a href="#terms" className="login-link">Terms of Service</a>
                {' '}and{' '}
                <a href="#privacy" className="login-link">Privacy Policy</a>
                {' '}of Urban Pragati
              </span>
            </label>

            <div className="csignup-actions">
              <button type="submit" className="btn btn-primary btn-lg" style={{ flex:1, justifyContent:'center' }}>
                Create Account
              </button>
              <Link to="/login" className="btn btn-outline btn-lg" style={{ flex:1, justifyContent:'center' }}>
                Already have account?
              </Link>
            </div>
          </form>
        </div>
      </main>

      <footer className="csignup-footer">
        <p>© 2026 Urban Pragati — Ministry of Housing and Urban Affairs, Government of India</p>
      </footer>
    </div>
  );
}

export default CitizenSignup;
