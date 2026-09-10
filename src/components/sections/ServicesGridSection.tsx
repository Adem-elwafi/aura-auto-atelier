import { SERVICE_ITEMS, BRAND_INFO } from '@/data/content';
import { ServiceCard, Button } from '@/components/ui';
import { FadeInOnScroll } from '@/components/common';
import { Sparkles } from 'lucide-react';

export interface ServicesGridSectionProps {
  onRequestConsultation: (serviceName?: string) => void;
}

export function ServicesGridSection({ onRequestConsultation }: ServicesGridSectionProps) {
  return (
    <section id="services" className="scroll-mt-24 py-20 lg:py-28 max-w-[1280px] mx-auto px-6 lg:px-12 relative">
      <div id="shop" className="absolute -top-24 pointer-events-none" />
      {/* Section Header */}
      <FadeInOnScroll direction="up" className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
        <span className="text-xs uppercase font-semibold text-cyan tracking-overline-tracking block mb-3">
          PRECISION PROTECTION &amp; BESPOKE FINISHES
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-textPrimary tracking-tight-heading uppercase">
          {BRAND_INFO.servicesTitle || 'TYPES OF CAR PAINTING'}
        </h2>
        <p className="text-textSecondary text-base sm:text-lg mt-4 font-body leading-relaxed">
          Comprehensive preservation and customization programs calibrated specifically for exotic,
          collector, and hypercar platforms.
        </p>
      </FadeInOnScroll>

      {/* 2x3 Service Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
        {SERVICE_ITEMS.map((service, index) => (
          <ServiceCard
            key={service.id}
            item={service}
            index={index}
            onSelect={(item) => onRequestConsultation(item.title)}
          />
        ))}

        {/* Special 6th Tile: Cobalt CTA Tile */}
        <FadeInOnScroll delay={SERVICE_ITEMS.length * 0.1} className="h-full">
          <div className="bg-cobalt text-white rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_-10px_rgba(37,99,235,0.4)] h-full min-h-[360px] transition-all duration-300 hover:shadow-[0_15px_40px_-10px_rgba(37,99,235,0.6)]">
            {/* Ambient Background Glow */}
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-black/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-white mb-6">
                <Sparkles className="w-3.5 h-3.5 text-cyan" />
                <span>Custom Commission</span>
              </div>

              <h3 className="font-display font-bold text-2xl text-white tracking-tight leading-snug">
                Free Consultation
              </h3>

              <p className="text-white/80 text-sm mt-3 leading-relaxed font-body">
                Speak with our master technicians for custom livery, paint measurement, or tailored
                protection packages.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Button
                variant="ghost"
                onClick={() => onRequestConsultation('General Inquiry')}
                className="border-white/40 text-white hover:border-white hover:bg-white/10 w-full sm:w-auto px-6 font-semibold"
              >
                Book Assessment
              </Button>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
