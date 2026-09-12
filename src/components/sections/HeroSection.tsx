import { useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_ASSETS } from '@/assets/images';
import { BRAND_INFO } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export interface HeroSectionProps {
  onRequestConsultation?: (service?: string) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export function HeroSection({ onRequestConsultation }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const revealContainerRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top', // Finishes right as the hero scrolls out of view
          scrub: 0.1,        // Smooth natural hardware tracking
          invalidateOnRefresh: true,
        },
      });

      // Reveal top layer via clip-path
      tl.fromTo(
        revealContainerRef.current,
        { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'none' },
        0
      );

      // Translate laser seam line across
      tl.fromTo(
        laserRef.current,
        { left: '0%' },
        { left: '100%', ease: 'none' },
        0
      );

      // Fade in laser line at start, fade out at end
      tl.fromTo(laserRef.current, { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0);
      tl.to(laserRef.current, { opacity: 0, duration: 0.04 }, 0.96);

      // Fade out scroll prompt hint
      if (scrollHintRef.current) {
        tl.to(scrollHintRef.current, { opacity: 0, y: 8, duration: 0.08 }, 0);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    // Also refresh on window load if not already fired
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen bg-[#0B0E14] overflow-hidden select-none"
    >
      {/* INNER VIEWPORT */}
      <div className="relative min-h-screen w-full flex flex-col justify-between items-center overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-4 sm:pb-6 select-none">
      {/* REALISTIC SHOWROOM FLOOR & STUDIO LIGHTING ENVIRONMENT */}
      {/* 1. Subtle studio top ambient lighting (soft cool ceiling fill) */}
      <div
        className="absolute inset-x-0 top-0 h-[60%] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 15%, rgba(255, 255, 255, 0.035) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* 2. Seamless Ambient Floor Grounding (Zero horizontal split line, unified #0B0E14) */}
      <div
        className="absolute inset-x-0 bottom-0 h-[50%] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 55% at 50% 45%, rgba(37, 99, 235, 0.04) 0%, rgba(56, 189, 248, 0.015) 35%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* UNIFIED HERO CONTENT LOCKUP (Adequate clearance below 80px Navbar) */}
      <div className="relative z-10 w-full max-w-7xl flex-1 flex flex-col items-center justify-between gap-2 sm:gap-3 lg:gap-4 min-h-0">
        {/* COMPACT HEADER HIERARCHY */}
        <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6 shrink-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center max-w-4xl"
          >
            {/* Overline Badge */}
            <motion.div variants={itemVariants} className="mb-2 sm:mb-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs font-semibold text-textSecondary uppercase tracking-overline-tracking">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#38BDF8]" />
                {BRAND_INFO.heroOverline || 'PROFESSIONAL AUTO ATELIER'}
              </span>
            </motion.div>

            {/* H1: Exactly 2 lines, Michroma 400, clamp(2rem, 4vw, 3.75rem), leading 1.1 */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-normal uppercase text-white leading-[1.1] tracking-display text-center"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.75rem)' }}
            >
              TURN THE COLOR
              <br />
              TO THE MAXIMUM
            </motion.h1>

            {/* Subhead: concise, controlled max-w */}
            <motion.p
              variants={itemVariants}
              className="font-body text-[#94A3B8] text-xs sm:text-sm md:text-base max-w-md leading-relaxed mt-2 sm:mt-2.5 text-center"
            >
              {BRAND_INFO.heroSubhead ||
                'We offer a wide range of services from partial painting to complete restoration of the body.'}
            </motion.p>

            {/* Single CTA: Callback button */}
            <motion.div variants={itemVariants} className="mt-3 sm:mt-4">
              <button
                type="button"
                onClick={() => onRequestConsultation?.()}
                className="inline-flex items-center justify-center px-7 py-2 sm:py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold shadow-[0_0_22px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] active:scale-[0.98] transition-all cursor-pointer"
              >
                {BRAND_INFO.heroCta || 'Callback'}
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* CAR SHOWCASE & DUAL-WORLD GROUNDING CONTAINER */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 sm:px-8 min-h-0">
          <div
            className="relative w-full aspect-[1376/768] select-none"
            style={{
              maxWidth: 'min(1240px, calc(56vh * 1.7916))',
            }}
          >
            {/* BASE LAYER (z-10): Raw Primer GT-R + Industrial Atelier Workshop Floor Reflection */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-10"
              style={{ zIndex: 10 }}
            >
              {/* Industrial Technical Atelier Workshop Floor Reflection */}
              <img
                src={HERO_ASSETS.reflectionRaw}
                alt=""
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
                aria-hidden="true"
              />
              {/* High-Precision Ground Contact Shadow */}
              <img
                src={HERO_ASSETS.gtrShadow}
                alt=""
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
                aria-hidden="true"
              />
              {/* Raw Primer State GT-R */}
              <img
                src={HERO_ASSETS.rawCutout}
                alt="Nissan GT-R Matte Primer State"
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
              />
            </div>

            {/* TOP REVEAL LAYER (z-20): Finished Gloss Cobalt Blue GT-R + Vivid Neon Cyberpunk City Reflection */}
            <div
              ref={revealContainerRef}
              className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-20"
              style={{
                zIndex: 20,
                clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
              }}
            >
              {/* Vivid Neon Cyberpunk Night City Skyline Floor Reflection */}
              <img
                src={HERO_ASSETS.reflectionFinished}
                alt=""
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
                aria-hidden="true"
              />
              {/* High-Precision Ground Contact Shadow */}
              <img
                src={HERO_ASSETS.gtrShadow}
                alt=""
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
                aria-hidden="true"
              />
              {/* Finished Gloss Cobalt Blue GT-R */}
              <img
                src={HERO_ASSETS.finishedCutout}
                alt="Nissan GT-R Finished Gloss Cobalt Blue"
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Dynamic Vertical Neon Cyan Seam / Laser Line (Constrained to Car + Reflection) */}
            <div
              ref={laserRef}
              className="absolute w-[2px] bg-[#38BDF8] pointer-events-none -translate-x-1/2 z-30"
              style={{
                zIndex: 30,
                top: '25%',
                bottom: '1%',
                left: '0%',
                opacity: 0,
                boxShadow: '0 0 12px #38BDF8, 0 0 4px #38BDF8, 0 0 24px rgba(56, 189, 248, 0.6)',
              }}
              aria-hidden="true"
            >
              {/* Subtle Spray Mist / Ionization Atomization Glow */}
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 sm:w-16 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 24px 60% at 50% 50%, rgba(56, 189, 248, 0.45) 0%, rgba(37, 99, 235, 0.15) 50%, transparent 100%)',
                }}
              />

              {/* Centered Glowing Precision Cyan Diamond Node at Beltline Level */}
              <div className="absolute top-[51%] -translate-y-1/2 -translate-x-1/2 left-1/2 w-3 h-3 rotate-45 bg-[#38BDF8] border border-white shadow-[0_0_12px_#38BDF8]" />
            </div>
          </div>

          {/* Sleek Scroll Prompt Indicator */}
          <div
            ref={scrollHintRef}
            className="flex items-center gap-2 mt-1 sm:mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#64748B] pointer-events-none z-20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
            <span>Scroll to reveal finish</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
