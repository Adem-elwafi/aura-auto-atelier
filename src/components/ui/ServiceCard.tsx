import type { ServiceItem } from '@/types';
import { cn } from '@/lib/utils';
import { FadeInOnScroll } from '@/components/common/FadeInOnScroll';

export interface ServiceCardProps {
  item: ServiceItem;
  onSelect?: (service: ServiceItem) => void;
  index?: number;
  className?: string;
}

export function ServiceCard({ item, onSelect, index, className }: ServiceCardProps) {
  const cardContent = (
    <div
      onClick={() => onSelect?.(item)}
      onKeyDown={(e) => {
        if (onSelect && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect(item);
        }
      }}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      className={cn(
        'min-h-[320px] sm:min-h-[380px] relative rounded-2xl bg-surface border border-white/[0.06] hover:border-borderHighlight hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.25)] transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between overflow-hidden group cursor-pointer text-left',
        onSelect && 'focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt',
        className
      )}
    >
      <div className="relative z-10 text-left max-w-xs sm:max-w-sm">
        <h3 className="font-display font-normal text-2xl sm:text-3xl text-textPrimary tracking-tight-heading group-hover:text-white transition-colors">
          {item.title}
        </h3>
        <p className="text-textSecondary text-xs sm:text-sm mt-2">
          {item.tagline}
        </p>
        <div className="mt-4">
          <span className="text-cobalt text-xs font-semibold tracking-wide uppercase group-hover:text-cyan transition-colors inline-flex items-center gap-1.5">
            Learn more
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>

      {/* Bottom-right editorial thumbnail */}
      <div className="absolute bottom-0 right-0 w-44 h-32 sm:w-56 sm:h-44 md:w-64 md:h-48 overflow-hidden rounded-tl-2xl pointer-events-none">
        <img
          src={item.imageSrc}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/30 to-transparent pointer-events-none" />
      </div>
    </div>
  );

  if (index !== undefined) {
    return (
      <FadeInOnScroll delay={index * 0.1} className="h-full">
        {cardContent}
      </FadeInOnScroll>
    );
  }

  return cardContent;
}
