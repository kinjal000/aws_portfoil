import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
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

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  const links = [
    {
      id: 'contact-email',
      icon: <Mail size={18} />,
      label: 'Email',
      value: PERSONAL.email,
      href: `mailto:${PERSONAL.email}`,
      isPlaceholder: PERSONAL.email.includes('[INSERT'),
    },
    {
      id: 'contact-linkedin',
      icon: <LinkedinIcon size={18} />,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: PERSONAL.linkedin,
      isPlaceholder: PERSONAL.linkedin.includes('[INSERT'),
    },
    {
      id: 'contact-github',
      icon: <GithubIcon size={18} />,
      label: 'GitHub',
      value: 'View Code',
      href: PERSONAL.github,
      isPlaceholder: PERSONAL.github.includes('[INSERT'),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if the user has provided a real key
    if (!PERSONAL.contactFormKey || PERSONAL.contactFormKey.includes('[INSERT')) {
      alert("Please add your Web3Forms access key in src/data/config.js to enable the contact form.");
      return;
    }

    setFormStatus('submitting');
    
    const formData = new FormData(e.target);
    formData.append("access_key", PERSONAL.contactFormKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
        e.target.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="section-padding bg-bg-primary relative overflow-hidden">
      {/* BG Effects */}
      <div className="absolute inset-0 bg-technical-grid bg-grid opacity-30 pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="container-narrow max-w-5xl" ref={ref}>
        {/* Header (Centered) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="section-label mb-6">06 / Contact</p>
          <h2 className="font-display font-black text-display text-text-primary mb-6">
            Let's Build Something
            <span className="gradient-text"> Meaningful.</span>
          </h2>
          <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
            Have an idea, opportunity, or project in mind? I'm always interested in meaningful conversations, new challenges, and opportunities to learn and build.
          </p>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start relative z-10">
          
          {/* Left Column: Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {links.map(({ id, icon, label, value, href, isPlaceholder }) => (
              <a
                key={id}
                id={id}
                href={isPlaceholder ? '#' : href}
                target={!href.startsWith('mailto') && !isPlaceholder ? '_blank' : undefined}
                rel="noopener noreferrer"
                onClick={isPlaceholder ? e => e.preventDefault() : undefined}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-bg-card border border-border-subtle glow-border hover:shadow-card-hover transition-all duration-200 interactive"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all">
                  {icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-text-muted mb-1">{label}</span>
                  <span className="text-sm font-medium text-text-secondary group-hover:text-emerald-400 transition-colors">
                    {isPlaceholder ? `[Insert ${label}]` : value}
                  </span>
                </div>
              </a>
            ))}

            <div className="flex items-center gap-2 mt-4 text-text-muted px-2">
              <MapPin size={14} />
              <span className="font-mono text-xs">{PERSONAL.location}</span>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 bg-bg-card border border-border-subtle rounded-2xl p-6 sm:p-8 glow-border shadow-lg"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-text-muted uppercase tracking-wider">Name</label>
                  <input 
                    id="name"
                    name="name" 
                    type="text" 
                    required 
                    placeholder="John Doe"
                    className="w-full bg-bg-primary/50 border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-text-muted uppercase tracking-wider">Email</label>
                  <input 
                    id="email"
                    name="email" 
                    type="email" 
                    required 
                    placeholder="john@example.com"
                    className="w-full bg-bg-primary/50 border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-mono text-text-muted uppercase tracking-wider">Subject</label>
                <input 
                  id="subject"
                  name="subject" 
                  type="text" 
                  required 
                  placeholder="Opportunity / Collaboration"
                  className="w-full bg-bg-primary/50 border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-mono text-text-muted uppercase tracking-wider">Message</label>
                <textarea 
                  id="message"
                  name="message" 
                  required 
                  rows={4} 
                  placeholder="Hello Kinjal..."
                  className="w-full bg-bg-primary/50 border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={formStatus === 'submitting'} 
                className="btn btn-primary mt-2 py-3.5 w-full flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed interactive"
              >
                {formStatus === 'submitting' ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : formStatus === 'success' ? (
                  <CheckCircle2 size={18} />
                ) : formStatus === 'error' ? (
                  <AlertCircle size={18} />
                ) : (
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                )}
                
                <span className="font-medium">
                  {formStatus === 'submitting' ? 'Sending Message...' 
                    : formStatus === 'success' ? 'Message Sent Successfully!' 
                    : formStatus === 'error' ? 'Failed to Send. Try Again.' 
                    : 'Send Message'}
                </span>
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
