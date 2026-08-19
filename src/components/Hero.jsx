import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { PERSONAL } from '../data/config';

// Canvas particle animation
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let particles = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['rgba(16,185,129,0.6)', 'rgba(52,211,153,0.4)', 'rgba(16,185,129,0.3)'];

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x     = Math.random() * canvas.width;
        this.y     = Math.random() * canvas.height;
        this.r     = Math.random() * 1.5 + 0.3;
        this.vx    = (Math.random() - 0.5) * 0.15;
        this.vy    = (Math.random() - 0.5) * 0.15;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16,185,129,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      raf = requestAnimationFrame(animate);
    };
    animate();

    // Respect reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) cancelAnimationFrame(raf);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}

// Floating metadata tag
function MetaTag({ children, className = '' }) {
  return (
    <div className={`absolute font-mono text-[0.6rem] font-medium text-emerald-400 border border-emerald-500/20 bg-bg-primary/80 backdrop-blur-sm px-2.5 py-1 rounded-md tracking-wider ${className}`}>
      {children}
    </div>
  );
}

export default function Hero() {
  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-bg-primary"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-technical-grid bg-grid opacity-100" aria-hidden />
      <div className="absolute inset-0 hero-gradient" aria-hidden />
      <ParticleCanvas />

      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 0%, transparent 40%, rgba(9,14,12,0.8) 100%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-6rem)]">

          {/* ── LEFT: Text content ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center"
          >
            {/* Status label */}
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-2.5 font-mono text-xs font-medium tracking-widest text-text-muted uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                {PERSONAL.status}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-black text-hero text-text-primary leading-[1.02] tracking-tight mb-4"
            >
              {PERSONAL.name.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? 'gradient-text block' : 'block'}>
                  {word}
                </span>
              ))}
            </motion.h1>

            {/* Tagline */}
            <motion.div variants={fadeUp} className="mb-6">
              <p className="font-display font-medium text-xl sm:text-2xl text-text-secondary tracking-wide">
                {PERSONAL.tagline}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-text-secondary leading-relaxed max-w-xl mb-10 text-base sm:text-lg"
            >
              I build practical digital solutions and explore modern technologies across web development, cloud, DevOps, AI, and software systems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
              <button
                id="hero-view-work"
                onClick={scrollToWork}
                className="btn btn-primary text-sm font-semibold"
              >
                View My Work
                <ArrowDown size={16} />
              </button>
              <a
                id="hero-resume"
                href={PERSONAL.resumeUrl !== '[INSERT_RESUME_URL]' ? PERSONAL.resumeUrl : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary text-sm font-semibold"
                onClick={PERSONAL.resumeUrl === '[INSERT_RESUME_URL]' ? e => e.preventDefault() : undefined}
              >
                Download Resume
                <Download size={16} />
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp} className="flex items-center gap-5">
              {[
                { label: 'GitHub',   href: PERSONAL.github,   id: 'gh' },
                { label: 'LinkedIn', href: PERSONAL.linkedin,  id: 'li' },
                { label: 'Email',    href: `mailto:${PERSONAL.email}`, id: 'em' },
              ].map(({ label, href, id }) => (
                <a
                  key={id}
                  id={`hero-${id}`}
                  href={href.includes('[INSERT') ? '#' : href}
                  target={!href.startsWith('mailto') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-text-muted hover:text-emerald-400 transition-colors border-b border-transparent hover:border-emerald-500/40 pb-0.5"
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Photo composition ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-72 sm:w-80 lg:w-96">

              {/* Decorative background rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
                <div className="w-full h-full rounded-[2.5rem] border border-emerald-500/6 rotate-3" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
                <div className="w-full h-full rounded-[2.5rem] border border-emerald-500/4 -rotate-3" />
              </div>

              {/* Main photo frame */}
              <div className="relative rounded-[2rem] overflow-hidden bg-bg-card border border-emerald-500/20 shadow-emerald-md"
                   style={{ aspectRatio: '4/5' }}>

                {/* Emerald rim light */}
                <div className="absolute inset-0 rounded-[2rem] pointer-events-none z-10"
                     style={{
                       background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, transparent 40%, rgba(16,185,129,0.05) 100%)',
                       boxShadow: 'inset 0 0 40px rgba(16,185,129,0.08)',
                     }}
                     aria-hidden />

                {/* Photo */}
                <div className="absolute inset-0 bg-bg-card">
                  <img src="/profile.png" alt="Kinjal Gawali" className="w-full h-full object-cover" />
                </div>

                {/* Corner decorations */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-emerald-500/40 rounded-tl-md pointer-events-none" aria-hidden />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-emerald-500/40 rounded-tr-md pointer-events-none" aria-hidden />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-emerald-500/40 rounded-bl-md pointer-events-none" aria-hidden />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-emerald-500/40 rounded-br-md pointer-events-none" aria-hidden />
              </div>

              {/* Floating metadata labels */}
              <MetaTag className="-top-4 -left-4 sm:-left-10">
                Third-Year CSE
              </MetaTag>

              <MetaTag className="-top-4 -right-4 sm:-right-10">
                Based in India
              </MetaTag>

              <MetaTag className="bottom-16 -right-4 sm:-right-14">
                Open to Opportunities
              </MetaTag>

              <MetaTag className="-bottom-4 left-4">
                Building with curiosity
              </MetaTag>

              {/* Status indicator */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-6 top-1/2 -translate-y-1/2 bg-bg-card border border-border-subtle rounded-xl px-3 py-2 shadow-card"
                aria-hidden
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[0.65rem] text-text-secondary whitespace-nowrap">SYSTEM / ONLINE</span>
                </div>
              </motion.div>

              {/* Version tag */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-4 bottom-1/3 bg-bg-card border border-border-subtle rounded-xl px-3 py-2 shadow-card"
                aria-hidden
              >
                <span className="font-mono text-[0.65rem] text-emerald-400">VERSION / 2026</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center gap-2 mt-8 lg:mt-0"
        >
          <span className="font-mono text-[0.65rem] text-text-muted tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-emerald-500/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
