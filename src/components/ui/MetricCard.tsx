import type { FeatureStat } from '@/types';
import { cn } from '@/lib/utils';
import { FadeInOnScroll } from '@/components/common/FadeInOnScroll';

export interface MetricCardProps {
  stat: FeatureStat;
  index?: number;
  className?: string;
}

export function MetricCard({ stat, index, className }: MetricCardProps) {
  const cardContent = (
    <div
      className={cn(
        'bg-surface rounded-2xl border border-white/[0.06] p-6 lg:p-8',
        'hover:border-borderHighlight hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.2)] transition-all duration-300 text-left h-full flex flex-col justify-between',
        className
      )}
    >
      <div>
        <div className="text-cobalt font-display font-extrabold text-4xl lg:text-5xl tracking-tight-heading">
          {stat.metric}
        </div>
        <h3 className="text-textPrimary font-bold text-lg mt-3 tracking-tight-heading uppercase font-display">
          {stat.headline}
        </h3>
        <p className="text-textSecondary text-sm mt-2 leading-relaxed">
          {stat.description}
        </p>
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
