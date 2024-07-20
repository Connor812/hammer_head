import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Service from './pages/Service';
import Quote from './pages/Quote';
import QuoteSuccess from './pages/QuoteSuccess';
import Header from './components/Header';
import Footer from './components/Footer';

import ScrollToTop from './helpers/ScrollToTop';
import { Helmet } from 'react-helmet';
import { DataProvider } from './DataProvider';

import "./assets/css/main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <DataProvider>
        <ScrollToTop />
        <AppContent />
      </DataProvider>
    </Router>
  );
}

function AppContent() {
  return (
    <>
      <Helmet>
        <title>Hammer Head Home Services</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />
      <center className="main-wrapper">
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/service/:id" element={<Service />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/quote/:id" element={<Quote />} />
          <Route path="/quote_success" element={<QuoteSuccess />} />
        </Routes>
      </center>
      <Footer />
    </>
  );
}

export default App;