import { FadeInOnScroll } from '@/components/common';
import { Button } from '@/components/ui';
import { BRAND_INFO } from '@/data/content';

export function BrandIntroSection() {
  const handleScrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="brand-intro"
      className="py-20 lg:py-28 relative max-w-[1280px] mx-auto px-6 lg:px-12 scroll-mt-24 border-t border-white/[0.08] pt-16 lg:pt-20"
    >
      {/* Amplified left-aligned ambient glow disk */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 15% 50%, rgba(37, 99, 235, 0.28) 0%, rgba(56, 189, 248, 0.10) 40%, transparent 75%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Massive Headline */}
        <div className="lg:col-span-7">
          <FadeInOnScroll direction="up">
            <h2 className="font-display font-normal uppercase text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl tracking-tight-heading leading-[1.0]">
              {BRAND_INFO.introHeadline || 'WE OFFER PAINTING SERVICES FOR CARS OF ALL BRANDS'}
            </h2>
          </FadeInOnScroll>
        </div>

        {/* Right Column: Credibility copy and CTA */}
        <div className="lg:col-span-5 lg:pt-2">
          <FadeInOnScroll direction="up" delay={0.15}>
            <div className="space-y-6 text-textSecondary text-sm sm:text-base leading-relaxed font-body">
              {BRAND_INFO.introParagraphs && BRAND_INFO.introParagraphs.length > 0 ? (
                BRAND_INFO.introParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>
                    Operating at the intersection of aerospace material science and factory-standard paint booth precision, MAX COLOR sets the benchmark for hypercar, sports car, and luxury vehicle painting and refinishing.
                  </p>
                  <p>
                    Our master painters utilize computerized spectrophotometer color matching and hospital-grade clean room preparation to achieve exact OEM pigmentation, seamless clear-coat leveling, and zero optical distortion on every vehicle.
                  </p>
                </>
              )}
            </div>

            <div className="mt-8">
              <Button
                variant="ghost"
                onClick={handleScrollToAbout}
              >
                {BRAND_INFO.introButtonLabel || 'About company'}
              </Button>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}
