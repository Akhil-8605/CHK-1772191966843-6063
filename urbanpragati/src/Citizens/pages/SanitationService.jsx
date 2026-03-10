import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './SanitationService.css';
import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';
import ComplaintCard from '../components/ComplaintCard';
import { getAllComplaints, createComplaint } from '../../firebaseOperations/db';

export default function SanitationService() {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', issue: '', urgency: '', description: '', proofImage: null,
    coordinates: { lat: 28.6139, lng: 77.209 }
  });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getAllComplaints();
      const mappedComplaints = data.map(c => ({
        _id: c.id,
        category: c.category || c.department,
        status: c.status,
        address: c.address,
        createdAt: c.createdAt?.toDate ? c.createdAt.toDate().toISOString() : new Date().toISOString(),
        coordinates: c.coordinates
      }));
      setComplaints(mappedComplaints.filter(c => c.category === 'Sanitation'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: { lat: position.coords.latitude, lng: position.coords.longitude }
          }));
          setLoadingLocation(false);
          alert('Location captured successfully!');
        },
        (error) => {
          console.error(error);
          setLoadingLocation(false);
          alert('Failed to get location. Please ensure location services are enabled.');
        }
      );
    } else {
      setLoadingLocation(false);
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.address || !formData.issue) {
      setError('Address and Issue Type are required.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const complaintData = {
        category: 'Sanitation',
        department: 'Sanitation',
        description: `Name: ${formData.name}, Phone: ${formData.phone}, Urgency: ${formData.urgency}, Issue: ${formData.issue}. ${formData.description}`,
        address: formData.address,
        coordinates: formData.coordinates,
        name: formData.name,
        phone: formData.phone
      };

      await createComplaint(complaintData);
      alert('Complaint submitted successfully!');
      setFormData({ name: '', phone: '', address: '', issue: '', urgency: '', description: '', proofImage: null, coordinates: { lat: 28.6139, lng: 77.209 } });
      fetchComplaints();
    } catch (err) {
      console.error(err);
      setError('Network error submitting complaint.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="san-service-page">
      <CitizenNavbar />

      <main className="san-main">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <span>Sanitation Services</span>
        </nav>

        <header className="service-page-header san-header">
          <div className="service-header-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="16" y="24" width="32" height="28" rx="4" fill="#006400" opacity="0.15" stroke="#006400" strokeWidth="2.5" />
              <path d="M24 24V18a8 8 0 0 1 16 0v6" stroke="#006400" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M32 34v8" stroke="#006400" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="service-header-text">
            <h1>Sanitation Services</h1>
            <p>Report garbage collection failures, open drains, sewage blockages, and public toilet maintenance issues.</p>
          </div>
        </header>

        <div className="service-two-col">
          <section className="service-left-col">
            <div className="service-info-card card">
              <h2>Report a Sanitation Issue</h2>
              <p>Help us keep your city clean. Fill in the details below and our sanitation team will address your concern promptly.</p>

              <form className="service-form" onSubmit={handleSubmit} aria-label="Sanitation complaint form">
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <div className="form-group">
                  <label htmlFor="s-name">Your Full Name</label>
                  <input id="s-name" type="text" placeholder="e.g. Priya Verma" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="s-phone">Mobile Number</label>
                  <input id="s-phone" type="tel" placeholder="e.g. 9876543210" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="s-address">Address / Location *</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input id="s-address" type="text" style={{ flex: 1 }} placeholder="Street, Ward, Sector" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                    <button type="button" className="btn btn-outline" onClick={handleGetLocation} disabled={loadingLocation}>
                      {loadingLocation ? 'Locating...' : '📍 GPS'}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="s-issue">Issue Type *</label>
                  <select id="s-issue" value={formData.issue} onChange={e => setFormData({ ...formData, issue: e.target.value })}>
                    <option value="">-- Select Issue --</option>
                    <option>Garbage not collected</option>
                    <option>Open drain / nala</option>
                    <option>Sewage blockage</option>
                    <option>Public toilet maintenance</option>
                    <option>Littering / Dumping</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="s-urgency">Urgency</label>
                  <select id="s-urgency" value={formData.urgency} onChange={e => setFormData({ ...formData, urgency: e.target.value })}>
                    <option value="">-- Select Urgency --</option>
                    <option>Normal (within 3 days)</option>
                    <option>Urgent (within 24 hours)</option>
                    <option>Emergency (immediate)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="s-desc">Description</label>
                  <textarea id="s-desc" rows={4} placeholder="Please describe the sanitation issue..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="s-photo">Upload Photo (optional)</label>
                  <input id="s-photo" type="file" accept="image/*" className="file-input" onChange={e => setFormData({ ...formData, proofImage: e.target.files[0] })} />
                </div>
                <button type="submit" disabled={submitting} className="btn btn-primary btn-full">
                  {submitting ? 'Submitting...' : 'Submit Complaint'}
                </button>
              </form>
            </div>

            <div className="service-mini-stats">
              <div className="mini-stat-card san-stat">
                <span className="mini-stat-num">304</span>
                <span className="mini-stat-label">Complaints This Month</span>
              </div>
              <div className="mini-stat-card san-stat">
                <span className="mini-stat-num">78%</span>
                <span className="mini-stat-label">Resolution Rate</span>
              </div>
              <div className="mini-stat-card san-stat">
                <span className="mini-stat-num">72h</span>
                <span className="mini-stat-label">Avg. Response Time</span>
              </div>
            </div>
          </section>

          <section className="service-right-col">
            <h2 className="section-heading">Recent Sanitation Complaints</h2>
            <div className="complaint-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {complaints.map(c => (
                <ComplaintCard key={c._id} complaint={{
                  id: c._id.slice(-6).toUpperCase(),
                  title: c.category,
                  location: c.address,
                  date: new Date(c.createdAt).toLocaleDateString(),
                  status: c.status
                }} />
              ))}
              {complaints.length === 0 && <p>No recent complaints found.</p>}
            </div>
            <div className="map-section">
              <h3 className="section-heading sm" style={{ marginTop: '2rem' }}>Issue Hotspots</h3>
              <div style={{ height: 300, width: '100%', borderRadius: 8, overflow: 'hidden' }}>
                <MapContainer center={[28.6139, 77.209]} zoom={11} style={{ height: "100%", width: "100%" }}>
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                  {complaints.filter(c => c.coordinates && c.coordinates.lat).map(c => (
                    <Marker key={c._id} position={[c.coordinates.lat, c.coordinates.lng]}>
                      <Popup>
                        <strong>{c.category}</strong><br />
                        {c.address}<br />
                        Status: {c.status}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </section>
        </div>
      </main>

      <CitizenFooter />
    </div>
  );
}
