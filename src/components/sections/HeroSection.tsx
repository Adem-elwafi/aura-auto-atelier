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
      className="min-h-screen relative flex flex-col justify-between pt-28 sm:pt-32 pb-6 sm:pb-12 overflow-hidden bg-canvas"
    >
      {/* Spotlight Atmospheric Underglow behind/under the car */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 50% at 50% 70%, rgba(37, 99, 235, 0.45) 0%, rgba(56, 189, 248, 0.18) 35%, rgba(11, 14, 20, 0) 75%)',
        }}
        aria-hidden="true"
      />

      {/* Grid ambient accents */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Upper Portion: Headline, Subhead & Single Callback CTA */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start max-w-4xl"
        >
          {/* Overline Badge */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-textSecondary uppercase tracking-overline-tracking">
              {BRAND_INFO.heroOverline || 'PROFESSIONAL AUTO ATELIER'}
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-extrabold leading-[0.9] tracking-tight-heading uppercase text-textPrimary"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            {BRAND_INFO.heroHeadline}
          </motion.h1>


          {/* Subheadline Copy */}
          <motion.p
            variants={itemVariants}
            className="text-textSecondary/80 text-sm sm:text-base max-w-xl font-normal leading-relaxed mt-4 sm:mt-6"
          >
            {BRAND_INFO.heroSubheadline}
          </motion.p>

          {/* Single CTA: Callback */}
          <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
            <button
              type="button"
              onClick={() => onRequestConsultation?.()}
              className="bg-cobalt hover:bg-cobaltHover text-textPrimary px-6 py-2.5 text-sm font-semibold rounded-full shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-[0.98] transition-all"
            >
              {BRAND_INFO.heroCta || 'Callback'}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Lower Portion: Car Spanning Entire Lower Half, Centered-Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.85,
          delay: 0.2,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mt-8 sm:mt-12 flex flex-col items-center justify-end"
      >
        <div className="relative w-full flex items-center justify-center">
          {/* Ground shadow anchored underneath chassis */}
          <div
            className="absolute -bottom-4 sm:-bottom-8 md:-bottom-12 lg:-bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[95%] pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            <img
              src={HERO_ASSETS.shadow}
              alt=""
              className="w-full h-auto object-contain opacity-80"
            />
          </div>

          {/* Vehicle Cutout */}
          <img
            src={HERO_ASSETS.cutout}
            alt="MAX COLOR Bespoke Vehicle Finish"
            fetchPriority="high"
            className="relative z-10 w-full h-auto object-contain select-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
