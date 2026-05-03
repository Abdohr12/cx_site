'use client';

import { useState } from 'react';
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

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 right-0 left-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Image
              src="/logo.png"
              alt="Codex"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold text-codex-dark">Codex</span>
          </motion.button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNav(link.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentPage === link.id
                    ? 'text-codex-accent'
                    : 'text-muted-foreground hover:text-codex-dark hover:bg-secondary'
                }`}
              >
                {currentPage === link.id && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-codex-accent/10 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNav('contact')}
              className="bg-codex-accent hover:bg-codex-accent/90 text-white font-semibold rounded-xl px-6 py-2.5 shadow-lg shadow-codex-accent/25 hover:shadow-xl hover:shadow-codex-accent/30 transition-all duration-300"
            >
              ابدأ الآن
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleNav(link.id)}
                  className={`block w-full text-right px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                    currentPage === link.id
                      ? 'bg-codex-accent/10 text-codex-accent'
                      : 'text-muted-foreground hover:bg-secondary hover:text-codex-dark'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <Button
                onClick={() => handleNav('contact')}
                className="w-full bg-codex-accent hover:bg-codex-accent/90 text-white font-semibold rounded-xl py-3 mt-2"
              >
                ابدأ الآن
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
