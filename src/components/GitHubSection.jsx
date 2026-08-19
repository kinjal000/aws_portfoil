import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { PERSONAL } from '../data/config';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const FEATURED_REPOS = [
  { name: 'space-mission-platform', desc: 'Space Mission Data Operations Platform', lang: 'JavaScript' },
  { name: 'wealthpath-cloud',        desc: 'WealthPath Investment Advisory Cloud',   lang: 'Python' },
  { name: 'geoalert-system',         desc: 'GeoAlert Location-Based Notifications',  lang: 'JavaScript' },
];

const LANG_COLORS = {
  JavaScript: '#f0db4f',
  Python:     '#3572A5',
  Java:       '#b07219',
  Dart:       '#00B4AB',
};

function RepoCard({ repo, baseUrl, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const isPlaceholder = baseUrl.includes('[INSERT');
  const repoUrl = isPlaceholder ? '#' : `${baseUrl}/${repo.name}`;

  return (
    <motion.a
      ref={ref}
      href={repoUrl}
      target={isPlaceholder ? undefined : '_blank'}
      rel="noopener noreferrer"
      onClick={isPlaceholder ? e => e.preventDefault() : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="block bg-bg-card border border-border-subtle rounded-xl p-4 glow-border hover:shadow-card-hover transition-all duration-200 interactive"
      id={`github-repo-${index}`}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="font-mono text-sm font-medium text-emerald-400 truncate">{repo.name}</span>
        <ExternalLink size={12} className="text-text-muted flex-shrink-0 mt-0.5 ml-2" />
      </div>
      <p className="text-text-secondary text-xs leading-relaxed mb-3">{repo.desc}</p>
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: LANG_COLORS[repo.lang] || '#888' }} />
        <span className="font-mono text-xs text-text-muted">{repo.lang}</span>
      </div>
    </motion.a>
  );
}

export default function GitHubSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isPlaceholder = PERSONAL.github.includes('[INSERT');

  return (
    <section id="github" className="section-padding bg-bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/3 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="container-narrow" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-black text-display text-text-primary mb-4">
            Code Lives Beyond
            <span className="gradient-text"> the Interface.</span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Explore the repositories behind my projects, experiments, and technical learning journey.
          </p>

          <a
            id="github-profile-btn"
            href={isPlaceholder ? '#' : PERSONAL.github}
            target={isPlaceholder ? undefined : '_blank'}
            rel="noopener noreferrer"
            onClick={isPlaceholder ? e => e.preventDefault() : undefined}
            className="btn btn-primary interactive mx-auto inline-flex"
          >
            <GithubIcon size={16} />
            Explore GitHub ↗
          </a>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-3">
          {FEATURED_REPOS.map((repo, i) => (
            <RepoCard key={repo.name} repo={repo} baseUrl={PERSONAL.github} index={i} />
          ))}
        </div>

        {isPlaceholder && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-6 text-xs text-text-muted font-mono text-center"
          >
            Add your GitHub URL to <code className="text-emerald-400">config.js → PERSONAL.github</code> to enable repository links.
          </motion.p>
        )}
      </div>
    </section>
  );
}
