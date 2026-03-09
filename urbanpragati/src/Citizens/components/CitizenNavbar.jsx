import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './CitizenNavbar.css';

function CitizenNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <header className="cnavbar" role="banner">
      <nav className="cnavbar__inner container" aria-label="Primary navigation">
        <Link to="/" className="cnavbar__logo" aria-label="Urban Pragati Home">
          <div className="cnavbar__emblem" aria-hidden="true">
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="19" fill="#FF6F00" />
              <text x="19" y="25" textAnchor="middle" fontSize="15" fill="white" fontWeight="bold">UP</text>
            </svg>
          </div>
          <div className="cnavbar__brand">
            <span className="cnavbar__brand-name">Urban Pragati</span>
            <span className="cnavbar__brand-sub">Smart City Portal</span>
          </div>
        </Link>

        <div className="cnavbar__actions">
          <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
          <Link to="/signup/citizen" className="btn btn-primary btn-sm">Sign Up</Link>

          <button
            className="cnavbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
          <div
            className="profile-avatar"
            onClick={() => setOpenProfile(!openProfile)}
          >
            AA
          </div>
          {openProfile && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-name">Akhilesh Adam</div>

              <a href="/citizen-dashboard" className="profile-item">
                Go to Dashboard
              </a>

              <a href="/settings" className="profile-item">
                Settings
              </a>

              <div className="profile-divider" />

              <a href="/logout" className="profile-item logout">
                Logout
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default CitizenNavbar;
