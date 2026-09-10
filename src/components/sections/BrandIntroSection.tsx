import { FadeInOnScroll } from '@/components/common';
import { Button } from '@/components/ui';

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
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-textPrimary leading-tight mt-2">
                Uncompromising Standards of Automotive Artistry
              </h2>
            </FadeInOnScroll>
          </div>

          {/* Right Column: Credibility copy and CTA */}
          <div className="lg:col-span-7 lg:pt-4">
            <FadeInOnScroll direction="up" delay={0.15}>
              <div className="space-y-6 text-textSecondary text-base lg:text-lg leading-relaxed font-body">
                <p>
                  Operating at the intersection of aerospace material science and artisanal coachbuilding,
                  Aura Auto Atelier sets the benchmark for hypercar and luxury vehicle preservation.
                  Every commission begins inside our dust-isolated clean rooms, where environmental variables
                  are strictly regulated to guarantee molecular-level bonding and zero optical imperfections.
                </p>
                <p>
                  Our certified master artisans leverage digital ultrasonic depth gauges, self-healing elastomeric
                  polymers, and multi-stage jewel correction to safeguard your vehicle's factory finish.
                  We never compromise clear coat integrity or cut templates on painted surfaces—ensuring seamlessly
                  rolled edges and an aesthetic caliber worthy of the world's most discerning collectors.
                </p>
              </div>

              <div className="mt-8">
                <Button
                  variant="ghost"
                  onClick={handleScrollToAbout}
                  className="px-8"
                >
                  About Atelier
                </Button>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
