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
        'min-h-[440px] sm:min-h-[500px] relative rounded-2xl bg-surface border border-white/[0.06] hover:border-borderHighlight hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.25)] transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between overflow-hidden group cursor-pointer text-left',
        onSelect && 'focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt',
        className
      )}
    >
      <div className="relative z-10 text-left">
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-textPrimary tracking-tight-heading group-hover:text-white transition-colors">
          {item.title}
        </h3>
        <p className="text-textSecondary text-sm sm:text-base mt-2 max-w-sm line-clamp-2">
          {item.tagline}
        </p>
        <div className="mt-4">
          <span className="text-cobalt text-xs font-semibold tracking-wide uppercase group-hover:text-cyan transition-colors inline-flex items-center gap-1.5">
            Learn more
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>

      <div className="absolute -bottom-4 sm:-bottom-6 left-0 right-0 w-full h-[240px] sm:h-[280px] overflow-hidden flex items-end pointer-events-none">
        <img
          src={item.imageSrc}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-bottom transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent pointer-events-none" />
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
