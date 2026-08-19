import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { JOURNEY } from '../data/config';

function TimelineItem({ item, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const isNow = item.year === 'Now';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-start`}
    >
      {/* Content card */}
      <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block bg-bg-card border border-border-subtle rounded-2xl p-6 glow-border max-w-sm ${
          index % 2 === 0 ? 'ml-auto' : 'mr-auto'
        }`}>
          {/* Year */}
          <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
            <span className={`font-mono font-bold text-lg ${isNow ? 'gradient-text' : 'text-emerald-500'}`}>
              {item.year}
            </span>
            {isNow && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            )}
          </div>

          <h3 className="font-display font-bold text-base text-text-primary mb-2">{item.label}</h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">{item.description}</p>

          {/* Tags */}
          <div className={`flex flex-wrap gap-1.5 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
            {item.tags.map(t => (
              <span key={t} className="tag text-[0.6rem]">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Center node */}
      <div className="relative flex-shrink-0 flex flex-col items-center" style={{ width: 24 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.2, type: 'spring', stiffness: 300 }}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 ${
            isNow
              ? 'border-emerald-500 bg-emerald-500/20 shadow-emerald-sm'
              : 'border-emerald-500/50 bg-bg-card'
          }`}
        >
          {isNow && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
        </motion.div>

        {/* Vertical line */}
        {!isLast && (
          <motion.div
            className="absolute top-5 w-px bg-gradient-to-b from-emerald-500/30 to-transparent"
            style={{ height: 'calc(100% + 2rem)' }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.08 + 0.3, duration: 0.6 }}
          />
        )}
      </div>

      {/* Spacer for alternating layout */}
      <div className="flex-1" />
    </motion.div>
  );
}

export default function Journey() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="journey" className="section-padding bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-technical-grid bg-grid opacity-30 pointer-events-none" aria-hidden />

      <div className="container-narrow" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="section-label mb-4">04 / Journey</p>
          <h2 className="font-display font-black text-display text-text-primary mb-4">
            Building
            <span className="gradient-text"> My Path.</span>
          </h2>
          <p className="text-text-muted text-sm max-w-md mx-auto">
            A realistic timeline of how my engineering journey has been unfolding — one project, one challenge, one lesson at a time.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          {JOURNEY.map((item, i) => (
            <TimelineItem
              key={item.year}
              item={item}
              index={i}
              isLast={i === JOURNEY.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
