import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './RoadRepair.css';
import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';
import ComplaintCard from '../components/ComplaintCard';
import { getAllComplaints, createComplaint } from '../../firebaseOperations/db';

export default function RoadRepair() {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({
    name: '', phone: '', road: '', ward: '', issue: '', severity: '', description: '', proofImage: null,
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
      setComplaints(mappedComplaints.filter(c => c.category === 'Road Repair'));
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
    if (!formData.road || !formData.issue) {
      setError('Road Name and Issue Type are required.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const complaintData = {
        category: 'Road Repair',
        department: 'Road Repair',
        description: `Name: ${formData.name}, Phone: ${formData.phone}, Severity: ${formData.severity}, Issue: ${formData.issue}. ${formData.description}`,
        address: `${formData.road}, ${formData.ward}`,
        coordinates: formData.coordinates,
        name: formData.name,
        phone: formData.phone
      };

      await createComplaint(complaintData);
      alert('Complaint submitted successfully!');
      setFormData({ name: '', phone: '', road: '', ward: '', issue: '', severity: '', description: '', proofImage: null, coordinates: { lat: 28.6139, lng: 77.209 } });
      fetchComplaints();
    } catch (err) {
      console.error(err);
      setError('Network error submitting complaint.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="road-page">
      <CitizenNavbar />

      <main className="road-main">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <span>Road Repair</span>
        </nav>

        <header className="service-page-header road-header">
          <div className="service-header-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 56L22 8h20l14 48" stroke="#FF6F00" strokeWidth="2.5" strokeLinejoin="round" />
              <line x1="32" y1="8" x2="32" y2="56" stroke="#FF6F00" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="23" cy="36" r="5" fill="#FF6F00" opacity="0.3" stroke="#FF6F00" strokeWidth="2" />
            </svg>
          </div>
          <div className="service-header-text">
            <h1>Road Repair Services</h1>
            <p>Report potholes, road cave-ins, broken footpaths, and damaged street infrastructure in your area.</p>
          </div>
        </header>

        <div className="service-two-col">
          <section className="service-left-col">
            <div className="service-info-card card">
              <h2>Report a Road Issue</h2>
              <p>Your report will be reviewed by the Public Works Department. Priority is given to safety hazards.</p>

              <form className="service-form" onSubmit={handleSubmit} aria-label="Road repair complaint form">
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <div className="form-group">
                  <label htmlFor="r-name">Your Full Name</label>
                  <input id="r-name" type="text" placeholder="e.g. Vikram Singh" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="r-phone">Mobile Number</label>
                  <input id="r-phone" type="tel" placeholder="e.g. 9876543210" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="r-road">Road Name / Landmark *</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input id="r-road" type="text" style={{ flex: 1 }} placeholder="e.g. MG Road near Bus Stand" value={formData.road} onChange={e => setFormData({ ...formData, road: e.target.value })} />
                    <button type="button" className="btn btn-outline" onClick={handleGetLocation} disabled={loadingLocation}>
                      {loadingLocation ? 'Locating...' : '📍 GPS'}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="r-ward">Ward / Sector</label>
                  <input id="r-ward" type="text" placeholder="e.g. Ward 7, Sector 12" value={formData.ward} onChange={e => setFormData({ ...formData, ward: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="r-issue">Issue Type *</label>
                  <select id="r-issue" value={formData.issue} onChange={e => setFormData({ ...formData, issue: e.target.value })}>
                    <option value="">-- Select Issue --</option>
                    <option>Pothole</option>
                    <option>Road cave-in / sinkhole</option>
                    <option>Broken footpath</option>
                    <option>Damaged divider</option>
                    <option>Missing manhole cover</option>
                    <option>Waterlogging on road</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="r-severity">Severity</label>
                  <select id="r-severity" value={formData.severity} onChange={e => setFormData({ ...formData, severity: e.target.value })}>
                    <option value="">-- Select Severity --</option>
                    <option>Minor (cosmetic)</option>
                    <option>Moderate (slows traffic)</option>
                    <option>Severe (safety hazard)</option>
                    <option>Critical (road blocked)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="r-desc">Description</label>
                  <textarea id="r-desc" rows={4} placeholder="Please describe the road damage..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="r-photo">Upload Photo</label>
                  <input id="r-photo" type="file" accept="image/*" className="file-input" onChange={e => setFormData({ ...formData, proofImage: e.target.files[0] })} />
                </div>
                <button type="submit" disabled={submitting} className="btn btn-primary btn-full">
                  {submitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </form>
            </div>

            <div className="service-mini-stats">
              <div className="mini-stat-card">
                <span className="mini-stat-num road-num">187</span>
                <span className="mini-stat-label">Reports This Month</span>
              </div>
              <div className="mini-stat-card">
                <span className="mini-stat-num road-num">83%</span>
                <span className="mini-stat-label">Resolution Rate</span>
              </div>
              <div className="mini-stat-card">
                <span className="mini-stat-num road-num">5d</span>
                <span className="mini-stat-label">Avg. Repair Time</span>
              </div>
            </div>
          </section>

          <section className="service-right-col">
            <h2 className="section-heading">Recent Road Complaints</h2>
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
              <h3 className="section-heading sm" style={{ marginTop: '2rem' }}>Road Damage Map</h3>
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
