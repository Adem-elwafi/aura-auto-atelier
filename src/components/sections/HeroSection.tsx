import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui';
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
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20 lg:pt-24">
      {/* Spotlight Underglow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(37,99,235,0.28) 0%, rgba(11,14,20,0) 70%)',
        }}
        aria-hidden="true"
      />

      {/* Grid ambient accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 w-full py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Block */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-7 flex flex-col items-start"
          >
            {/* Badge above H1 */}
            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={() => onRequestConsultation?.()}
                className="inline-flex items-center px-4 py-1.5 rounded-full glass-panel text-xs font-semibold tracking-wider uppercase text-textPrimary mb-6 hover:border-borderHighlight transition-colors cursor-pointer text-left"
              >
                <span className="w-2 h-2 rounded-full bg-cyan inline-block mr-2 animate-pulse" />
                Professional Auto Atelier
              </button>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-extrabold text-textPrimary leading-[1.08] tracking-tight uppercase"
            >
              {BRAND_INFO.heroHeadline}
            </motion.h1>

            {/* Descriptive Copy */}
            <motion.p
              variants={itemVariants}
              className="text-textSecondary text-lg max-w-xl mt-6 leading-relaxed font-body"
            >
              {BRAND_INFO.heroSubheadline}
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mt-8 pt-2"
            >
              <Button
                variant="primary"
                onClick={() => handleScroll('services')}
                className="shadow-lg shadow-cobalt/25 px-8"
              >
                Our Services
              </Button>

              <Button
                variant="ghost"
                onClick={() => handleScroll('about')}
                className="px-8"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Vehicle Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0"
          >
            <div className="relative w-full max-w-[620px] mx-auto">
              {/* Ground Shadow */}
              <motion.div
                animate={{
                  scale: [1, 0.94, 1],
                  opacity: [0.75, 0.55, 0.75],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-8 sm:-bottom-10 lg:-bottom-12 left-1/2 -translate-x-1/2 w-[90%] pointer-events-none select-none z-0"
              >
                <img
                  src={HERO_ASSETS.shadow}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-auto object-contain opacity-70"
                />
              </motion.div>

              {/* Floating Vehicle Cutout */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                }}
                className="relative z-10"
              >
                <img
                  src={HERO_ASSETS.cutout}
                  alt="Aura Auto Atelier Bespoke Vehicle Finish"
                  fetchPriority="high"
                  className="w-full h-auto object-contain select-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
