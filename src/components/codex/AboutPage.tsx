'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, Shield, MapPin, Target, Heart, Rocket } from 'lucide-react';

function FadeInSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className="text-4xl lg:text-5xl font-bold text-codex-accent"
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {target}
          {suffix}
        </motion.span>
      ) : (
        '0'
      )}
    </motion.span>
  );
}

export default function AboutPage() {
  const team = [
    {
      name: 'يوسف العلوي',
      role: 'المدير التقني',
      initials: 'ي ع',
      color: 'bg-codex-dark',
    },
    {
      name: 'سارة بنعمر',
      role: 'مديرة التصميم',
      initials: 'س ب',
      color: 'bg-codex-accent',
    },
    {
      name: 'كريم الراضي',
      role: 'مطور رئيسي',
      initials: 'ك ر',
      color: 'bg-codex-dark',
    },
    {
      name: 'فاطمة الزهراء',
      role: 'مديرة المشاريع',
      initials: 'ف ز',
      color: 'bg-codex-accent',
    },
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8 text-codex-accent" />,
      title: 'الابتكار',
      description:
        'دائماً نبحث عن حلول جديدة ومبتكرة. نستعمل أحدث التقنيات عشان نقدم أحسن النتائج لعملائنا.',
    },
    {
      icon: <Shield className="w-8 h-8 text-codex-accent" />,
      title: 'الثقة',
      description:
        'بنينا علاقات قوية مع عملائنا على أساس الثقة والشفافية. سمعة كتقول على هادشي.',
    },
    {
      icon: <MapPin className="w-8 h-8 text-codex-accent" />,
      title: 'التركيز المحلي',
      description:
        'نفهمو السوق المغربي بزاف. حلولنا مصممة خصيصاً لتلبية احتياجات الشركات المغربية.',
    },
  ];

  const stats = [
    { number: 50, suffix: '+', label: 'شركة راضية' },
    { number: 200, suffix: '+', label: 'مشروع منجز' },
    { number: 98, suffix: '%', label: 'نسبة الرضا' },
    { number: 5, suffix: '+', label: 'سنوات خبرة' },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Header Section */}
      <section className="hero-gradient py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-codex-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10">
              من نحن
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              قصتنا، <span className="text-codex-accent">رؤيتنا</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              نحنا فريق شاب وطموح من المغرب، شغوفين بالتكنولوجيا ومصممين نساعدو الشركات
              المغربية تنتقل للعالم الرقمي
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <span className="inline-block text-codex-accent text-sm font-semibold mb-3">
                قصتنا
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-codex-dark mb-6">
                من فكرة صغيرة لوكالة رائدة
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  بدأت Codex عام 2019 بفكرة بسيطة: الشركات المغربية الصغيرة والمتوسطة
                  تحتاج حلول رقمية متكاملة وسهلة الاستخدام، بس بسعار معقولة.
                </p>
                <p>
                  مؤسسنا، وهو مطور مغربي شاب، لاحظ أن بزاف المراكز والشركات كانت تعاني من
                  تدبير شؤونها بشكل رقمي. فقرر يبدأ مشروع كي يساعدهم.
                </p>
                <p>
                  اليوم، بعد أكثر من 5 سنوات، Codex تخدم أكثر من 50 شركة عبر المغرب،
                  ووصلت لمشاريع في شمال إفريقيا والشرق الأوسط. الفريق كبر، الباقات
                  تضافت، بس الرسالة باقات واضحة: نخلّي التكنولوجيا سهلة للجميع.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="relative">
                <div className="bg-gradient-to-br from-codex-dark to-codex-accent rounded-3xl p-8 lg:p-12 text-white">
                  <Rocket className="w-12 h-12 text-codex-accent mb-6" />
                  <h3 className="text-2xl font-bold mb-4">مهمتنا واضحة</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    &ldquo;نريد نخلّي كل شركة مغربية، صغيرة كانت ولا كبيرة، تقدر تستفيد
                    من التكنولوجيا عشان تنمو وتتطور. التكنولوجيا مش حكر على الكبار
                   .&rdquo;
                  </p>
                  <div className="text-sm text-white/60">
                    — فريق Codex
                  </div>
                </div>
                {/* Decorative */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-codex-accent/10 rounded-2xl -z-10" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-codex-dark/10 rounded-2xl -z-10" />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 lg:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 lg:mb-16">
            <span className="inline-block text-codex-accent text-sm font-semibold mb-3">
              رؤيتنا ورسالتنا
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-codex-dark mb-4">
              وين كنمشيو وشنو كنخدمو
            </h2>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <FadeInSection delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-border/50 h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-codex-dark flex items-center justify-center mb-5">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-codex-dark mb-3">رؤيتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  نكون الوكالة الرقمية الأولى في شمال إفريقيا، معروفة بالجودة والابتكار
                  والالتزام تجاه عملائنا. نشوف المغرب الرقمي اللي كل شركة فيه تقدر تقتحم
                  السوق الرقمية بثقة.
                </p>
              </motion.div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-border/50 h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-codex-accent flex items-center justify-center mb-5">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-codex-dark mb-3">رسالتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  نساعد الشركات المغربية الصغيرة والمتوسطة تتحول رقمياً من خلال حلول ذكية
                  وسهلة الاستخدام. نؤمن بأن التكنولوجيا هي المفتاح للنمو والنجاح في
                  العصر الحديث.
                </p>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 lg:mb-16">
            <span className="inline-block text-codex-accent text-sm font-semibold mb-3">
              قيمنا
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-codex-dark mb-4">
              اللي كيحركنا كل يوم
            </h2>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-gradient-to-br from-codex-dark/5 to-codex-accent/5 rounded-2xl p-6 lg:p-8 border border-codex-accent/10 h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-codex-accent/10 flex items-center justify-center mb-5">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-codex-dark mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-12 lg:mb-16">
            <span className="inline-block text-codex-accent text-sm font-semibold mb-3">
              فريقنا
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-codex-dark mb-4">
              الناس اللي وراء Codex
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              فريق شاب ومتحمس، كاملين من مطورين ومصممين ومديرين مشاريع. كل واحد فيهم خبير
              في مجاله.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {team.map((member, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 text-center"
                >
                  <div
                    className={`w-20 h-20 ${member.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-bold text-codex-dark text-sm lg:text-base mb-1">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-xs lg:text-sm">{member.role}</p>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 cta-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-codex-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <CountUp target={stat.number} suffix={stat.suffix} />
                  <p className="text-white/80 mt-2 text-sm lg:text-base">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
