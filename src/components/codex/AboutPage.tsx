'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Lightbulb, Shield, MapPin, Target, Heart, Rocket } from 'lucide-react';

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-4xl lg:text-5xl font-extrabold text-[#00B0F0]">
      {count}{suffix}
    </span>
  );
}

export default function AboutPage() {
  const team = [
    { name: 'يوسف العلوي', role: 'المدير التقني', initials: 'يع', bg: 'bg-[#002A5C]' },
    { name: 'سارة بنعمر', role: 'مديرة التصميم', initials: 'سب', bg: 'bg-[#00B0F0]' },
    { name: 'كريم الراضي', role: 'مطور رئيسي', initials: 'كر', bg: 'bg-[#002A5C]' },
    { name: 'فاطمة الزهراء', role: 'مديرة المشاريع', initials: 'فز', bg: 'bg-[#00B0F0]' },
  ];

  const values = [
    { icon: <Lightbulb className="w-7 h-7 text-[#00B0F0]" />, title: 'الابتكار', description: 'دائماً نبحث عن حلول جديدة ومبتكرة. نستعمل أحدث التقنيات عشان نقدم أحسن النتائج لعملائنا.' },
    { icon: <Shield className="w-7 h-7 text-[#00B0F0]" />, title: 'الثقة', description: 'بنينا علاقات قوية مع عملائنا على أساس الثقة والشفافية. سمعة كتقول على هادشي.' },
    { icon: <MapPin className="w-7 h-7 text-[#00B0F0]" />, title: 'التركيز المحلي', description: 'نفهمو السوق المغربي بزاف. حلولنا مصممة خصيصاً لتلبية احتياجات الشركات المغربية.' },
  ];

  const stats = [
    { number: 50, suffix: '+', label: 'شركة راضية' },
    { number: 200, suffix: '+', label: 'مشروع منجز' },
    { number: 98, suffix: '%', label: 'نسبة الرضا' },
    { number: 5, suffix: '+', label: 'سنوات خبرة' },
  ];

  return (
    <div className="pt-[68px]">
      {/* Header */}
      <section className="hero-gradient py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00B0F0]/10 rounded-full blur-[120px]" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-5 border border-white/15">من نحن</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              قصتنا، <span className="text-[#00B0F0]">رؤيتنا</span>
            </h1>
            <p className="text-lg text-white/75 max-w-xl mx-auto leading-relaxed">
              نحنا فريق شاب وطموح من المغرب، شغوفين بالتكنولوجيا ومصممين نساعدو الشركات المغربية تنتقل للعالم الرقمي
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span className="inline-block text-[#00B0F0] text-sm font-bold mb-2">قصتنا</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002A5C] mb-6 leading-tight">من فكرة صغيرة لوكالة رائدة</h2>
              <div className="space-y-4 text-[#5a6a7e] leading-[1.9] text-[15px]">
                <p>بدأت Codex عام 2019 بفكرة بسيطة: الشركات المغربية الصغيرة والمتوسطة تحتاج حلول رقمية متكاملة وسهلة الاستخدام، بس بسعار معقولة.</p>
                <p>مؤسسنا، وهو مطور مغربي شاب، لاحظ أن بزاف المراكز والشركات كانت تعاني من تدبير شؤونها بشكل رقمي. فقرر يبدأ مشروع كي يساعدهم.</p>
                <p>اليوم، بعد أكثر من 5 سنوات، Codex تخدم أكثر من 50 شركة عبر المغرب، ووصلت لمشاريع في شمال إفريقيا والشرق الأوسط. الفريق كبر، الباقات تضافت، بس الرسالة باقات واضحة: نخلّي التكنولوجيا سهلة للجميع.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#002A5C] to-[#005a9e] rounded-3xl p-8 lg:p-10 text-white">
                  <Rocket className="w-10 h-10 text-[#00B0F0] mb-5" />
                  <h3 className="text-xl font-bold mb-3">مهمتنا واضحة</h3>
                  <p className="text-white/75 leading-[1.9] mb-5 text-[15px]">
                    &ldquo;نريد نخلّي كل شركة مغربية، صغيرة كانت ولا كبيرة، تقدر تستفيد من التكنولوجيا عشان تنمو وتتطور. التكنولوجيا مش حكر على الكبار.&rdquo;
                  </p>
                  <p className="text-sm text-white/50">— فريق Codex</p>
                </div>
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-[#00B0F0]/10 rounded-2xl -z-10" />
                <div className="absolute -bottom-3 -left-3 w-28 h-28 bg-[#002A5C]/10 rounded-2xl -z-10" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 lg:py-24 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-[#00B0F0] text-sm font-bold mb-2">رؤيتنا ورسالتنا</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002A5C] mb-4">وين كنمشيو وشنو كنخدمو</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#e0e7ef] h-full">
                <div className="w-11 h-11 rounded-lg bg-[#002A5C] flex items-center justify-center mb-4"><Target className="w-5 h-5 text-white" /></div>
                <h3 className="text-lg font-bold text-[#002A5C] mb-3">رؤيتنا</h3>
                <p className="text-[#5a6a7e] leading-relaxed text-[15px]">نكون الوكالة الرقمية الأولى في شمال إفريقيا، معروفة بالجودة والابتكار والالتزام تجاه عملائنا. نشوف المغرب الرقمي اللي كل شركة فيه تقدر تقتحم السوق الرقمية بثقة.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#e0e7ef] h-full">
                <div className="w-11 h-11 rounded-lg bg-[#00B0F0] flex items-center justify-center mb-4"><Heart className="w-5 h-5 text-white" /></div>
                <h3 className="text-lg font-bold text-[#002A5C] mb-3">رسالتنا</h3>
                <p className="text-[#5a6a7e] leading-relaxed text-[15px]">نساعد الشركات المغربية الصغيرة والمتوسطة تتحول رقمياً من خلال حلول ذكية وسهلة الاستخدام. نؤمن بأن التكنولوجيا هي المفتاح للنمو والنجاح في العصر الحديث.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-[#00B0F0] text-sm font-bold mb-2">قيمنا</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002A5C] mb-4">اللي كيحركنا كل يوم</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-gradient-to-br from-[#002A5C]/[0.03] to-[#00B0F0]/[0.05] rounded-2xl p-6 border border-[#00B0F0]/10 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#00B0F0]/10 flex items-center justify-center mb-4">{v.icon}</div>
                  <h3 className="text-lg font-bold text-[#002A5C] mb-2">{v.title}</h3>
                  <p className="text-[#5a6a7e] leading-relaxed text-[15px]">{v.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-24 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-[#00B0F0] text-sm font-bold mb-2">فريقنا</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002A5C] mb-4">الناس اللي وراء Codex</h2>
            <p className="text-[#5a6a7e] max-w-xl mx-auto text-[17px] leading-relaxed">فريق شاب ومتحمس، كاملين من مطورين ومصممين ومديرين مشاريع. كل واحد فيهم خبير في مجاله.</p>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((m, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-[#e0e7ef] text-center">
                  <div className={`w-16 h-16 ${m.bg} rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-4`}>{m.initials}</div>
                  <h3 className="font-bold text-[#002A5C] text-[15px] mb-1">{m.name}</h3>
                  <p className="text-[#5a6a7e] text-[13px]">{m.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="cta-gradient py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/[0.04] rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00B0F0]/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <AnimatedCounter target={s.number} suffix={s.suffix} />
                  <p className="text-white/75 mt-2 text-[15px]">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
