'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft, ArrowRight, Sparkles, ExternalLink,
  Layers, Smartphone, ShoppingBag, Palette, Server,
} from 'lucide-react';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/i18n';

interface PortfolioPageProps {
  onNavigate: (page: string) => void;
}

const projectIcons = ['/icons/3d/users.png', '/icons/3d/ecommerce.png', '/icons/3d/mobile.png', '/icons/3d/web-dev.png', '/icons/3d/dashboard.png', '/icons/3d/design.png'];
const projectGradients = [
  'from-[#002A5C] via-[#004d8a] to-[#00B0F0]',
  'from-[#00B0F0] via-[#0098d4] to-[#004d8a]',
  'from-[#002A5C] via-[#003d7a] to-[#00B0F0]',
  'from-[#00B0F0] via-[#00d4ff] to-[#002A5C]',
  'from-[#001a3d] via-[#004d8a] to-[#0088cc]',
  'from-[#002A5C] via-[#0066aa] to-[#00d4ff]',
];

const filterOptions = [
  { id: 'all', key: 'portfolio_filter_all' as TranslationKey, icon: <Layers className="w-4 h-4" /> },
  { id: 'web', key: 'portfolio_filter_web' as TranslationKey, icon: <ExternalLink className="w-4 h-4" /> },
  { id: 'mobile', key: 'portfolio_filter_mobile' as TranslationKey, icon: <Smartphone className="w-4 h-4" /> },
  { id: 'ecommerce', key: 'portfolio_filter_ecommerce' as TranslationKey, icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'design', key: 'portfolio_filter_design' as TranslationKey, icon: <Palette className="w-4 h-4" /> },
  { id: 'system', key: 'portfolio_filter_system' as TranslationKey, icon: <Server className="w-4 h-4" /> },
];

export default function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  const { t, isRTL } = useLang();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [1, 2, 3, 4, 5, 6].map((i) => ({
    num: i,
    titleKey: `pf_${i}_title` as TranslationKey,
    descKey: `pf_${i}_desc` as TranslationKey,
    catKey: `pf_${i}_cat` as TranslationKey,
    techKey: `pf_${i}_tech` as TranslationKey,
    clientKey: `pf_${i}_client` as TranslationKey,
  }));

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => t(p.catKey) === activeFilter);

  return (
    <div className="pt-[72px]">
      {/* Header */}
      <section className="hero-gradient py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#00B0F0]/15 rounded-full blur-[140px] orb" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#00B0F0]/8 rounded-full blur-[120px] orb-delay" />
        <div className="absolute inset-0 grid-pattern opacity-[0.3]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}>
            <span className="inline-flex items-center gap-2 glass text-white/90 px-5 py-2.5 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-[#00D4FF]" />
              {t('portfolio_badge')}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              {t('portfolio_title')}{' '}
              <span className="gradient-text">{t('portfolio_title_hl')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">
              {t('portfolio_desc')}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60V30C240 0 480 50 720 30C960 10 1200 50 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Filter + Projects */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-14"
          >
            {filterOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-300 cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-[#002A5C] text-white shadow-lg shadow-[#002A5C]/20'
                    : 'bg-[#f0f4f8] text-[#5a6a7e] hover:bg-[#e0e7ef] hover:text-[#002A5C]'
                }`}
              >
                {f.icon}
                {t(f.key)}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.num}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={{ y: -6 }}
                >
                  <div className="card-3d bg-white rounded-3xl overflow-hidden shadow-sm border border-[#e0e7ef]/80 h-full group">
                    {/* Project Visual */}
                    <div className={`relative h-56 bg-gradient-to-br ${projectGradients[p.num - 1]} overflow-hidden`}>
                      <div className="absolute inset-0 grid-pattern opacity-[0.15]" />

                      {/* Floating icon */}
                      <motion.div
                        animate={{ y: [-6, 6, -6] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                          <Image src={projectIcons[p.num - 1]} alt="" width={52} height={52} className="drop-shadow-2xl" />
                        </div>
                      </motion.div>

                      {/* Category badge */}
                      <div className="absolute top-4 right-4">
                        <span className="glass text-white/90 text-[11px] font-bold px-3 py-1.5 rounded-full">
                          {t(filterOptions.find(fo => fo.id === t(p.catKey))?.key || 'portfolio_filter_all')}
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                        <motion.div
                          initial={{ y: 20 }}
                          whileHover={{ y: 0 }}
                          className="bg-white text-[#002A5C] font-bold text-[13px] px-5 py-2.5 rounded-xl shadow-lg cursor-pointer"
                        >
                          {t('pf_view')}
                        </motion.div>
                      </div>

                      {/* Decorative circles */}
                      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5" />
                      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/5" />
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-extrabold text-[#002A5C] mb-2 group-hover:text-[#00B0F0] transition-colors duration-300">
                        {t(p.titleKey)}
                      </h3>
                      <p className="text-[#5a6a7e] text-[14px] leading-relaxed mb-4">
                        {t(p.descKey)}
                      </p>

                      {/* Client */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-md bg-[#002A5C]/8 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-[#002A5C]">C</span>
                        </div>
                        <span className="text-[12px] text-[#8a96a8] font-medium">{t('pf_client')}</span>
                        <span className="text-[12px] text-[#3a4a5c] font-semibold">{t(p.clientKey)}</span>
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {(t(p.techKey) as string).split(', ').map((tech, j) => (
                          <span key={j} className="text-[11px] font-semibold bg-[#f0f4f8] text-[#5a6a7e] px-2.5 py-1 rounded-lg">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-3xl bg-[#f0f4f8] flex items-center justify-center mx-auto mb-5">
                <Layers className="w-8 h-8 text-[#8a96a8]" />
              </div>
              <p className="text-[#8a96a8] text-[16px]">No projects found</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-gradient py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] orb" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#00B0F0]/8 rounded-full blur-[150px] orb-delay" />
        <div className="absolute inset-0 grid-pattern opacity-[0.3]" />

        <div className="absolute top-0 left-0 right-0 rotate-180">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60V30C240 0 480 50 720 30C960 10 1200 50 1440 30V60H0Z" fill="white" />
          </svg>
        </div>

        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              {t('portfolio_cta_title')}
            </h2>
            <p className="text-lg text-white/65 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('portfolio_cta_desc')}
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                onClick={() => onNavigate('contact')}
                className="bg-white text-[#002A5C] hover:bg-white/95 font-bold rounded-2xl px-8 py-4 text-[17px] shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {t('portfolio_cta_btn')}
                <ArrowIcon className="w-5 h-5 ms-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
