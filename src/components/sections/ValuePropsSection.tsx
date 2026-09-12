import { FEATURE_STATS } from '@/data/content';
import { MetricCard } from '@/components/ui';
import { FadeInOnScroll } from '@/components/common';

export function ValuePropsSection() {
  return (
    <section id="about" className="scroll-mt-24 py-16 lg:py-24 max-w-[1280px] mx-auto px-6 lg:px-12 relative">
      {/* Amplified central backlight beneath the 2x2 metric grid */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37, 99, 235, 0.30) 0%, rgba(56, 189, 248, 0.12) 40%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Section Header */}
      <FadeInOnScroll direction="up" className="text-center max-w-3xl mx-auto relative z-10 mb-10 lg:mb-12">
        <h2 className="font-display font-normal uppercase text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight-heading text-center">
          DO WHAT OTHERS CAN&apos;T DO
        </h2>
      </FadeInOnScroll>

      {/* 2x2 Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 relative z-10">
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
