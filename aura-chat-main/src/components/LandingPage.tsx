import { motion } from 'framer-motion';
import { Bot, Zap, Shield, Globe, ArrowRight, Sparkles } from 'lucide-react';
import ChatInterface from './ChatInterface';

const easing = [0.2, 0.8, 0.2, 1] as const;

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-background/60 border-b border-foreground/[0.04]">
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
        <Bot size={18} className="text-primary" />
      </div>
      <span className="text-sm font-semibold tracking-tight text-foreground">Nexus AI</span>
    </div>
    <div className="hidden md:flex items-center gap-8">
      <a href="#features" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Features</a>
      <a href="#demo" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Demo</a>
      <a href="#pricing" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
    </div>
    <button className="px-4 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_15px_hsl(var(--glow-primary)/0.3)]">
      Get Started
    </button>
  </nav>
);

const HeroSection = () => (
  <section className="pt-32 pb-16 px-6 text-center max-w-3xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easing }}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
        <Sparkles size={12} className="text-primary" />
        <span className="text-[11px] uppercase tracking-widest text-primary font-semibold">Now in Public Beta</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-4">
        Your Intelligent
        <br />
        <span className="text-primary">Command Interface</span>
      </h1>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto mb-8">
        Nexus AI is a next-generation assistant built for power users. Fast, private, and designed to integrate seamlessly into your workflow.
      </p>
      <a
        href="#demo"
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all shadow-[0_0_20px_hsl(var(--glow-primary)/0.4)]"
      >
        Try it live <ArrowRight size={16} />
      </a>
    </motion.div>
  </section>
);

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Sub-second response times powered by optimized inference.' },
  { icon: Shield, title: 'End-to-End Encrypted', desc: 'Your conversations never leave your secure session.' },
  { icon: Globe, title: 'Works Everywhere', desc: 'Accessible from any device with a modern browser.' },
];

const FeaturesSection = () => (
  <section id="features" className="py-16 px-6 max-w-4xl mx-auto">
    <div className="grid md:grid-cols-3 gap-4">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1, ease: easing }}
          className="p-6 rounded-2xl bg-surface border border-foreground/[0.05] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
            <f.icon size={18} className="text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">{f.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const DemoSection = () => (
  <section id="demo" className="py-8 px-4">
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mb-6"
    >
      Live Demo
    </motion.p>
    <ChatInterface />
  </section>
);

const FooterSection = () => (
  <footer id="pricing" className="py-16 px-6 text-center border-t border-foreground/[0.04] mt-8">
    <h2 className="text-2xl font-bold text-foreground mb-2">Ready to get started?</h2>
    <p className="text-sm text-muted-foreground mb-6">Free during beta. No credit card required.</p>
    <button className="px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all shadow-[0_0_20px_hsl(var(--glow-primary)/0.4)]">
      Launch Nexus AI
    </button>
    <p className="text-[10px] text-muted-foreground mt-8 uppercase tracking-widest">© 2026 Nexus AI — All rights reserved</p>
  </footer>
);

const StatsSection = () => {
  const stats = [
    { value: "Sub-second", label: "Response time", desc: "Optimized inference for real-time command flows." },
    { value: "E2E Secure", label: "Privacy by design", desc: "Your context stays protected in transit." },
    { value: "Anywhere", label: "Device friendly", desc: "Works smoothly across modern browsers." },
  ] as const;

  return (
    <section className="py-10 px-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: easing }}
            className="p-6 rounded-2xl bg-surface border border-foreground/[0.05] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
          >
            <div className="text-primary font-semibold text-lg mb-1">{s.value}</div>
            <div className="text-sm font-semibold text-foreground mb-1">{s.label}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-foreground">
      {/* Premium background accents (kept subtle to avoid looking "template-y") */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(250,89,255,0.35),transparent_60%)] blur-3xl opacity-80" />
        <div className="absolute top-[22%] -left-28 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.28),transparent_58%)] blur-3xl opacity-70" />
        <div className="absolute bottom-[-220px] right-[-140px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.18),transparent_60%)] blur-3xl opacity-70" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:52px_52px]" />
      </div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <DemoSection />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
