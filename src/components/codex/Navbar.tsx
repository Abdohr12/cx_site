'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'services', label: 'خدماتنا' },
  { id: 'about', label: 'من نحن' },
  { id: 'contact', label: 'اتصل بنا' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <Image src="/logo.png" alt="Codex" width={36} height={36} className="rounded-lg" />
            <span
              className={`text-xl font-bold transition-colors ${
                scrolled ? 'text-[#002A5C]' : 'text-white'
              }`}
            >
              Codex
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`relative px-4 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 cursor-pointer ${
                  currentPage === link.id
                    ? scrolled
                      ? 'text-[#00B0F0]'
                      : 'text-[#00B0F0]'
                    : scrolled
                    ? 'text-[#3a4a5c] hover:text-[#002A5C] hover:bg-[#f0f4f8]'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
                {currentPage === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0.5 right-2 left-2 h-[2.5px] bg-[#00B0F0] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNav('contact')}
              className="bg-[#00B0F0] hover:bg-[#009ad6] text-white font-semibold rounded-xl px-5 py-2.5 text-[15px] shadow-md shadow-[#00B0F0]/20 hover:shadow-lg hover:shadow-[#00B0F0]/30 transition-all duration-200 cursor-pointer"
            >
              ابدأ الآن
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X size={22} className={scrolled ? 'text-[#002A5C]' : 'text-white'} />
            ) : (
              <Menu size={22} className={scrolled ? 'text-[#002A5C]' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-[#e0e7ef] overflow-hidden"
          >
            <div className="px-5 py-3 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`block w-full text-right px-4 py-3 rounded-xl text-[15px] font-medium transition-colors cursor-pointer ${
                    currentPage === link.id
                      ? 'bg-[#00B0F0]/8 text-[#00B0F0]'
                      : 'text-[#3a4a5c] hover:bg-[#f0f4f8]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2">
                <Button
                  onClick={() => handleNav('contact')}
                  className="w-full bg-[#00B0F0] hover:bg-[#009ad6] text-white font-semibold rounded-xl py-3 cursor-pointer"
                >
                  ابدأ الآن
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
