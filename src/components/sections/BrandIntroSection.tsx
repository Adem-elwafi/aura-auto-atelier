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
    <section id="brand-intro" className="scroll-mt-24 border-t border-white/[0.08]">
      <div className="py-20 lg:py-28 relative max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Number counter and H2 headline */}
          <div className="lg:col-span-5">
            <FadeInOnScroll direction="up">
              <span className="font-display font-extrabold text-7xl lg:text-9xl text-white/[0.07] select-none block leading-none">
                01
              </span>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-textPrimary leading-tight mt-2 uppercase tracking-tight-heading">
                {BRAND_INFO.introHeadline || 'WE OFFER PAINTING SERVICES FOR CARS OF ALL BRANDS'}
              </h2>
            </FadeInOnScroll>
          </div>

          {/* Right Column: Credibility copy and CTA */}
          <div className="lg:col-span-7 lg:pt-4">
            <FadeInOnScroll direction="up" delay={0.15}>
              <div className="space-y-6 text-textSecondary text-base lg:text-lg leading-relaxed font-body">
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
                  className="px-8"
                >
                  {BRAND_INFO.introButtonLabel || 'About company'}
                </Button>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
