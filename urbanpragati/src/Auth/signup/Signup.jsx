import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../firebaseOperations/auth";
import "./Signup.css";
import Modi from "../modi.webp";
import ImageKit from "imagekit-javascript";

function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("citizen");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmpass: "",
    address: "",
    city: "",
    ward: "",
    workerId: "",
    department: "",
    zone: "",
    workingAddress: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [workerDocument, setWorkerDocument] = useState(null);
  const departments = [
    "Water",
    "Electricity",
    "Road Repair",
    "Property Tax",
    "Sanitation",
    "Development",
  ];
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const uploadWorkerDocument = async (file) => {
    try {
      const authRes = await fetch(`${process.env.REACT_APP_BASE_URL}/auth`);
      const authData = await authRes.json();

      const imagekit = new ImageKit({
        publicKey: process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY,
        urlEndpoint: process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT,
        authenticationEndpoint: `${process.env.REACT_APP_BASE_URL}/auth`,
      });

      const uploadResponse = await imagekit.upload({
        file: file,
        fileName: file.name,
        token: authData.token,
        signature: authData.signature,
        expire: authData.expire,
      });

      return uploadResponse.url; // return uploaded file URL
    } catch (err) {
      console.error("ImageKit Upload Error:", err);
      throw new Error("Failed to upload document");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !formData.fullname ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.city
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (
      role === "worker" &&
      (!formData.workerId ||
        !formData.department ||
        !formData.workingAddress ||
        !workerDocument)
    ) {
      setError("Please complete all worker details and upload document.");
      return;
    }

    if (role === "citizen" && !formData.address) {
      setError("Please fill in residential address.");
      return;
    }

    if (formData.password !== formData.confirmpass) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const extraData = {
        displayName: formData.fullname,
        phoneNumber: formData.phone,
        dob: formData.dob,
        city: formData.city,
        createdAt: new Date(),
      };

      // CITIZEN DATA
      if (role === "citizen") {
        extraData.address = formData.address;
        extraData.ward = formData.ward;
      }

      // WORKER DATA
      if (role === "worker") {
        extraData.workerId = formData.workerId;
        extraData.department = formData.department;
        extraData.zone = formData.zone;
        extraData.workingAddress = formData.workingAddress;

        // Upload document to ImageKit
        const documentUrl = await uploadWorkerDocument(workerDocument);
        extraData.workerDocument = documentUrl;
      }

      // Create Firebase Auth + Firestore document
      const { user } = await registerUser(
        formData.email,
        formData.password,
        role,
        extraData
      );

      const token = await user.getIdToken();

      // Auto login
      localStorage.setItem("userToken", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userData", JSON.stringify(extraData));

      // Redirect user
      if (role === "citizen") {
        navigate("/citizen-dashboard");
      } else {
        navigate("/worker");
      }

    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <header className="signup-hero">
        <div className="signup-hero__overlay" />
        <img src={Modi} alt="Urban Pragati" className="signup-hero__bg" />
        <div className="signup-hero__content container">
          <div className="signup-badge">Portal Registration</div>
          <h1 className="signup-hero__title">
            Join the Network
            <br />
            <span className="text-saffron" style={{ fontWeight: "800" }}>
              Urban Pragati
            </span>
          </h1>
          <p className="signup-hero__sub">
            Empowering citizens and workers to build better cities.
          </p>
        </div>
      </header>
      <main className="signup-main">
        <div className="signup-card">
          <div className="signup-card__header">
            <h2 className="section-title">Create an Account</h2>
            <p className="section-subtitle">
              Sign up to access your digital governance services.
            </p>
          </div>
          <div className="role-toggle">
            <button
              type="button"
              className={`role-btn ${role === "citizen" ? "active" : ""}`}
              onClick={() => setRole("citizen")}
              disabled={otpSent}
            >
              Citizen
            </button>
            <button
              type="button"
              className={`role-btn ${role === "worker" ? "active" : ""}`}
              onClick={() => setRole("worker")}
              disabled={otpSent}
            >
              Municipal Worker
            </button>
          </div>
          <form className="signup-form" onSubmit={handleSignup} noValidate>
            {error && (
              <div
                style={{
                  color: "red",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}
            <div className="signup-row">
              <div className="form-group">
                <label htmlFor="fullname" className="form-label">
                  Full Name *
                </label>
                <input
                  id="fullname"
                  type="text"
                  className="form-input"
                  placeholder="Name"
                  value={formData.fullname}
                  onChange={handleChange}
                  disabled={otpSent}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={otpSent}
                />
              </div>
            </div>
            <div className="signup-row">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="form-input"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={otpSent}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  className="form-input"
                  value={formData.dob}
                  onChange={handleChange}
                  disabled={otpSent}
                />
              </div>
            </div>
            <div className="signup-row">
              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City *
                </label>
                <select
                  id="city"
                  className="form-select"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={otpSent}
                >
                  <option value="">Select city</option>
                  <option>Solapur</option>
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor={role === "citizen" ? "address" : "workingAddress"}
                  className="form-label"
                >
                  {role === "citizen"
                    ? "Residential Address *"
                    : "Working Address *"}
                </label>
                <input
                  id={role === "citizen" ? "address" : "workingAddress"}
                  type="text"
                  className="form-input"
                  placeholder="Address"
                  value={
                    role === "citizen"
                      ? formData.address
                      : formData.workingAddress
                  }
                  onChange={handleChange}
                  disabled={otpSent}
                />
              </div>
            </div>
            {role === "citizen" && (
              <div className="form-group">
                <label htmlFor="ward" className="form-label">
                  Ward / Zone
                </label>
                <input
                  id="ward"
                  type="text"
                  className="form-input"
                  placeholder="Ward 14 — North Zone"
                  value={formData.ward}
                  onChange={handleChange}
                  disabled={otpSent}
                />
              </div>
            )}
            {role === "worker" && (
              <>
                <div className="signup-row">
                  <div className="form-group">
                    <label htmlFor="workerId" className="form-label">
                      Worker ID *
                    </label>
                    <input
                      id="workerId"
                      type="text"
                      className="form-input"
                      placeholder="WRK-XXX"
                      value={formData.workerId}
                      onChange={handleChange}
                      disabled={otpSent}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zone" className="form-label">
                      Assigned Zone
                    </label>
                    <input
                      id="zone"
                      type="text"
                      className="form-input"
                      placeholder="North Zone"
                      value={formData.zone}
                      onChange={handleChange}
                      disabled={otpSent}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="department" className="form-label">
                    Department *
                  </label>
                  <select
                    id="department"
                    className="form-select"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={otpSent}
                  >
                    <option value="">Select your department</option>
                    {departments.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Upload Worker Document *</label>

                  <label className={`file-upload-area ${workerDocument ? "uploaded" : ""}`} htmlFor="idproof">

                    {!workerDocument ? (
                      <>
                        <span className="file-upload-area__text">
                          Click to upload or drag & drop
                        </span>
                        <span className="file-upload-area__hint">
                          PDF, JPG, PNG up to 5 MB
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="file-upload-success">✓ File Selected</span>
                        <span className="file-upload-name">{workerDocument.name}</span>
                      </>
                    )}

                    <input
                      id="idproof"
                      type="file"
                      accept=".pdf,.jpg,.png"
                      style={{ display: "none" }}
                      onChange={(e) => setWorkerDocument(e.target.files[0])}
                    />

                  </label>
                </div>
              </>
            )}
            <div className="signup-row">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password *
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={otpSent}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmpass" className="form-label">
                  Confirm Password *
                </label>
                <input
                  id="confirmpass"
                  type="password"
                  className="form-input"
                  placeholder="Repeat password"
                  autoComplete="new-password"
                  value={formData.confirmpass}
                  onChange={handleChange}
                  disabled={otpSent}
                />
              </div>
            </div>
            {otpSent && (
              <div
                className="form-group slide-in"
                style={{
                  marginTop: "20px",
                  padding: "20px",
                  backgroundColor: "#fff3e0",
                  borderLeft: "4px solid #ff7a18",
                  borderRadius: "8px",
                }}
              >
                <label
                  htmlFor="otpCode"
                  className="form-label"
                  style={{ color: "#e65100" }}
                >
                  Enter SMS OTP sent to {formData.phone}
                </label>
                <input
                  id="otpCode"
                  type="text"
                  className="form-input"
                  placeholder="EX: 123456"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  style={{
                    letterSpacing: "8px",
                    fontSize: "1.2rem",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                />
              </div>
            )}
            <div className="signup-actions">
              {!otpSent ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  {loading ? "Verifying..." : "Continue to Verification"}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={otpLoading}
                  className="btn btn-primary btn-lg"
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  {otpLoading
                    ? "Verifying & Creating..."
                    : "Verify & Create Account"}
                </button>
              )}
              <Link
                to="/login"
                className="btn btn-outline btn-lg"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </main>
      <footer className="signup-footer">
        <p>
          © 2026 Urban Pragati — Ministry of Housing and Urban Affairs,
          Government of India
        </p>
      </footer>
    </div>
  );
}
export default Signup;
