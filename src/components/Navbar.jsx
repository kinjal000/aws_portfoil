import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#hero',        label: 'Home' },
  { href: '#about',       label: 'About' },
  { href: '#skills',      label: 'Skills' },
  { href: '#projects',    label: 'Projects' },
  { href: '#journey',     label: 'Journey' },
  { href: '#highlights',  label: 'Highlights' },
  { href: '#contact',     label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]       = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1));
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-bg-primary/90 border-b border-border-subtle backdrop-blur-xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="group relative flex items-center justify-center outline-none hover:scale-[1.02] transition-transform duration-300 py-2"
          >
            <span 
              className="relative text-text-primary text-[1.8rem] sm:text-[2.2rem] font-black uppercase tracking-[-0.04em] leading-none z-10" 
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              KINJAL
            </span>
            <span 
              className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 text-emerald-400 text-[1.5rem] sm:text-[2rem] z-30 whitespace-nowrap opacity-100 transition-colors"
              style={{ 
                fontFamily: "'Great Vibes', cursive", 
                textShadow: "0px 2px 10px rgba(0,0,0,0.9), 0px 1px 3px rgba(0,0,0,0.9)" 
              }}
            >
              Gawali
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  active === link.href.slice(1)
                    ? 'text-emerald-400'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-btn"
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 z-40 bg-bg-secondary/98 backdrop-blur-xl border-b border-border-subtle md:hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active === link.href.slice(1)
                      ? 'text-emerald-400 bg-emerald-500/5'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
