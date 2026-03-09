import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "leaflet/dist/leaflet.css";

import LoginPage from './Auth/login/LoginPage';
import CitizenSignup from './Auth/signup/CitizenSignup';
import WorkerSignup from './Auth/signup/WorkerSignup';

import HomePage from './HomePage';
import CitizenDashboard from './Citizens/pages/CitizenDashboard';
import WaterService from './Citizens/pages/WaterService';
import ElectricityService from './Citizens/pages/ElectricityService';
import SanitationService from './Citizens/pages/SanitationService';
import PropertyTax from './Citizens/pages/PropertyTax';
import RoadRepair from './Citizens/pages/RoadRepair';
import DevelopmentVoting from './Citizens/pages/DevelopmentVoting';
import FeedbackPage from './Citizens/pages/FeedbackPage';
import BestCitizen from './Citizens/pages/BestCitizen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
        <Route path="/citizen/water" element={<WaterService />} />
        <Route path="/citizen/electricity" element={<ElectricityService />} />
        <Route path="/citizen/sanitation" element={<SanitationService />} />
        <Route path="/citizen/property-tax" element={<PropertyTax />} />
        <Route path="/citizen/road-repair" element={<RoadRepair />} />
        <Route path="/citizen/development" element={<DevelopmentVoting />} />
        <Route path="/citizen/feedback" element={<FeedbackPage />} />
        <Route path="/citizen/best-citizen" element={<BestCitizen />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/citizen" element={<CitizenSignup />} />
        <Route path="/signup/worker" element={<WorkerSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
