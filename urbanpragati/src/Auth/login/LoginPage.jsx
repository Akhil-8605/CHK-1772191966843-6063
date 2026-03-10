import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { loginUser } from '../../firebaseOperations/auth';
import './LoginPage.css';
import Modi from "../modi.webp";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let role = "";
      let userData = null;
      let token = "";

      // ✅ ADMIN LOGIN FIRST (without firebase)
      if (email === "urbanpragati@gmail.com" && password === "urbanpragati") {

        role = "admin";
        token = "admin-token"; // fake token for admin

        localStorage.setItem("userToken", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem("userData", JSON.stringify({ name: "Admin" }));

        navigate("/admin");
        return;
      }

      // ✅ NORMAL FIREBASE LOGIN
      const { user } = await loginUser(email, password);
      token = await user.getIdToken();
      const uid = user.uid;

      // FIRESTORE ROLE CHECK
      const citizenDoc = await getDoc(doc(db, "citizens", uid));

      if (citizenDoc.exists()) {
        role = "citizen";
        userData = citizenDoc.data();
      } else {
        const workerDoc = await getDoc(doc(db, "workers", uid));

        if (workerDoc.exists()) {
          role = "worker";
          userData = workerDoc.data();
        } else {
          throw new Error("User role not found.");
        }
      }

      localStorage.setItem("userToken", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userData", JSON.stringify(userData));

      if (role === "citizen") navigate("/citizen-dashboard");
      else if (role === "worker") navigate("/worker");

    } catch (err) {
      console.error(err);
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const [viewPassword, setViewPassword] = useState(false);

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

          <form className="login-form" onSubmit={handleLogin} noValidate>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email / Phone</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="yourname@example.com"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-eye-wrap">
                <input
                  id="password"
                  type={viewPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="eye-btn" aria-label="Toggle password visibility" onClick={() => { setViewPassword(!viewPassword) }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
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

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="signup-cta">
            New user?{" "}
            <Link to="/signup" className="login-link">Create an account</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
