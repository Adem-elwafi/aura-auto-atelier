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
        'group relative flex flex-col h-full bg-surface rounded-2xl border border-white/[0.06] overflow-hidden',
        'hover:border-borderHighlight hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.25)] transition-all duration-300 text-left',
        onSelect && 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt',
        className
      )}
    >
      <div className="h-[200px] w-full overflow-hidden relative bg-canvas/60">
        <img
          src={item.imageSrc}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-50" />
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-display font-bold text-lg text-textPrimary group-hover:text-white transition-colors">
            {item.title}
          </h3>
          <p className="text-textSecondary text-sm line-clamp-2 mt-2 leading-relaxed">
            {item.tagline}
          </p>
        </div>

        <div className="mt-5 pt-2">
          <span className="text-cobalt text-xs font-semibold tracking-wide uppercase group-hover:text-cyan transition-colors inline-flex items-center gap-1.5">
            Learn more
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </div>
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
