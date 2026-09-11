import { motion, type Variants } from 'framer-motion';
import { HERO_ASSETS } from '@/assets/images';
import { BRAND_INFO } from '@/data/content';

export interface HeroSectionProps {
  onRequestConsultation?: (service?: string) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export function HeroSection({ onRequestConsultation }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="min-h-screen relative flex flex-col overflow-hidden bg-canvas"
    >
      {/* Radial Underglow positioned behind/under the car */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 75%, rgba(37,99,235,0.35) 0%, rgba(56,189,248,0.12) 40%, rgba(11,14,20,0) 75%)',
        }}
        aria-hidden="true"
      />

      {/* Centered Text Container */}
      <div className="flex-1 flex flex-col items-center justify-center text-center pt-28 sm:pt-32 px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-5xl"
        >
          {/* Overline badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-textSecondary uppercase tracking-[0.08em]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              {BRAND_INFO.heroOverline || 'PROFESSIONAL AUTO ATELIER'}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-extrabold uppercase text-textPrimary leading-[0.92] tracking-[-0.03em] max-w-5xl"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
          >
            TURN THE COLOR
            <br />
            TO THE MAXIMUM
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={itemVariants}
            className="text-textSecondary text-sm sm:text-base max-w-lg leading-relaxed mt-5 sm:mt-6"
          >
            {BRAND_INFO.heroSubhead || BRAND_INFO.heroSubheadline}
          </motion.p>

          {/* Single CTA Button */}
          <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
            <button
              type="button"
              onClick={() => onRequestConsultation?.()}
              className="bg-cobalt hover:bg-cobaltHover text-white px-7 py-2.5 text-sm font-semibold rounded-full shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-[0.98] transition-all"
            >
              {BRAND_INFO.heroCtaPrimary || BRAND_INFO.heroCta || 'Callback'}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Car wrapper: Full-width, bottom-anchored */}
      <div className="relative w-full mt-auto z-10">
        <motion.img
          src={HERO_ASSETS.cutout}
          alt="MAX COLOR Performance Vehicle"
          className="w-full h-auto object-contain object-bottom max-h-[50vh] sm:max-h-[55vh] lg:max-h-[60vh] mx-auto select-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* CSS-only ground shadow under car */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[30%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(37,99,235,0.25) 0%, transparent 70%)',
          }}
        />
      </div>
    </section>
  );
}
