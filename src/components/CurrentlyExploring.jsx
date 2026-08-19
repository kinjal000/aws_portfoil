import { useState } from 'react';
import { motion } from 'framer-motion';
import { EXPLORING } from '../data/config';

// ── Icons per topic ────────────────────────────────────────────
const TOPIC_ICONS = {
  webdev:  '⬡',
  ml:      '◈',
  flutter: '◇',
  devops:  '⊡',
  cloud:   '◯',
};

// ── Node definitions with grid positions ───────────────────────
// Grid: 3 cols × 2 rows; webdev spans col 2 rows 1-2 (center tall card)
const NODES = [
  { id: 'ml',      col: 1, row: 1 },
  { id: 'webdev',  col: 2, row: 1 },   // primary — spans 2 rows visually via extra height
  { id: 'cloud',   col: 3, row: 1 },
  { id: 'devops',  col: 1, row: 2 },
  { id: 'flutter', col: 3, row: 2 },
];

// ── Animated pulse dot using CSS animation ─────────────────────
const pulseKeyframes = `
@keyframes pulse-along-h {
  0%   { left: 0%;   opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}
@keyframes pulse-along-h-rev {
  0%   { right: 0%;  opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: 1; }
  100% { right: 100%; opacity: 0; }
}
@keyframes pulse-along-v {
  0%   { top: 0%;   opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
`;

// ── Circuit SVG overlay behind the grid ───────────────────────
// We draw this as a single SVG inside a relative container
function CircuitLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 3 2"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horizontal traces — top row (row 1) */}
      <line x1="0.5" y1="0.5" x2="1.5" y2="0.5" stroke="#10b981" strokeWidth="0.008" strokeOpacity="0.35" />
      <line x1="1.5" y1="0.5" x2="2.5" y2="0.5" stroke="#10b981" strokeWidth="0.008" strokeOpacity="0.35" />
      {/* Horizontal traces — bottom row (row 2) */}
      <line x1="0.5" y1="1.5" x2="1.5" y2="1.5" stroke="#10b981" strokeWidth="0.008" strokeOpacity="0.35" />
      <line x1="1.5" y1="1.5" x2="2.5" y2="1.5" stroke="#10b981" strokeWidth="0.008" strokeOpacity="0.35" />
      {/* Vertical traces — left col */}
      <line x1="0.5" y1="0.5" x2="0.5" y2="1.5" stroke="#10b981" strokeWidth="0.008" strokeOpacity="0.35" />
      {/* Vertical traces — right col */}
      <line x1="2.5" y1="0.5" x2="2.5" y2="1.5" stroke="#10b981" strokeWidth="0.008" strokeOpacity="0.35" />
      {/* Vertical traces — center col */}
      <line x1="1.5" y1="0.5" x2="1.5" y2="1.5" stroke="#10b981" strokeWidth="0.008" strokeOpacity="0.2" strokeDasharray="0.03 0.03" />

      {/* Junction dots */}
      {[
        [0.5,0.5],[1.5,0.5],[2.5,0.5],
        [0.5,1.5],[1.5,1.5],[2.5,1.5],
      ].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="0.025" fill="#10b981" fillOpacity="0.6" />
      ))}
    </svg>
  );
}

// ── Node Card ─────────────────────────────────────────────────
function NodeCard({ id, inView, delay, isPrimary }) {
  const [hovered, setHovered] = useState(false);
  const item = EXPLORING.find(e => e.id === id);
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, ease: 'backOut', delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col items-center justify-center text-center rounded-2xl border cursor-default select-none transition-all duration-500 overflow-hidden
        ${isPrimary ? 'row-span-2 py-10 px-6' : 'py-8 px-5'}
        ${hovered
          ? 'border-emerald-400/60 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
          : 'border-emerald-500/15 bg-bg-card/40'
        }`}
      style={{ backdropFilter: 'blur(10px)' }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={hovered ? { boxShadow: 'inset 0 0 30px rgba(16,185,129,0.07)' } : { boxShadow: 'none' }}
        transition={{ duration: 0.4 }}
      />

      {/* Corner circuit nubs */}
      <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-emerald-500/30 rounded-tl-sm" />
      <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-emerald-500/30 rounded-tr-sm" />
      <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-emerald-500/30 rounded-bl-sm" />
      <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-emerald-500/30 rounded-br-sm" />

      {/* Pulse dot traveling across top edge */}
      <span
        className="absolute top-0 left-0 h-[1.5px] w-full overflow-hidden pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <motion.span
          className="absolute top-0 w-8 h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #34d399, transparent)' }}
          animate={hovered ? { left: ['-2rem', '110%'] } : {}}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        />
      </span>

      {/* Icon */}
      <motion.div
        animate={hovered ? { scale: 1.15 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`flex items-center justify-center rounded-xl border bg-bg-card/60 backdrop-blur-sm mb-4 transition-all duration-300
          ${isPrimary ? 'w-16 h-16 text-3xl' : 'w-12 h-12 text-xl'}
          ${hovered ? 'border-emerald-400/50 shadow-[0_0_16px_rgba(16,185,129,0.3)]' : 'border-emerald-500/20'}`}
      >
        <span className={hovered ? 'text-emerald-400' : 'text-emerald-500/70'}>
          {TOPIC_ICONS[id] || item.icon}
        </span>
      </motion.div>

      {/* Primary badge */}
      {isPrimary && (
        <span className="mb-2 px-3 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          Primary Focus
        </span>
      )}

      {/* Title */}
      <h4 className={`font-display font-bold transition-colors duration-300 mb-2 ${isPrimary ? 'text-xl' : 'text-base'} ${hovered ? 'text-emerald-400' : 'text-text-primary'}`}>
        {item.label}
      </h4>

      {/* Description — always visible but more opaque on hover */}
      <motion.p
        animate={{ opacity: hovered ? 1 : 0.45 }}
        transition={{ duration: 0.3 }}
        className={`text-text-secondary leading-relaxed ${isPrimary ? 'text-sm max-w-[180px]' : 'text-xs'}`}
      >
        {item.description}
      </motion.p>

      {/* Status dot */}
      <div className="absolute bottom-3 right-5 flex items-center gap-1.5">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-emerald-500"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-[8px] font-mono text-emerald-600 uppercase tracking-wider">active</span>
      </div>
    </motion.div>
  );
}

// ── Animated pulse particles along edges ───────────────────────
function HorizontalPulse({ top, delay, reverse }) {
  return (
    <div
      className="absolute w-full overflow-hidden pointer-events-none"
      style={{ top, height: 2 }}
    >
      <motion.span
        className="absolute top-0 w-12 h-full rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.8), transparent)',
          filter: 'blur(1px)',
        }}
        animate={{ left: reverse ? ['110%', '-3rem'] : ['-3rem', '110%'] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay }}
      />
    </div>
  );
}

function VerticalPulse({ left, delay }) {
  return (
    <div
      className="absolute h-full overflow-hidden pointer-events-none"
      style={{ left, width: 2, top: 0 }}
    >
      <motion.span
        className="absolute left-0 h-12 w-full rounded-full"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(52,211,153,0.8), transparent)',
          filter: 'blur(1px)',
        }}
        animate={{ top: ['-3rem', '110%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay }}
      />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function CurrentlyExploring({ inView }) {
  // Map EXPLORING order to grid: webdev goes to position 2 (center)
  const orderedIds = ['ml', 'webdev', 'cloud', 'devops', 'flutter'];

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <h3 className="font-display font-bold text-heading text-text-primary mb-3">
          Currently Exploring
        </h3>
        <p className="text-text-muted text-sm font-mono mb-8">
          Fields and technologies I'm actively diving into right now.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative rounded-2xl border border-emerald-500/10 bg-bg-card/20 p-5 overflow-hidden"
        style={{ backdropFilter: 'blur(6px)' }}
      >
        {/* Faint dot grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Animated circuit pulses along grid edges */}
        {inView && (
          <>
            {/* Horizontal pulses at 1/3 and 2/3 height */}
            <HorizontalPulse top="33.3%" delay={0}   reverse={false} />
            <HorizontalPulse top="33.3%" delay={1.8} reverse={true}  />
            <HorizontalPulse top="66.6%" delay={0.9} reverse={false} />
            <HorizontalPulse top="66.6%" delay={2.7} reverse={true}  />
            {/* Vertical pulses at 1/3 and 2/3 width */}
            <VerticalPulse left="33.3%" delay={0.4}  />
            <VerticalPulse left="33.3%" delay={2.2}  />
            <VerticalPulse left="66.6%" delay={1.3}  />
            <VerticalPulse left="66.6%" delay={3.1}  />
          </>
        )}

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {/* Vertical dividers */}
          <div className="absolute top-0 bottom-0 border-l border-emerald-500/10" style={{ left: '33.3%' }} />
          <div className="absolute top-0 bottom-0 border-l border-emerald-500/10" style={{ left: '66.6%' }} />
          {/* Horizontal dividers */}
          <div className="absolute left-0 right-0 border-t border-emerald-500/10" style={{ top: '50%' }} />
        </div>

        {/* Node grid — 3 col, 2 row */}
        <div className="relative grid grid-cols-3 grid-rows-2 gap-4 z-10 min-h-[380px]">
          {/* ML — col 1, row 1 */}
          <NodeCard id="ml"      inView={inView} delay={0.3} />
          {/* WebDev — col 2, rows 1+2 (row-span-2) */}
          <div className="row-span-2">
            <NodeCard id="webdev" inView={inView} delay={0.1} isPrimary />
          </div>
          {/* Cloud — col 3, row 1 */}
          <NodeCard id="cloud"   inView={inView} delay={0.4} />
          {/* DevOps — col 1, row 2 */}
          <NodeCard id="devops"  inView={inView} delay={0.5} />
          {/* Flutter — col 3, row 2 */}
          <NodeCard id="flutter" inView={inView} delay={0.6} />
        </div>

        {/* Bottom legend */}
        <div className="flex items-center justify-center gap-6 mt-5 pt-4 border-t border-emerald-500/10">
          <div className="flex items-center gap-2">
            <span className="w-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, #10b981, transparent)' }} />
            <span className="text-[9px] font-mono text-text-muted tracking-widest uppercase">Circuit Trace</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px #34d399' }} />
            <span className="text-[9px] font-mono text-text-muted tracking-widest uppercase">Data Pulse</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full border border-emerald-500/50" />
            <span className="text-[9px] font-mono text-text-muted tracking-widest uppercase">Active</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
