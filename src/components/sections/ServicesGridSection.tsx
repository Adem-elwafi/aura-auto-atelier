import { SERVICE_ITEMS } from '@/data/content';
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
      <FadeInOnScroll direction="up">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight-heading text-textPrimary text-left mb-10 lg:mb-14">
          TYPES OF CAR PAINTING
        </h2>
      </FadeInOnScroll>

      {/* 2-column Grid (3 rows x 2 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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
          <div className="min-h-[440px] sm:min-h-[500px] bg-cobalt rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group shadow-[0_10px_30px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(37,99,235,0.6)] transition-all duration-300 text-left">
            {/* Ambient Background Glow */}
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-black/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-white mb-6">
                <Sparkles className="w-3.5 h-3.5 text-cyan" />
                <span>Custom Commission</span>
              </div>

              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight-heading">
                FREE CONSULTATION
              </h3>

              <p className="text-white/85 text-sm sm:text-base mt-4 leading-relaxed font-body max-w-md">
                Speak with our master technicians for custom livery, paint measurement, or tailored
                protection packages.
              </p>
            </div>

            <div className="relative z-10 pt-6 text-left">
              <Button
                variant="ghost"
                onClick={() => onRequestConsultation('Free Consultation')}
                className="border-white/50 text-white hover:border-white hover:bg-white/10 hover:text-white px-8 font-semibold w-full sm:w-auto"
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
