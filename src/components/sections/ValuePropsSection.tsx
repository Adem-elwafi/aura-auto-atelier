import { FEATURE_STATS } from '@/data/content';
import { MetricCard } from '@/components/ui';
import { FadeInOnScroll } from '@/components/common';

export function ValuePropsSection() {
  return (
    <section id="about" className="scroll-mt-24 py-16 lg:py-24 max-w-[1280px] mx-auto px-6 lg:px-12">
      {/* Section Header */}
      <FadeInOnScroll direction="up" className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase font-semibold text-cyan tracking-overline-tracking block mb-3">
          ENGINEERING EXCELLENCE &amp; DEFENSE
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight-heading text-textPrimary text-center">
          DO WHAT OTHERS CAN&apos;T DO
        </h2>
        <p className="text-textSecondary text-base sm:text-lg mt-4 leading-relaxed font-body">
          Our specialized methodologies, clinical environment, and master certifications
          guarantee results that conventional detail shops cannot replicate.
        </p>
      </FadeInOnScroll>

      {/* 2x2 Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mt-10 lg:mt-12">
        {FEATURE_STATS.map((stat, index) => (
          <MetricCard
            key={stat.headline}
            stat={stat}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
