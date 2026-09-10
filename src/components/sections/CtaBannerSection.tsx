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
      className="scroll-mt-24 py-20 lg:py-28 relative overflow-hidden bg-surface/30 border-t border-white/[0.08]"
    >
      {/* Top Banner Container */}
      <div className="relative w-full max-w-[1280px] mx-auto px-6 lg:px-12">
        <FadeInOnScroll direction="up">
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl">
            <img
              src={FOOTER_ASSETS.showcase}
              alt="MAX COLOR Private Facility"
              className="w-full h-[280px] sm:h-[340px] lg:h-[400px] object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/80 to-transparent" />
          </div>
        </FadeInOnScroll>
      </div>

      {/* Content Below / Overlaid */}
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 mt-12 lg:mt-16">
        <FadeInOnScroll direction="up" delay={0.15} className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-textPrimary text-center tracking-tight-heading uppercase">
            {BRAND_INFO.ctaBannerHeadline || 'STAND OUT FROM THE CROWD WITH MAX COLOR'}
          </h2>

          <p className="text-textSecondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-body">
            {BRAND_INFO.ctaBannerSubhead ||
              'Schedule your vehicle assessment with our master painters. Experience flawless automotive finish.'}
          </p>

          <div className="pt-2 flex flex-col items-center gap-3">
            <Button
              variant="primary"
              onClick={onRequestConsultation}
              className="shadow-lg shadow-cobalt/30 text-base px-8 h-12 rounded-full"
            >
              {BRAND_INFO.ctaBannerButton || 'Request Inspection'}
            </Button>
            {BRAND_INFO.ctaBannerNote && (
              <span className="text-xs text-textMuted tracking-wide">
                {BRAND_INFO.ctaBannerNote}
              </span>
            )}
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
