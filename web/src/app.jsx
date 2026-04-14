import React from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import './i18n/config';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    return (
        <Router>
            <ScrollToTop />
            <AnimatedRoutes />
            <WhatsAppButton />
            <Toaster position="bottom-right" theme="system" />
        </Router>
    );
}

export default App;