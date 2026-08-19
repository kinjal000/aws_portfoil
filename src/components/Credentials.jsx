import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Award, X } from 'lucide-react';
import { CREDENTIALS } from '../data/config';

function CredentialCard({ cred, index, onOpenImage }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const hasExternalLink = cred.credentialUrl && !cred.credentialUrl.includes('[INSERT');
  const hasImage = !!cred.image;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-bg-card border border-border-subtle rounded-2xl p-6 glow-border hover:shadow-card-hover transition-all duration-300 flex gap-5"
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl">
        {cred.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-semibold text-sm text-text-primary mb-1 leading-snug">
          {cred.title}
        </h3>
        <p className="font-mono text-xs text-emerald-500/80 mb-1">{cred.issuer}</p>
        <p className="text-text-muted text-xs mb-3">{cred.description}</p>

        <div className="flex items-center gap-3">
          <span className="tag">{cred.date}</span>
          
          {hasImage ? (
            <button
              onClick={() => onOpenImage(cred.image)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors interactive"
              id={`cred-image-btn-${cred.id}`}
            >
              View Certificate
              <ExternalLink size={11} />
            </button>
          ) : hasExternalLink ? (
            <a
              href={cred.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors interactive"
              id={`cred-link-${cred.id}`}
            >
              View Credential
              <ExternalLink size={11} />
            </a>
          ) : (
            <span className="text-xs text-text-muted font-mono italic">credential link coming</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Certificate Image Modal
function CertModal({ src, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-bg-primary/90 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl max-h-full flex flex-col items-center justify-center pointer-events-none"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-text-muted hover:text-white transition-colors pointer-events-auto"
          aria-label="Close certificate"
        >
          <X size={24} />
        </button>
        <img 
          src={src} 
          alt="Full Certificate" 
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-emerald-lg pointer-events-auto"
        />
      </motion.div>
    </motion.div>
  );
}

export default function Credentials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="credentials" className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-primary relative">
      <div className="container-narrow" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Award size={16} className="text-emerald-500" />
            <p className="section-label">Learning & Credentials</p>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary">
            Verified Experiences
          </h2>
          <p className="mt-2 text-text-muted text-sm">
            Certificates and learning achievements earned through hands-on programs and workshops.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {CREDENTIALS.map((cred, i) => (
            <CredentialCard 
              key={cred.id} 
              cred={cred} 
              index={i} 
              onOpenImage={setSelectedCert} 
            />
          ))}
        </div>

        {/* Add more note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-6 text-xs text-text-muted font-mono text-center"
        >
          More credentials will be added as they are completed. ↗
        </motion.p>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <CertModal src={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
