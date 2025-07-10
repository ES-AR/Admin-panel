import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FlowerHome from './pages/FlowerHome';
import Addflower from './pages/Addflower';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/flowers" />} />
        <Route path="/flowers" element={<FlowerHome />} />
        <Route path="/add" element={<Addflower />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
