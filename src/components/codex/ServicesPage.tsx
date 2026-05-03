'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Check, ArrowLeft, ArrowRight, Zap, Crown,
  Sparkles, ArrowUpRight,
} from 'lucide-react';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/i18n';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { t, isRTL } = useLang();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const serviceIcons = [
    '/icons/3d/web-dev.png',
    '/icons/3d/mobile.png',
    '/icons/3d/users.png',
    '/icons/3d/ecommerce.png',
    '/icons/3d/design.png',
    '/icons/3d/support.png',
  ];

  const serviceTitleKeys: TranslationKey[] = [
    'svc_web_title', 'svc_mobile_title', 'svc_trainees_title',
    'svc_ecommerce_title', 'svc_design_title', 'svc_support_title',
  ];

  const serviceDescKeys: TranslationKey[] = [
    'svc_web_desc', 'svc_mobile_desc', 'svc_trainees_desc',
    'svc_ecommerce_desc', 'svc_design_desc', 'svc_support_desc',
  ];

  const serviceFeatureKeys: TranslationKey[] = [
    'svc_web_features', 'svc_mobile_features', 'svc_trainees_features',
    'svc_ecommerce_features', 'svc_design_features', 'svc_support_features',
  ];

  const planIcons = [<Zap key="z" className="w-5 h-5" />, <Sparkles key="s" className="w-5 h-5" />, <Crown key="c" className="w-5 h-5" />];
  const planNameKeys: TranslationKey[] = ['plan_basic', 'plan_pro', 'plan_enterprise'];
  const planDescKeys: TranslationKey[] = ['plan_basic_desc', 'plan_pro_desc', 'plan_enterprise_desc'];
  const planRec = [false, true, false];
  const planPrices = ['1,500', '3,500', 'حسب'];
  const planPeriods = ['درهم/شهر', 'درهم/شهر', 'الاحتياج'];

  const planFeaturesRaw = t('plan_features') as string;
  const planFeatureGroups = planFeaturesRaw.split('|').map(group => group.split(','));

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
              {t('services_badge')}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              {t('services_title')}{' '}
              <span className="gradient-text">{t('services_title_hl')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">
              {t('services_desc')}
            </p>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60V30C240 0 480 50 720 30C960 10 1200 50 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceIcons.map((icon, i) => {
              const features = (t(serviceFeatureKeys[i]) as string).split(',');
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="card-3d bg-white rounded-3xl p-7 shadow-sm border border-[#e0e7ef]/80 h-full group relative overflow-hidden hover:border-[#00B0F0]/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00B0F0]/0 to-[#002A5C]/0 group-hover:from-[#00B0F0]/3 group-hover:to-[#002A5C]/2 transition-all duration-500 rounded-3xl" />

                    <div className="relative flex items-start justify-between mb-5">
                      <div className="w-16 h-16 rounded-2xl icon-container flex items-center justify-center group-hover:icon-container-hover">
                        <Image src={icon} alt="" width={36} height={36} className="drop-shadow-lg" />
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-[#f0f4f8] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                        <ArrowUpRight className="w-4 h-4 text-[#00B0F0]" />
                      </div>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#002A5C] mb-3">{t(serviceTitleKeys[i])}</h3>
                    <p className="text-[#5a6a7e] text-[15px] leading-relaxed mb-5">{t(serviceDescKeys[i])}</p>
                    <div className="flex flex-wrap gap-2">
                      {features.map((f, j) => (
                        <Badge key={j} variant="secondary" className="text-[11px] font-semibold bg-[#002A5C]/[0.04] text-[#002A5C]/80 hover:bg-[#00B0F0]/10 hover:text-[#00B0F0] border border-[#e0e7ef]/60 transition-colors duration-200">
                          {f.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 lg:py-28 mesh-gradient relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-[#00B0F0] text-sm font-bold mb-3 uppercase tracking-wider">
              <Crown className="w-4 h-4" />
              {t('pricing_badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-[#002A5C] mb-5 leading-tight">{t('pricing_title')}</h2>
            <p className="text-[#5a6a7e] max-w-2xl mx-auto text-[18px]">{t('pricing_desc')}</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {planNameKeys.map((nameKey, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6 }}
              >
                <div className={`relative rounded-3xl p-7 h-full flex flex-col overflow-hidden ${
                  planRec[i]
                    ? 'pricing-popular text-white'
                    : 'bg-white shadow-sm border border-[#e0e7ef]/80'
                }`}>
                  {planRec[i] && (
                    <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-[#00D4FF] via-[#00B0F0] to-[#0088cc]" />
                  )}

                  {planRec[i] && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-l from-[#00D4FF] to-[#00B0F0] text-white text-[11px] font-bold px-4 py-1.5 shadow-lg shadow-[#00B0F0]/30 border-0">
                        {t('plan_pro_badge')}
                      </Badge>
                    </div>
                  )}

                  <div className="mb-6 mt-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      planRec[i] ? 'bg-[#00B0F0]/20 text-[#00D4FF]' : 'icon-container'
                    }`}>{planIcons[i]}</div>
                    <h3 className={`text-lg font-extrabold mb-1.5 ${planRec[i] ? 'text-white' : 'text-[#002A5C]'}`}>{t(nameKey)}</h3>
                    <p className={`text-[13px] ${planRec[i] ? 'text-white/55' : 'text-[#8a96a8]'}`}>{t(planDescKeys[i])}</p>
                  </div>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className={`text-4xl font-extrabold tracking-tight ${planRec[i] ? 'text-white' : 'text-[#002A5C]'}`}>{planPrices[i]}</span>
                    <span className={`text-sm ${planRec[i] ? 'text-white/55' : 'text-[#8a96a8]'}`}>{planPeriods[i]}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {(planFeatureGroups[i] || []).map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          planRec[i] ? 'bg-[#00B0F0]/20' : 'bg-emerald-50'
                        }`}>
                          <Check className={`w-3 h-3 ${planRec[i] ? 'text-[#00D4FF]' : 'text-emerald-500'}`} />
                        </div>
                        <span className={`text-[14px] ${planRec[i] ? 'text-white/80' : 'text-[#5a6a7e]'}`}>{f.trim()}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={() => onNavigate('contact')} className={`w-full font-bold rounded-2xl py-3.5 cursor-pointer transition-all duration-300 text-[15px] ${
                      planRec[i]
                        ? 'bg-gradient-to-l from-[#00D4FF] to-[#00B0F0] hover:from-[#00e0ff] hover:to-[#00c4ff] text-white shadow-lg shadow-[#00B0F0]/30 hover:shadow-xl hover:shadow-[#00B0F0]/40'
                        : 'bg-[#002A5C] hover:bg-[#001d42] text-white shadow-md shadow-[#002A5C]/15 hover:shadow-lg'
                    }`}>
                      {t('plan_start')} <ArrowIcon className="w-4 h-4 ms-1" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="bg-gradient-to-br from-[#f8fafc] to-white rounded-3xl p-10 lg:p-14 border border-[#e0e7ef]/60 shadow-lg shadow-[#002A5C]/[0.03]">
              <h2 className="text-3xl font-extrabold text-[#002A5C] mb-4">{t('pricing_cta_title')}</h2>
              <p className="text-[#5a6a7e] text-[17px] mb-8 leading-relaxed">{t('pricing_cta_desc')}</p>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" onClick={() => onNavigate('contact')} className="bg-gradient-to-l from-[#00B0F0] to-[#0098d4] hover:from-[#00c4ff] hover:to-[#00B0F0] text-white font-bold rounded-2xl px-8 py-4 text-[16px] shadow-xl shadow-[#00B0F0]/25 cursor-pointer transition-all duration-300">
                  {t('pricing_cta_btn')} <ArrowIcon className="w-5 h-5 ms-2" />
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
