'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Check, ArrowLeft, ArrowRight, Star, Zap, Crown,
} from 'lucide-react';
import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';
import type { TranslationKey } from '@/lib/i18n';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }} className={className}>
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

  const planIcons = [<Zap key="z" className="w-5 h-5" />, <Star key="s" className="w-5 h-5" />, <Crown key="c" className="w-5 h-5" />];
  const planNameKeys: TranslationKey[] = ['plan_basic', 'plan_pro', 'plan_enterprise'];
  const planDescKeys: TranslationKey[] = ['plan_basic_desc', 'plan_pro_desc', 'plan_enterprise_desc'];
  const planRec = [false, true, false];
  const planPrices = ['1,500', '3,500', 'حسب'];
  const planPeriods = ['درهم/شهر', 'درهم/شهر', 'الاحتياج'];

  // Parse plan features from translations
  const planFeaturesRaw = t('plan_features') as string;
  const planFeatureGroups = planFeaturesRaw.split('|').map(group => group.split(','));

  return (
    <div className="pt-[68px]">
      {/* Header */}
      <section className="hero-gradient py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00B0F0]/10 rounded-full blur-[120px]" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-5 border border-white/15">{t('services_badge')}</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              {t('services_title')} <span className="text-[#00B0F0]">{t('services_title_hl')}</span>
            </h1>
            <p className="text-lg text-white/75 max-w-xl mx-auto leading-relaxed">
              {t('services_desc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceIcons.map((icon, i) => {
              const features = (t(serviceFeatureKeys[i]) as string).split(',');
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-[#e0e7ef] h-full group hover:translate-y-[-4px] hover:[transform:perspective(1000px)_rotateY(2deg)]">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00B0F0]/15 to-[#00B0F0]/5 flex items-center justify-center mb-4 group-hover:from-[#00B0F0]/25 group-hover:to-[#00B0F0]/10 transition-all duration-300">
                      <Image src={icon} alt="" width={32} height={32} className="drop-shadow-md" />
                    </div>
                    <h3 className="text-lg font-bold text-[#002A5C] mb-2">{t(serviceTitleKeys[i])}</h3>
                    <p className="text-[#5a6a7e] text-[15px] leading-relaxed mb-4">{t(serviceDescKeys[i])}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {features.map((f, j) => (
                        <Badge key={j} variant="secondary" className="text-[12px] bg-[#002A5C]/[0.05] text-[#002A5C] hover:bg-[#002A5C]/[0.08]">{f.trim()}</Badge>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 lg:py-24 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-[#00B0F0] text-sm font-bold mb-2">{t('pricing_badge')}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002A5C] mb-4">{t('pricing_title')}</h2>
            <p className="text-[#5a6a7e] max-w-xl mx-auto text-[17px]">{t('pricing_desc')}</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto items-start">
            {planNameKeys.map((nameKey, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`relative rounded-2xl p-6 h-full flex flex-col transition-all duration-300 ${
                  planRec[i]
                    ? 'bg-[#002A5C] text-white shadow-xl shadow-[#002A5C]/20 border-2 border-[#00B0F0] md:scale-105 hover:translate-y-[-4px]'
                    : 'bg-white shadow-sm hover:shadow-lg border border-[#e0e7ef] hover:translate-y-[-4px] hover:[transform:perspective(1000px)_rotateY(2deg)]'
                }`}>
                  {planRec[i] && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-[#00B0F0] text-white text-[11px] font-bold px-3 py-1">{t('plan_pro_badge')}</Badge>
                    </div>
                  )}

                  <div className="mb-5">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${planRec[i] ? 'bg-[#00B0F0]/20 text-[#00B0F0]' : 'bg-[#00B0F0]/10 text-[#00B0F0]'}`}>{planIcons[i]}</div>
                    <h3 className={`text-lg font-bold mb-1 ${planRec[i] ? 'text-white' : 'text-[#002A5C]'}`}>{t(nameKey)}</h3>
                    <p className={`text-[13px] ${planRec[i] ? 'text-white/65' : 'text-[#5a6a7e]'}`}>{t(planDescKeys[i])}</p>
                  </div>

                  <div className="mb-5 flex items-baseline gap-1">
                    <span className={`text-3xl font-extrabold ${planRec[i] ? 'text-white' : 'text-[#002A5C]'}`}>{planPrices[i]}</span>
                    <span className={`text-sm ${planRec[i] ? 'text-white/65' : 'text-[#5a6a7e]'}`}>{planPeriods[i]}</span>
                  </div>

                  <ul className="space-y-2.5 mb-7 flex-1">
                    {(planFeatureGroups[i] || []).map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${planRec[i] ? 'text-[#00B0F0]' : 'text-green-500'}`} />
                        <span className={`text-[14px] ${planRec[i] ? 'text-white/85' : 'text-[#5a6a7e]'}`}>{f.trim()}</span>
                      </li>
                    ))}
                  </ul>

                  <Button onClick={() => onNavigate('contact')} className={`w-full font-semibold rounded-xl py-3 cursor-pointer transition-all duration-200 ${
                    planRec[i] ? 'bg-[#00B0F0] hover:bg-[#009ad6] text-white shadow-lg shadow-[#00B0F0]/20' : 'bg-[#002A5C] hover:bg-[#001d42] text-white'
                  }`}>
                    {t('plan_start')} <ArrowIcon className="w-4 h-4 ms-1" />
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl font-extrabold text-[#002A5C] mb-4">{t('pricing_cta_title')}</h2>
            <p className="text-[#5a6a7e] text-[17px] mb-8 leading-relaxed">{t('pricing_cta_desc')}</p>
            <Button size="lg" onClick={() => onNavigate('contact')} className="bg-[#00B0F0] hover:bg-[#009ad6] text-white font-bold rounded-xl px-7 py-[14px] text-[16px] shadow-lg shadow-[#00B0F0]/20 cursor-pointer transition-all duration-200">
              {t('pricing_cta_btn')} <ArrowIcon className="w-5 h-5 ms-2" />
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
