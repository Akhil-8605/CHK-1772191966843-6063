import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './WaterService.css';
import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';
import ComplaintCard from '../components/ComplaintCard';
import { getAllComplaints, createComplaint } from '../../firebaseOperations/db';
export default function WaterService() {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    description: '',
    proofImage: null,
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
      setComplaints(mappedComplaints.filter(c => c.category === 'Water'));
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
    if (!formData.description || !formData.address) {
      setError('Address and Description are required.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const complaintData = {
        category: 'Water',
        department: 'Water',
        description: formData.description,
        address: formData.address,
        coordinates: formData.coordinates,
        name: formData.name,
        phone: formData.phone
      };
      await createComplaint(complaintData);
      alert('Complaint submitted successfully!');
      setFormData({ name: '', phone: '', address: '', description: '', proofImage: null, coordinates: { lat: 28.6139, lng: 77.209 } });
      fetchComplaints(); 
    } catch (err) {
      console.error(err);
      setError('Network error submitting complaint.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="water-service-page">
      <CitizenNavbar />
      <main className="water-main">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <span>Water Supply Services</span>
        </nav>
        <header className="service-page-header water-header">
          <div className="service-header-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 4C32 4 10 28 10 40a22 22 0 0 0 44 0C54 28 32 4 32 4z" fill="#0B5FFF" opacity="0.2" stroke="#0B5FFF" strokeWidth="2.5" />
              <path d="M22 44a10 10 0 0 0 14 0" stroke="#0B5FFF" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="service-header-text">
            <h1>Water Supply Services</h1>
            <p>Report water supply issues, pipe leakages, contamination, and request new connections.</p>
          </div>
        </header>
        <div className="service-two-col">
          <section className="service-left-col">
            <div className="service-info-card card">
              <div className="service-info-icon-wrap water-icon-wrap">
                <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
                  <path d="M32 4C32 4 10 28 10 40a22 22 0 0 0 44 0C54 28 32 4 32 4z" fill="#0B5FFF" opacity="0.15" stroke="#0B5FFF" strokeWidth="2.5" />
                </svg>
              </div>
              <h2>Report a Water Issue</h2>
              <p>Fill in the details below to register your complaint. Our team will respond within 48 hours.</p>
              <form className="service-form" onSubmit={handleSubmit} aria-label="Water complaint form">
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <div className="form-group">
                  <label htmlFor="w-name">Your Full Name</label>
                  <input id="w-name" type="text" placeholder="e.g. Rajesh Kumar" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="w-phone">Mobile Number</label>
                  <input id="w-phone" type="tel" placeholder="e.g. 9876543210" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="w-address">Address / Location *</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input id="w-address" type="text" style={{ flex: 1 }} placeholder="Street, Ward, Sector" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                    <button type="button" className="btn btn-outline" onClick={handleGetLocation} disabled={loadingLocation}>
                      {loadingLocation ? 'Locating...' : '📍 GPS'}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="w-desc">Description *</label>
                  <textarea id="w-desc" rows={4} placeholder="Describe your issue in detail..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="w-photo">Upload Photo (optional)</label>
                  <input id="w-photo" type="file" accept="image/*" className="file-input" onChange={e => setFormData({ ...formData, proofImage: e.target.files[0] })} />
                </div>
                <button type="submit" disabled={submitting} className="btn btn-primary btn-full">
                  {submitting ? 'Submitting...' : 'Submit Complaint'}
                </button>
              </form>
            </div>
            <div className="service-mini-stats">
              <div className="mini-stat-card">
                <span className="mini-stat-num">142</span>
                <span className="mini-stat-label">Complaints This Month</span>
              </div>
              <div className="mini-stat-card">
                <span className="mini-stat-num">89%</span>
                <span className="mini-stat-label">Resolution Rate</span>
              </div>
              <div className="mini-stat-card">
                <span className="mini-stat-num">36h</span>
                <span className="mini-stat-label">Avg. Response Time</span>
              </div>
            </div>
          </section>
          <section className="service-right-col">
            <h2 className="section-heading">Recent Water Complaints</h2>
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
              <h3 className="section-heading sm" style={{ marginTop: '2rem' }}>Complaint Hotspots</h3>
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
