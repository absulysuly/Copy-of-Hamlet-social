import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import IntegrityHubPage from './pages/IntegrityHubPage';
import GovernoratePage from './pages/GovernoratePage';
import InternationalPortalPage from './pages/InternationalPortalPage';
import PoliticalPartyPortalPage from './pages/PoliticalPartyPortalPage';
import PoliticalPartyPage from './pages/PoliticalPartyPage';
import PricingPage from './pages/PricingPage';
import ElectionHubPage from './pages/ElectionHubPage';
import DigitalTransparencyPlatformPage from './pages/DigitalTransparencyPlatformPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

type Language = 'ar' | 'en' | 'ku';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' || lang === 'ku' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    handleLangChange('ar'); // Set initial language and direction
  }, []);


  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header currentLang={language} onLangChange={handleLangChange} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage language={language} onLangChange={handleLangChange} />} />
            <Route path="/candidate-dashboard" element={<DashboardPage />} />
            <Route path="/integrity-hub" element={<IntegrityHubPage />} />
            <Route path="/governorate/:name" element={<GovernoratePage />} />
            <Route path="/international-portal" element={<InternationalPortalPage />} />
            <Route path="/parties" element={<PoliticalPartyPortalPage />} />
            <Route path="/party/:id" element={<PoliticalPartyPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/election-hub" element={<ElectionHubPage />} />
            <Route path="/digital-transparency" element={<DigitalTransparencyPlatformPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;