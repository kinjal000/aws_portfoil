import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PERSONAL, EXPLORING } from '../data/config';
import CurrentlyExploring from './CurrentlyExploring';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section-padding bg-bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="container-narrow" ref={ref}>
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {/* Section label */}
          <motion.p variants={fadeUp} className="section-label mb-4">
            01 / About
          </motion.p>

          {/* Heading */}
          <motion.h2 variants={fadeUp} className="font-display font-black text-display text-text-primary mb-12">
            More Than
            <span className="gradient-text"> Just Code.</span>
          </motion.h2>

          {/* Two-column bio */}
          <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-8 mb-16">
            {PERSONAL.bio.map((para, i) => (
              <p key={i} className="text-text-secondary leading-relaxed text-base">
                {para}
              </p>
            ))}
          </motion.div>

          {/* Quick facts row */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20 p-6 rounded-2xl border border-border-subtle bg-bg-card/50"
          >
            {[
              { value: '3rd',         label: 'Year of CS'           },
              { value: '10+',         label: 'Projects Built'        },
              { value: '20+',         label: 'Technologies Explored' },
              { value: '∞',           label: 'Curiosity'             },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center text-center py-2">
                <span className="font-display font-black text-3xl text-emerald-400 mb-1">{value}</span>
                <span className="font-mono text-xs text-text-muted tracking-wide">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Currently Exploring */}
        <CurrentlyExploring inView={inView} />
      </div>
    </section>
  );
}
