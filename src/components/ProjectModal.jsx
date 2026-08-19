import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, AlertCircle, ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export default function ProjectModal({ project, onClose }) {
  // Close on Escape
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
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-primary/90 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <motion.div
        id={`modal-${project.id}`}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto bg-bg-card border border-border-default rounded-t-3xl sm:rounded-3xl shadow-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${project.id}`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-bg-card border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-emerald-500">{project.number}</span>
            <div className="w-px h-4 bg-border-default" />
            <span className="tag">{project.theme}</span>
          </div>
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-all interactive"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Title and Overview */}
          <div>
            <h2
              id={`modal-title-${project.id}`}
              className="font-display font-black text-2xl text-text-primary mb-4"
            >
              {project.title}
            </h2>
            <div className="text-text-secondary leading-relaxed whitespace-pre-line">
              {project.overview || project.shortDesc}
            </div>
          </div>

          {/* What I Built */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="font-display font-semibold text-sm text-emerald-400 uppercase tracking-widest mb-3">
                What I Built
              </h3>
              <ul className="space-y-2">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture */}
          {project.architecture && (
            <div>
              <h3 className="font-display font-semibold text-sm text-emerald-400 uppercase tracking-widest mb-3">
                Architecture
              </h3>
              <p className="text-text-secondary leading-relaxed text-sm whitespace-pre-line">{project.architecture}</p>
            </div>
          )}

          {/* System Flow */}
          {project.systemFlow && (
            <div>
              <h3 className="font-display font-semibold text-sm text-emerald-400 uppercase tracking-widest mb-3">
                System Flow
              </h3>
              <p className="text-text-secondary leading-relaxed text-sm whitespace-pre-line">{project.systemFlow}</p>
            </div>
          )}

          {/* Database Design */}
          {project.databaseDesign && (
            <div>
              <h3 className="font-display font-semibold text-sm text-emerald-400 uppercase tracking-widest mb-3">
                Database Design
              </h3>
              <p className="text-text-secondary leading-relaxed text-sm whitespace-pre-line">{project.databaseDesign}</p>
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack && (
            <div>
              <h3 className="font-display font-semibold text-sm text-emerald-400 uppercase tracking-widest mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Key Highlight */}
          {project.highlight && (
            <div>
              <h3 className="font-display font-semibold text-sm text-emerald-400 uppercase tracking-widest mb-3">
                Key Highlight
              </h3>
              <p className="text-text-secondary leading-relaxed text-sm whitespace-pre-line">{project.highlight}</p>
            </div>
          )}

          {/* Repository & Links */}
          <div className="pt-2 border-t border-border-subtle">
            <h3 className="font-display font-semibold text-sm text-emerald-400 uppercase tracking-widest mb-4">
              Project Links
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && !project.liveUrl.includes('[INSERT') && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary text-sm interactive border-emerald-500/30 hover:border-emerald-400"
                  id={`modal-live-${project.id}`}
                >
                  <ExternalLink size={15} className="mr-1.5" />
                  Live Demo ↗
                </a>
              )}
              
              {project.github.includes('[INSERT') ? (
                <div className="flex items-center gap-2 text-xs text-text-muted font-mono p-3 rounded-lg border border-border-subtle bg-bg-elevated w-full">
                  <AlertCircle size={13} className="text-emerald-500/60 flex-shrink-0" />
                  GitHub link not yet added. Update <code className="text-emerald-400 mx-1">config.js</code> with the repository URL.
                </div>
              ) : (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-sm interactive"
                  id={`modal-github-${project.id}`}
                >
                  <GithubIcon size={15} />
                  View Repository ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
