import { FOOTER_ASSETS } from '@/assets/images';
import { Button } from '@/components/ui';
import { FadeInOnScroll } from '@/components/common';
import { BRAND_INFO } from '@/data/content';

export interface CtaBannerSectionProps {
  onRequestConsultation: () => void;
}

export function CtaBannerSection({ onRequestConsultation }: CtaBannerSectionProps) {
  return (
    <section
      id="contact"
      className="scroll-mt-24 relative overflow-hidden bg-canvas border-t border-white/[0.08]"
    >
      {/* Car lineup image framing: full width, front grilles close and dramatic */}
      <div className="w-full h-[320px] sm:h-[400px] lg:h-[460px] overflow-hidden relative">
        <img
          src={FOOTER_ASSETS.showcase}
          alt="MAX COLOR Atelier Showcase"
          className="w-full h-full object-cover object-top filter contrast-105 brightness-95"
        />
        {/* Linear-to-radial dark fade at the top seam so headlights emerge naturally without hard image borders */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, #0B0E14 0%, rgba(11, 14, 20, 0.6) 15%, transparent 35%), radial-gradient(ellipse at 50% 0%, rgba(37, 99, 235, 0.15) 0%, transparent 70%), linear-gradient(to top, #0B0E14 0%, rgba(11, 14, 20, 0.75) 45%, transparent 100%)',
          }}
        />
      </div>

      {/* Asymmetric 2-column split layout below image */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12 lg:py-16 relative">
        {/* Amplified ambient glow in CTA content area */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ background: 'radial-gradient(ellipse 65% 55% at 25% 60%, rgba(37, 99, 235, 0.28) 0%, rgba(56, 189, 248, 0.10) 40%, transparent 75%)' }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
          {/* Left side (~60-70% width: lg:col-span-7) */}
          <FadeInOnScroll direction="up" className="lg:col-span-7 space-y-4 text-left">
            <h2 className="font-display font-normal uppercase text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight-heading leading-tight">
              {BRAND_INFO.ctaBannerHeadline || 'STAND OUT FROM THE CROWD WITH MAX COLOR'}
            </h2>
            <p className="text-textSecondary text-base sm:text-lg leading-relaxed font-body max-w-xl">
              {BRAND_INFO.ctaBannerSubhead ||
                'Schedule your vehicle assessment with our master painters. Experience flawless automotive finish.'}
            </p>
          </FadeInOnScroll>

          {/* Right side (~30-40% width: lg:col-span-5) */}
          <FadeInOnScroll
            direction="up"
            delay={0.15}
            className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end text-left lg:text-right"
          >
            <p className="text-textSecondary text-sm font-medium mb-3">
              {BRAND_INFO.ctaBannerNote || 'Reserve an inspection slot today'}
            </p>
            <Button
              variant="primary"
              onClick={onRequestConsultation}
              className="shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] text-base px-8 h-12 rounded-full font-semibold transition-all duration-300"
            >
              {BRAND_INFO.ctaBannerButton || 'Request Inspection'}
            </Button>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}
