import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HIGHLIGHTS } from '../data/config';

const TYPE_COLORS = {
  Hackathon: { bg: 'bg-purple-500/8', border: 'border-purple-500/20', text: 'text-purple-400' },
  Workshop:  { bg: 'bg-blue-500/8',   border: 'border-blue-500/20',   text: 'text-blue-400'   },
  Learning:  { bg: 'bg-emerald-500/8',border: 'border-emerald-500/20',text: 'text-emerald-400' },
  Conference:{ bg: 'bg-amber-500/8',  border: 'border-amber-500/20',  text: 'text-amber-400'  },
  Event:     { bg: 'bg-sky-500/8',    border: 'border-sky-500/20',    text: 'text-sky-400'    },
};

function HighlightCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const colors = TYPE_COLORS[item.type] || TYPE_COLORS.Event;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`relative group bg-bg-card border border-border-subtle rounded-2xl p-5 hover:shadow-card-hover transition-all duration-300 glow-border flex flex-col gap-3`}
    >
      {/* Type badge */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 text-[0.65rem] font-mono font-medium px-2.5 py-1 rounded-md border ${colors.bg} ${colors.border} ${colors.text}`}>
          {item.type}
        </span>
        <span className="font-mono text-xs text-text-muted">{item.year}</span>
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-base text-text-primary leading-snug">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary text-xs leading-relaxed flex-1">
        {item.description}
      </p>

      {/* Tag */}
      <div className="pt-1">
        <span className="tag">{item.tag}</span>
      </div>
    </motion.div>
  );
}

export default function Highlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="highlights" className="section-padding bg-bg-secondary relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/3 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="container-narrow" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="section-label mb-4">05 / Highlights</p>
          <h2 className="font-display font-black text-display text-text-primary">
            Beyond the
            <span className="gradient-text"> Build.</span>
          </h2>
          <p className="mt-4 text-text-muted text-sm max-w-xl">
            Hackathons, workshops, conferences, and experiences that have shaped my learning journey outside of code.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HIGHLIGHTS.map((item, i) => (
            <HighlightCard key={`${item.year}-${item.title}`} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
