import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import Modi from "../modi.webp";

const roles = [
  { id: 'citizen', label: 'Citizen', icon: '👤', desc: 'Access civic services & track complaints' },
  { id: 'worker',  label: 'Worker',  icon: '🔧', desc: 'View assigned tasks and update status'     },
  { id: 'admin',   label: 'Admin',   icon: '🏛️',  desc: 'Manage departments and oversee portal'    },
];

function LoginPage() {
  const [activeRole, setActiveRole] = useState('citizen');

  return (
    <div className="login-page">
      <div className="login-hero" role="banner">
        <div className="login-hero__overlay" />
        <img
          src={Modi}
          alt="Urban Pragati — Prime Minister of India"
          className="login-hero__img"
        />
        <div className="login-hero__content">
          <div className="login-hero__badge">Government of India</div>
          <h1 className="login-hero__title">Urban Pragati</h1>
          <p className="login-hero__tagline">
            Empowering Citizens, Improving Cities
          </p>
          <div className="login-hero__stats">
            <div className="login-stat">
              <span className="login-stat__num">2.4M+</span>
              <span className="login-stat__label">Citizens Served</span>
            </div>
            <div className="login-stat">
              <span className="login-stat__num">98K+</span>
              <span className="login-stat__label">Issues Resolved</span>
            </div>
            <div className="login-stat">
              <span className="login-stat__num">150+</span>
              <span className="login-stat__label">Cities</span>
            </div>
          </div>
        </div>
      </div>

      <main className="login-panel">
        <div className="login-form-wrap">
          <div className="login-header">
            <h2 className="login-header__title">Welcome Back</h2>
            <p className="login-header__sub">Sign in to continue to your portal</p>
          </div>

          <div className="role-selector" role="tablist" aria-label="Select login role">
            {roles.map(r => (
              <button
                key={r.id}
                className={`role-tab ${activeRole === r.id ? 'role-tab--active' : ''}`}
                onClick={() => setActiveRole(r.id)}
                role="tab"
                aria-selected={activeRole === r.id}
              >
                <span className="role-tab__icon" aria-hidden="true">{r.icon}</span>
                <span className="role-tab__label">{r.label}</span>
              </button>
            ))}
          </div>

          <p className="role-desc" aria-live="polite">
            {roles.find(r => r.id === activeRole)?.desc}
          </p>

          <form className="login-form" onSubmit={e => e.preventDefault()} noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email / Phone</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="yourname@example.com"
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-eye-wrap">
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button type="button" className="eye-btn" aria-label="Toggle password visibility">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="login-form__row">
              <label className="check-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#forgot" className="login-link">Forgot Password?</a>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width:'100%', justifyContent:'center' }}>
              Sign In as {roles.find(r => r.id === activeRole)?.label}
            </button>
          </form>

          <div className="or-divider">
            <span />
            <span className="or-divider__text">or continue with</span>
            <span />
          </div>

          <div className="social-row" role="group" aria-label="Social login options">
            {['G', 'f', 'in'].map((s,i) => (
              <button key={i} className="social-btn" aria-label={`Sign in with ${s === 'G' ? 'Google' : s === 'f' ? 'Facebook' : 'LinkedIn'}`}>
                {s}
              </button>
            ))}
          </div>

          {activeRole === 'citizen' && (
            <p className="signup-cta">
              New citizen?{' '}
              <Link to="/signup/citizen" className="login-link">Create an account</Link>
            </p>
          )}
          {activeRole === 'worker' && (
            <p className="signup-cta">
              New worker?{' '}
              <Link to="/signup/worker" className="login-link">Register here</Link>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
