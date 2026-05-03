'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinkKeys = [
  { id: 'home', key: 'nav_home' as const },
  { id: 'services', key: 'nav_services' as const },
  { id: 'about', key: 'nav_about' as const },
  { id: 'contact', key: 'nav_contact' as const },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { t, toggleLang, lang, isRTL } = useLang();
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
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,42,92,0.08)] border-b border-white/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <motion.button
            onClick={() => handleNav('home')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 cursor-pointer shrink-0"
          >
            <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center ${
              scrolled ? 'bg-gradient-to-br from-[#002A5C] to-[#004d8a]' : 'glass'
            }`}>
              <Image src="/logo.png" alt="Codex" width={28} height={28} className="rounded-md" />
            </div>
            <span
              className={`text-[22px] font-extrabold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-[#002A5C]' : 'text-white'
              }`}
            >
              Codex
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinkKeys.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`relative px-5 py-2.5 rounded-xl text-[15px] font-semibold transition-all duration-300 cursor-pointer ${
                  currentPage === link.id
                    ? scrolled
                      ? 'text-[#00B0F0]'
                      : 'text-[#00B0F0]'
                    : scrolled
                    ? 'text-[#3a4a5c] hover:text-[#002A5C]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {t(link.key)}
                {currentPage === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute bottom-1 ${
                      isRTL ? 'right-3 left-3' : 'right-3 left-3'
                    } h-[2.5px] rounded-full bg-gradient-to-l from-[#00B0F0] to-[#00D4FF]`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {currentPage === link.id && scrolled && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 rounded-xl bg-[#00B0F0]/8"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Desktop CTA + Lang Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLang}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                scrolled
                  ? 'text-[#002A5C] hover:bg-[#002A5C]/5 border border-[#002A5C]/10'
                  : 'text-white/80 hover:text-white border border-white/15 hover:bg-white/5'
              }`}
            >
              <Globe className="w-4 h-4" />
              {t('lang_switch')}
            </motion.button>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={() => handleNav('contact')}
                className="bg-gradient-to-l from-[#00B0F0] to-[#0098d4] hover:from-[#00c4ff] hover:to-[#00B0F0] text-white font-bold rounded-xl px-6 py-2.5 text-[15px] shadow-lg shadow-[#00B0F0]/25 hover:shadow-xl hover:shadow-[#00B0F0]/35 transition-all duration-300 cursor-pointer"
              >
                {t('nav_cta')}
              </Button>
            </motion.div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLang}
              className={`p-2 rounded-lg cursor-pointer text-sm font-bold transition-colors ${
                scrolled ? 'text-[#002A5C]' : 'text-white'
              }`}
            >
              {t('lang_switch')}
            </button>
            <button
              className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                scrolled ? 'bg-[#f0f4f8] text-[#002A5C]' : 'glass text-white'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#e0e7ef]/50 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinkKeys.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(link.id)}
                  className={`block w-full text-right px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-all cursor-pointer ${
                    currentPage === link.id
                      ? 'bg-gradient-to-l from-[#00B0F0]/10 to-[#00B0F0]/5 text-[#00B0F0]'
                      : 'text-[#3a4a5c] hover:bg-[#f0f4f8]'
                  }`}
                >
                  {t(link.key)}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-3"
              >
                <Button
                  onClick={() => handleNav('contact')}
                  className="w-full bg-gradient-to-l from-[#00B0F0] to-[#0098d4] text-white font-bold rounded-xl py-3.5 shadow-lg shadow-[#00B0F0]/20 cursor-pointer"
                >
                  {t('nav_cta')}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
