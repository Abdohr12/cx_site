'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Globe, Smartphone, Users, ShoppingCart, Palette, Headphones,
  Check, ArrowLeft, Star, Zap, Crown,
} from 'lucide-react';

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
  const services = [
    { icon: <Globe className="w-7 h-7 text-[#00B0F0]" />, title: 'تطوير مواقع الويب', description: 'نصمم ونطور مواقع ويب احترافية وسريعة ومتجاوبة. من المواقع البسيطة للمنصات المعقدة.', features: ['مواقع تجارية', 'منصات SaaS', 'لوحات التحكم', 'تحسين SEO'] },
    { icon: <Smartphone className="w-7 h-7 text-[#00B0F0]" />, title: 'تطبيقات الموبايل', description: 'تطبيقات موبايل عصرية لنظامي iOS و Android. أداء ممتاز وتجربة مستخدم رائعة.', features: ['iOS & Android', 'تطبيقات أصلية', 'PWA', 'إشعارات فورية'] },
    { icon: <Users className="w-7 h-7 text-[#00B0F0]" />, title: 'أنظمة إدارة المتدربين', description: 'نظام شامل لتدبير المتدربين، الحضور، النقاط، والشهادات. مصمم خصيصاً لمراكز التكوين.', features: ['تتبع الحضور', 'إدارة النقاط', 'إصدار الشهادات', 'تقارير مفصلة'] },
    { icon: <ShoppingCart className="w-7 h-7 text-[#00B0F0]" />, title: 'حلول التجارة الإلكترونية', description: 'متاجر إلكترونية متكاملة مع طرق دفع محلية وخدمة توصيل. بيع منتجاتك بسهولة.', features: ['متاجر إلكترونية', 'دفع محلي', 'إدارة المخزون', 'تحليلات المبيعات'] },
    { icon: <Palette className="w-7 h-7 text-[#00B0F0]" />, title: 'تصميم واجهات المستخدم', description: 'تصميم واجهات عصرية وجميلة تحسن تجربة المستخدم. من الهوية البصرية للنماذج التفاعلية.', features: ['UI/UX Design', 'تصميم الهوية', 'نماذج أولية', 'تصميم متجاوب'] },
    { icon: <Headphones className="w-7 h-7 text-[#00B0F0]" />, title: 'الدعم التقني والصيانة', description: 'دعم تقني 24/7 وصيانة مستمرة لمشاريعك الرقمية. كن مطمئن، كينا هنا من أجلك.', features: ['دعم 24/7', 'صيانة دورية', 'تحديثات أمنية', 'نسخ احتياطي'] },
  ];

  const pricingPlans = [
    { name: 'أساسي', price: '1,500', period: 'درهم/شهر', desc: 'مثالي للشركات الصغيرة اللي غادي تبدأ', icon: <Zap className="w-5 h-5" />, features: ['موقع ويب احترافي', 'تصميم متجاوب', 'حتى 5 صفحات', 'نموذج اتصال', 'تحسين SEO أساسي', 'دعم عبر البريد'], rec: false },
    { name: 'احترافي', price: '3,500', period: 'درهم/شهر', desc: 'الأكثر طلباً للشركات المتوسطة', icon: <Star className="w-5 h-5" />, features: ['كل شي في الباقة الأساسية', 'تطبيق موبايل', 'لوحة تحكم', 'حتى 20 صفحة', 'نظام إدارة المحتوى', 'تقارير وإحصائيات', 'دعم أولوي 24/7'], rec: true },
    { name: 'مؤسسات', price: 'حسب', period: 'الاحتياج', desc: 'مخصص للشركات الكبيرة والمؤسسات', icon: <Crown className="w-5 h-5" />, features: ['كل شي في الباقة الاحترافية', 'حلول مخصصة بالكامل', 'فريق مخصص', 'SLA مضمون', 'تكاملات متقدمة', 'تدريب الفريق', 'صيانة وتحديثات مستمرة'], rec: false },
  ];

  return (
    <div className="pt-[68px]">
      {/* Header */}
      <section className="hero-gradient py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00B0F0]/10 rounded-full blur-[120px]" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-5 border border-white/15">خدماتنا</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              خدمات مصممة <span className="text-[#00B0F0]">للشركات المغربية</span>
            </h1>
            <p className="text-lg text-white/75 max-w-xl mx-auto leading-relaxed">
              نقدم مجموعة واسعة من الخدمات الرقمية المتكاملة لمساعدتك تنمو وتتطور في العالم الرقمي
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-[#e0e7ef] h-full group">
                  <div className="w-12 h-12 rounded-xl bg-[#00B0F0]/10 flex items-center justify-center mb-4 group-hover:bg-[#00B0F0]/20 transition-colors">{s.icon}</div>
                  <h3 className="text-lg font-bold text-[#002A5C] mb-2">{s.title}</h3>
                  <p className="text-[#5a6a7e] text-[15px] leading-relaxed mb-4">{s.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.features.map((f, j) => (
                      <Badge key={j} variant="secondary" className="text-[12px] bg-[#002A5C]/[0.05] text-[#002A5C] hover:bg-[#002A5C]/[0.08]">{f}</Badge>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 lg:py-24 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-[#00B0F0] text-sm font-bold mb-2">الأسعار</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002A5C] mb-4">باقات تناسب جميع الميزانيات</h2>
            <p className="text-[#5a6a7e] max-w-xl mx-auto text-[17px]">اختار الباقة اللي تناسب احتياجاتك. كل الباقات فيها دعم تقني وضمان الجودة.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto items-start">
            {pricingPlans.map((plan, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`relative rounded-2xl p-6 h-full flex flex-col transition-shadow duration-300 ${
                  plan.rec
                    ? 'bg-[#002A5C] text-white shadow-xl shadow-[#002A5C]/20 border-2 border-[#00B0F0] md:scale-105'
                    : 'bg-white shadow-sm hover:shadow-lg border border-[#e0e7ef]'
                }`}>
                  {plan.rec && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-[#00B0F0] text-white text-[11px] font-bold px-3 py-1">الأكثر طلباً</Badge>
                    </div>
                  )}

                  <div className="mb-5">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${plan.rec ? 'bg-[#00B0F0]/20 text-[#00B0F0]' : 'bg-[#00B0F0]/10 text-[#00B0F0]'}`}>{plan.icon}</div>
                    <h3 className={`text-lg font-bold mb-1 ${plan.rec ? 'text-white' : 'text-[#002A5C]'}`}>{plan.name}</h3>
                    <p className={`text-[13px] ${plan.rec ? 'text-white/65' : 'text-[#5a6a7e]'}`}>{plan.desc}</p>
                  </div>

                  <div className="mb-5 flex items-baseline gap-1">
                    <span className={`text-3xl font-extrabold ${plan.rec ? 'text-white' : 'text-[#002A5C]'}`}>{plan.price}</span>
                    <span className={`text-sm ${plan.rec ? 'text-white/65' : 'text-[#5a6a7e]'}`}>{plan.period}</span>
                  </div>

                  <ul className="space-y-2.5 mb-7 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.rec ? 'text-[#00B0F0]' : 'text-green-500'}`} />
                        <span className={`text-[14px] ${plan.rec ? 'text-white/85' : 'text-[#5a6a7e]'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button onClick={() => onNavigate('contact')} className={`w-full font-semibold rounded-xl py-3 cursor-pointer transition-all duration-200 ${
                    plan.rec ? 'bg-[#00B0F0] hover:bg-[#009ad6] text-white shadow-lg shadow-[#00B0F0]/20' : 'bg-[#002A5C] hover:bg-[#001d42] text-white'
                  }`}>
                    ابدأ الآن <ArrowLeft className="w-4 h-4 mr-1" />
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
            <h2 className="text-3xl font-extrabold text-[#002A5C] mb-4">محتار في الباقة اللي تناسبك؟</h2>
            <p className="text-[#5a6a7e] text-[17px] mb-8 leading-relaxed">تواصل معنا واحنا نساعدك تختار الأفضل لمشروعك. الاستشارة مجانية!</p>
            <Button size="lg" onClick={() => onNavigate('contact')} className="bg-[#00B0F0] hover:bg-[#009ad6] text-white font-bold rounded-xl px-7 py-[14px] text-[16px] shadow-lg shadow-[#00B0F0]/20 cursor-pointer transition-all duration-200">
              تواصل معنا مجاناً <ArrowLeft className="w-5 h-5 mr-2" />
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
