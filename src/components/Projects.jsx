import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/config';

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const PROJECT_VISUALS = {
  space: (
    <svg viewBox="0 0 400 200" className="w-full h-full object-cover" aria-hidden>
      <defs>
        <radialGradient id="earthGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.9" />
        </radialGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        <filter id="blurGlow"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>
      {/* Background glow */}
      <circle cx="200" cy="100" r="100" fill="url(#glow)" />
      
      {/* Orbit Lines */}
      <ellipse cx="200" cy="100" rx="150" ry="45" fill="none" stroke="#10b981" strokeWidth="0.5" strokeDasharray="4 4" transform="rotate(-15 200 100)" opacity="0.6"/>
      <ellipse cx="200" cy="100" rx="180" ry="60" fill="none" stroke="#10b981" strokeWidth="0.3" transform="rotate(20 200 100)" opacity="0.4"/>
      
      {/* Earth */}
      <circle cx="200" cy="100" r="45" fill="url(#earthGrad)" stroke="#34d399" strokeWidth="1" />
      {/* Continents (stylized shapes) */}
      <path d="M170 80 Q190 70 200 90 T180 120 Q160 100 170 80" fill="#10b981" opacity="0.5" />
      <path d="M210 110 Q230 120 240 100 T220 70 Q200 90 210 110" fill="#10b981" opacity="0.4" />
      <path d="M185 135 Q200 145 215 130 Q200 115 185 135" fill="#10b981" opacity="0.6" />

      {/* Satellite */}
      <g transform="translate(100, 40) rotate(30)">
        <rect x="-18" y="-8" width="14" height="16" fill="#047857" stroke="#34d399" strokeWidth="0.5" />
        <rect x="4" y="-8" width="14" height="16" fill="#047857" stroke="#34d399" strokeWidth="0.5" />
        <rect x="-4" y="-4" width="8" height="8" fill="#a7f3d0" />
        <line x1="0" y1="4" x2="0" y2="15" stroke="#34d399" strokeWidth="1" />
        <circle cx="0" cy="15" r="2" fill="#34d399" filter="url(#blurGlow)" />
      </g>
      
      {/* Stars/Data Points */}
      <circle cx="60" cy="150" r="2" fill="#fff" filter="url(#blurGlow)" />
      <circle cx="340" cy="70" r="2.5" fill="#34d399" filter="url(#blurGlow)" />
      <circle cx="280" cy="170" r="1.5" fill="#10b981" />
      <circle cx="120" cy="30" r="1.5" fill="#10b981" />
      <circle cx="150" cy="160" r="1" fill="#fff" opacity="0.6" />
      <circle cx="260" cy="40" r="1.5" fill="#fff" opacity="0.5" />
    </svg>
  ),
  fintech: (
    <svg viewBox="0 0 400 200" className="w-full h-full object-cover" aria-hidden>
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#6ee7b7" />
        </linearGradient>
        <filter id="glowChart"><feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#10b981" floodOpacity="0.6"/></filter>
      </defs>
      
      {/* Background Bars */}
      <g transform="translate(40, 10)">
        {[20, 35, 25, 50, 40, 65, 55, 80, 70, 105, 130].map((h, i) => (
          <rect key={i} x={i * 28} y={150 - h} width="16" height={h} fill="url(#barGrad)" rx="2" />
        ))}
      </g>
      
      {/* Line Chart */}
      <path 
        d="M 48 150 L 76 130 L 104 140 L 132 110 L 160 120 L 188 90 L 216 100 L 244 70 L 272 80 L 300 45 L 328 20" 
        fill="none" 
        stroke="url(#lineGrad)" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        filter="url(#glowChart)"
      />
      
      {/* Dots */}
      {[
        [48, 150], [76, 130], [104, 140], [132, 110], [160, 120], 
        [188, 90], [216, 100], [244, 70], [272, 80], [300, 45], [328, 20]
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill="#022c22" stroke="#34d399" strokeWidth="2.5" />
      ))}
      
      {/* Arrow at end */}
      <path d="M 315 25 L 328 20 L 323 33" fill="none" stroke="#6ee7b7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Tooltip */}
      <g transform="translate(195, 25)">
        <rect x="0" y="0" width="76" height="38" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="1" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))"/>
        <text x="38" y="17" fill="#6ee7b7" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">+23.8%</text>
        <text x="38" y="30" fill="#a7f3d0" fontSize="9" fontFamily="sans-serif" textAnchor="middle" opacity="0.8">Growth</text>
        <path d="M 38 38 L 43 43 L 48 38 Z" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
        <line x1="43" y1="38" x2="43" y2="43" stroke="#064e3b" strokeWidth="2" />
        <line x1="43" y1="43" x2="49" y2="65" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7"/>
      </g>
    </svg>
  ),
  geo: (
    <svg viewBox="0 0 400 200" className="w-full h-full object-cover" aria-hidden>
      <defs>
        <filter id="pinShadow"><feDropShadow dx="0" dy="12" stdDeviation="6" floodColor="#10b981" floodOpacity="0.8"/></filter>
        <filter id="bellGlow"><feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10b981" floodOpacity="0.5"/></filter>
      </defs>
      
      {/* Isometric plane */}
      <g transform="translate(200, 130) scale(1, 0.45) rotate(45)">
        {/* Grid lines */}
        {[...Array(9)].map((_, i) => (
          <line key={`h${i}`} x1="-120" y1={i*30 - 120} x2="120" y2={i*30 - 120} stroke="#10b981" strokeWidth="1.5" opacity="0.15" />
        ))}
        {[...Array(9)].map((_, i) => (
          <line key={`v${i}`} x1={i*30 - 120} y1="-120" x2={i*30 - 120} y2="120" stroke="#10b981" strokeWidth="1.5" opacity="0.15" />
        ))}
        
        {/* Geofencing rings */}
        <circle cx="0" cy="0" r="45" fill="rgba(16,185,129,0.25)" stroke="#34d399" strokeWidth="2" />
        <circle cx="0" cy="0" r="85" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="8 8" />
        <circle cx="0" cy="0" r="125" fill="none" stroke="#047857" strokeWidth="1.5" />
        
        <circle cx="0" cy="0" r="15" fill="#6ee7b7" filter="blur(6px)" />
      </g>
      
      {/* Map Pin */}
      <g transform="translate(200, 115) scale(1.6)" filter="url(#pinShadow)">
        <path d="M0 0 C-12 -16, -18 -26, -18 -36 A18 18 0 1 1 18 -36 C18 -26, 12 -16, 0 0 Z" fill="#34d399" stroke="#022c22" strokeWidth="1.5" />
        <circle cx="0" cy="-36" r="6" fill="#022c22" />
      </g>

      {/* Floating Notification */}
      <g transform="translate(320, 60)" filter="url(#bellGlow)">
        <rect x="0" y="0" width="46" height="46" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" opacity="0.95"/>
        <path d="M 23 14 C 19 14 16 17 16 21 L 16 27 L 13 30 L 33 30 L 30 27 L 30 21 C 30 17 27 14 23 14 Z" fill="#6ee7b7" />
        <path d="M 21 32 A 2 2 0 0 0 25 32 Z" fill="#6ee7b7" />
        <circle cx="31" cy="16" r="4" fill="#ef4444" stroke="#064e3b" strokeWidth="1" />
      </g>
    </svg>
  ),
  system: (
    <svg viewBox="0 0 400 200" className="w-full h-full object-cover" aria-hidden>
      {/* Isometric Group */}
      <g transform="translate(180, 110) scale(1.3, 0.65) rotate(45)">
        {/* Base Lot */}
        <rect x="-90" y="-90" width="180" height="180" fill="#022c22" stroke="#10b981" strokeWidth="2" rx="4" />
        
        {/* Parking Lines */}
        <line x1="-90" y1="0" x2="90" y2="0" stroke="#10b981" strokeWidth="2" strokeDasharray="10 10" />
        {[-60, -20, 20, 60].map((x) => (
          <line key={x} x1={x} y1="-90" x2={x} y2="90" stroke="#10b981" strokeWidth="1.5" opacity="0.7" />
        ))}
        
        {/* Cars (isometric rects) */}
        <g transform="translate(-40, -45)">
          <rect x="-12" y="-25" width="24" height="50" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="1" />
          <rect x="-8" y="-15" width="16" height="25" rx="2" fill="#022c22" />
        </g>
        <g transform="translate(40, -45)">
          <rect x="-12" y="-25" width="24" height="50" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="1" />
          <rect x="-8" y="-15" width="16" height="25" rx="2" fill="#022c22" />
        </g>
        <g transform="translate(0, 45)">
          <rect x="-12" y="-25" width="24" height="50" rx="4" fill="#047857" stroke="#10b981" strokeWidth="1" />
          <rect x="-8" y="-15" width="16" height="25" rx="2" fill="#022c22" />
        </g>
        
        {/* Barrier Gate */}
        <g transform="translate(90, 45)">
          <rect x="-6" y="-6" width="12" height="12" fill="#34d399" rx="2" />
          <line x1="0" y1="0" x2="-45" y2="0" stroke="#10b981" strokeWidth="4" strokeDasharray="6 6" />
        </g>
      </g>
      
      {/* P Sign */}
      <g transform="translate(70, 70)">
        <line x1="15" y1="25" x2="15" y2="80" stroke="#047857" strokeWidth="4" />
        <rect x="0" y="0" width="30" height="30" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="2" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))" />
        <text x="15" y="21" fill="#6ee7b7" fontSize="18" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">P</text>
      </g>

      {/* Status Panel */}
      <g transform="translate(270, 40)">
        <rect x="0" y="0" width="100" height="75" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="1" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.5))" opacity="0.95" />
        <text x="12" y="22" fill="#a7f3d0" fontSize="9" fontFamily="sans-serif">Total Slots</text>
        <text x="75" y="22" fill="#6ee7b7" fontSize="11" fontWeight="bold" fontFamily="monospace">24</text>
        
        <text x="12" y="42" fill="#a7f3d0" fontSize="9" fontFamily="sans-serif">Occupied</text>
        <text x="75" y="42" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">16</text>
        
        <text x="12" y="62" fill="#a7f3d0" fontSize="9" fontFamily="sans-serif">Available</text>
        <text x="75" y="62" fill="#6ee7b7" fontSize="11" fontWeight="bold" fontFamily="monospace">08</text>
      </g>
    </svg>
  ),
};

function ProjectCard({ project, onOpen, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-bg-card border border-border-subtle rounded-2xl overflow-hidden glow-border hover:shadow-card-hover transition-all duration-300 flex flex-col"
    >
      {/* Visual area */}
      <div className="relative h-44 bg-bg-secondary overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity duration-500">
          {PROJECT_VISUALS[project.theme]}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-card/60 pointer-events-none" />
        <div className="absolute top-3 left-4 font-mono text-xs font-bold text-emerald-500/60">
          {project.number}
        </div>
        <div className="absolute top-3 right-4">
          <span className="tag">{project.theme}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-bold text-lg text-text-primary mb-2 group-hover:text-emerald-400 transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
          {project.shortDesc}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 mt-auto">
          <button
            id={`project-explore-${project.id}`}
            onClick={() => onOpen(project)}
            className="btn btn-primary text-xs py-2.5 px-4 interactive"
          >
            Explore Project
          </button>
          {project.liveUrl && !project.liveUrl.includes('[INSERT') && (
            <a
              id={`project-live-${project.id}`}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary text-xs py-2.5 px-4 interactive !border-emerald-500/30 hover:!border-emerald-400"
            >
              <ExternalLink size={13} className="mr-1" />
              Live Demo
            </a>
          )}
          <a
            id={`project-github-${project.id}`}
            href={project.github.includes('[INSERT') ? '#' : project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary text-xs py-2.5 px-4 interactive"
            onClick={project.github.includes('[INSERT') ? e => e.preventDefault() : undefined}
          >
            <GithubIcon size={13} />
            Repository
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ onOpenProject }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section-padding bg-bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="container-narrow" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-4">03 / Selected Work</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display font-black text-display text-text-primary">
              Things I've
              <span className="gradient-text"> Built.</span>
            </h2>
            <p className="text-text-muted text-sm font-mono max-w-xs md:text-right">
              Click any project to explore the full case study and technical details.
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={onOpenProject}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
