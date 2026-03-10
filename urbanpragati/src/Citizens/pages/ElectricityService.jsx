import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './ElectricityService.css';
import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';
import ComplaintCard from '../components/ComplaintCard';
import { getAllComplaints, createComplaint } from '../../firebaseOperations/db';

export default function ElectricityService() {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({
    name: '', phone: '', consumer: '', address: '', issue: '', description: '', proofImage: null,
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
      setComplaints(mappedComplaints.filter(c => c.category === 'Electricity'));
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
        category: 'Electricity',
        department: 'Electricity',
        description: `Name: ${formData.name}, Phone: ${formData.phone}, Consumer No: ${formData.consumer}, Issue: ${formData.issue}. ${formData.description}`,
        address: formData.address,
        coordinates: formData.coordinates,
        name: formData.name,
        phone: formData.phone
      };

      await createComplaint(complaintData);
      alert('Complaint submitted successfully!');
      setFormData({ name: '', phone: '', consumer: '', address: '', issue: '', description: '', proofImage: null, coordinates: { lat: 28.6139, lng: 77.209 } });
      fetchComplaints();
    } catch (err) {
      console.error(err);
      setError('Network error submitting complaint.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="elec-service-page">
      <CitizenNavbar />

      <main className="elec-main">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <span>Electricity Services</span>
        </nav>

        <header className="service-page-header elec-header">
          <div className="service-header-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M36 4L16 36h18l-6 24L52 28H34L36 4z" fill="#FF6F00" opacity="0.2" stroke="#FF6F00" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="service-header-text">
            <h1>Electricity Services</h1>
            <p>Report power outages, transformer faults, dangerous wiring, and billing disputes with your local electricity board.</p>
          </div>
        </header>

        <div className="service-two-col">
          <section className="service-left-col">
            <div className="service-info-card card">
              <h2>Report an Electricity Issue</h2>
              <p>Use the form below to register your complaint. Emergency issues are prioritised and attended within 4 hours.</p>

              <form className="service-form" onSubmit={handleSubmit} aria-label="Electricity complaint form">
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <div className="form-group">
                  <label htmlFor="e-name">Your Full Name</label>
                  <input id="e-name" type="text" placeholder="e.g. Sunita Sharma" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="e-phone">Mobile Number</label>
                  <input id="e-phone" type="tel" placeholder="e.g. 9876543210" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="e-consumer">Consumer / Meter Number</label>
                  <input id="e-consumer" type="text" placeholder="e.g. UP-12345678" value={formData.consumer} onChange={e => setFormData({ ...formData, consumer: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="e-address">Address / Location *</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input id="e-address" type="text" style={{ flex: 1 }} placeholder="Street, Ward, Sector" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                    <button type="button" className="btn btn-outline" onClick={handleGetLocation} disabled={loadingLocation}>
                      {loadingLocation ? 'Locating...' : '📍 GPS'}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="e-issue">Issue Type *</label>
                  <select id="e-issue" value={formData.issue} onChange={e => setFormData({ ...formData, issue: e.target.value })}>
                    <option value="">-- Select Issue --</option>
                    <option>Power outage</option>
                    <option>Voltage fluctuation</option>
                    <option>Transformer fault</option>
                    <option>Exposed wires</option>
                    <option>Bill dispute</option>
                    <option>New connection</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="e-desc">Description</label>
                  <textarea id="e-desc" rows={4} placeholder="Describe the issue in detail..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="e-photo">Upload Photo (optional)</label>
                  <input id="e-photo" type="file" accept="image/*" className="file-input" onChange={e => setFormData({ ...formData, proofImage: e.target.files[0] })} />
                </div>
                <button type="submit" disabled={submitting} className="btn btn-primary btn-full">
                  {submitting ? 'Submitting...' : 'Submit Complaint'}
                </button>
              </form>
            </div>

            <div className="service-mini-stats">
              <div className="mini-stat-card elec-stat">
                <span className="mini-stat-num">218</span>
                <span className="mini-stat-label">Complaints This Month</span>
              </div>
              <div className="mini-stat-card elec-stat">
                <span className="mini-stat-num">92%</span>
                <span className="mini-stat-label">Resolution Rate</span>
              </div>
              <div className="mini-stat-card elec-stat">
                <span className="mini-stat-num">4h</span>
                <span className="mini-stat-label">Emergency Response</span>
              </div>
            </div>
          </section>

          <section className="service-right-col">
            <h2 className="section-heading">Recent Electricity Complaints</h2>
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
              <h3 className="section-heading sm" style={{ marginTop: '2rem' }}>Outage Hotspots</h3>
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
