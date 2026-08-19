import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { PERSONAL } from '../data/config';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Journey', 'Highlights', 'Contact'];

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-bg-secondary border-t border-border-subtle py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-5">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group relative flex items-center justify-center outline-none hover:scale-[1.02] transition-transform duration-300 py-2"
              id="footer-brand"
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
            </button>
            <p className="font-mono text-xs text-text-muted mt-2 md:mt-0">
              Software Engineer & Developer
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                id={`footer-nav-${link.toLowerCase()}`}
                className="text-xs text-text-muted hover:text-emerald-400 transition-colors font-medium"
              >
                {link}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { id: 'footer-gh', href: PERSONAL.github,   icon: <GithubIcon size={16} />,   label: 'GitHub'   },
              { id: 'footer-li', href: PERSONAL.linkedin,  icon: <LinkedinIcon size={16} />, label: 'LinkedIn' },
              { id: 'footer-em', href: `mailto:${PERSONAL.email}`, icon: <Mail size={16} />, label: 'Email' },
            ].map(({ id, href, icon, label }) => (
              <a
                key={id}
                id={id}
                href={href.includes('[INSERT') ? '#' : href}
                target={!href.startsWith('mailto') && !href.includes('[INSERT') ? '_blank' : undefined}
                rel="noopener noreferrer"
                onClick={href.includes('[INSERT') ? e => e.preventDefault() : undefined}
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-bg-elevated border border-border-subtle flex items-center justify-center text-text-muted hover:text-emerald-400 hover:border-emerald-500/30 transition-all interactive"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-text-muted">
            © 2026 Kinjal Gawali. Built with React + Vite.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-text-muted">STATUS / ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
