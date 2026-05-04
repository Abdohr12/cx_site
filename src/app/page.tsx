'use client';

import { useState } from 'react';
import Navbar from '@/components/codex/Navbar';
import Footer from '@/components/codex/Footer';
import HomePage from '@/components/codex/HomePage';
import ServicesPage from '@/components/codex/ServicesPage';
import AboutPage from '@/components/codex/AboutPage';
import PortfolioPage from '@/components/codex/PortfolioPage';
import ContactPage from '@/components/codex/ContactPage';

export default function CodexWebsite() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'portfolio':
        return <PortfolioPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
