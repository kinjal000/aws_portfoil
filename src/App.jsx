import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// Components
import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import About      from './components/About';
import Skills     from './components/Skills';
import Projects   from './components/Projects';
import Journey    from './components/Journey';
import Highlights from './components/Highlights';
import Credentials from './components/Credentials';
import GitHubSection from './components/GitHubSection';
import Contact    from './components/Contact';
import Footer     from './components/Footer';
import ProjectModal from './components/ProjectModal';

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [cursorPos, setCursorPos]   = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  const cursorDotRef  = useRef(null);
  const cursorRingRef = useRef(null);
  const ringPos       = useRef({ x: -100, y: -100 });

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Custom cursor
  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    if (!isFine) return;

    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;

    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const animateRing = () => {
      if (!cursorRingRef.current) return;
      ringPos.current.x = lerp(ringPos.current.x, cursorPos.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, cursorPos.y, 0.12);
      cursorRingRef.current.style.left = `${ringPos.current.x}px`;
      cursorRingRef.current.style.top  = `${ringPos.current.y}px`;
      raf = requestAnimationFrame(animateRing);
    };

    const handleHoverIn  = () => setIsHovering(true);
    const handleHoverOut = () => setIsHovering(false);

    const interactables = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, .interactive'
    );
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    window.addEventListener('mousemove', moveCursor);
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(raf);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverIn);
        el.removeEventListener('mouseleave', handleHoverOut);
      });
    };
  }, [cursorPos.x, cursorPos.y]);

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        id="scroll-progress"
        style={{ scaleX, transformOrigin: '0%' }}
      />

      {/* Custom cursor */}
      <div
        id="cursor-dot"
        ref={cursorDotRef}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />
      <div
        id="cursor-ring"
        ref={cursorRingRef}
        className={isHovering ? 'hovering' : ''}
      />

      {/* Project modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects onOpenProject={setActiveProject} />
        <Journey />
        <Highlights />
        <Credentials />
        <GitHubSection />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
