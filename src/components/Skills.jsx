import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Hardcoded to strictly match the user's requested skills without mixing
const SKILLS_DATA = [
  {
    category: '01 / LANGUAGES',
    items: ['C++', 'Python', 'Java', 'JavaScript', 'Dart', 'SQL', 'Shell Scripting', 'Bash'],
  },
  {
    category: '02 / WEB & BACKEND',
    items: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'Flask', 'FastAPI', 'Django', 'React', 'Tailwind CSS', 'REST APIs', 'GraphQL', 'Socket.IO', 'Firebase', 'Supabase', 'WebSockets'],
  },
  {
    category: '03 / DATABASES & TOOLS',
    items: ['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite', 'Firebase Realtime Database', 'Cloud Firestore', 'Apache', 'Canva', 'Figma', 'Git', 'GitHub', 'VS Code', 'Google Colab', 'Postman', 'Linux', 'Kubernetes', 'Docker', 'Ubuntu', 'Nginx', 'npm', 'Cisco Packet Tracer', 'Google Cloud Platform'],
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const MarqueeRow = ({ category, items, reverse = false, speed = 40 }) => {
  // Duplicate enough times to ensure seamless infinite loop
  const duplicated = [...items, ...items, ...items, ...items, ...items];
  
  return (
    <div className="mb-12 last:mb-0 group/row">
      <div className="flex items-center gap-4 mb-6 px-4 sm:px-6 lg:px-8 max-w-[1104px] mx-auto">
        <span className="font-mono text-[0.75rem] font-bold tracking-widest text-emerald-500/90 uppercase">{category}</span>
        <div className="h-[1px] bg-border-subtle flex-1" />
      </div>
      
      {/* 
        Strict container for EXACTLY 7 cards visible when aligned. 
        7 cards * 144px width = 1008px.
        6 gaps * 16px (gap-4) = 96px.
        Total precise width = 1104px.
        No mask/fade on the edges, strictly hidden overflow to avoid 'partial extra cards' outside the 7-card frame.
      */}
      <div className="w-full flex justify-center overflow-hidden">
        <div 
          className="overflow-hidden group-hover/row:[&>div]:[animation-play-state:paused]" 
          style={{ width: '1104px', maxWidth: '100vw' }}
        >
          <div 
            className={`flex gap-4 px-0 w-max ${reverse ? 'animate-scroll-right' : 'animate-scroll-left'}`}
            style={{ animationDuration: `${speed}s` }}
          >
            {duplicated.map((skill, index) => (
              <div
                key={`${skill}-${index}`}
                className="group flex items-center justify-center w-[144px] h-[52px] px-3 rounded-xl bg-bg-card border border-border-subtle flex-shrink-0 cursor-default transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:scale-105 hover:-translate-y-1 relative z-10"
              >
                <span className="font-display font-semibold text-[0.85rem] text-text-secondary group-hover:text-emerald-400 transition-colors duration-300 text-center truncate w-full">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-24 bg-bg-primary relative overflow-hidden">
      {/* BG glow */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div ref={ref}>
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <div className="container-narrow px-4 sm:px-6 lg:px-8 mb-12">
            {/* Label */}
            <motion.p variants={fadeUp} className="section-label mb-4">
              02 / Tech Stack
            </motion.p>

            {/* Heading + subtext */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <motion.h2 variants={fadeUp} className="font-display font-black text-display text-text-primary">
                Tools I Build
                <span className="gradient-text"> With.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-text-muted text-sm font-mono max-w-xs md:text-right">
                Technologies I've worked with across projects, courses, and personal exploration.
              </motion.p>
            </div>
          </div>

          {/* Infinite Marquee Rows per Category */}
          <motion.div variants={fadeUp} className="flex flex-col">
            {SKILLS_DATA.map((skillGroup, index) => {
              // To make all rows move at the exact same visual pixel speed,
              // the duration must be proportional to the number of items.
              // We use 5 sets (items * 5). The CSS moves by 50% (items * 2.5).
              // Let's use 3.5 seconds per item for a smooth, readable speed.
              const calculatedSpeed = skillGroup.items.length * 2.5 * 1.5;
              
              return (
                <MarqueeRow 
                  key={skillGroup.category} 
                  category={skillGroup.category} 
                  items={skillGroup.items} 
                  reverse={index % 2 !== 0} 
                  speed={calculatedSpeed} 
                />
              );
            })}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
