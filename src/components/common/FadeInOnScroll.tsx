import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export type FadeDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface FadeInOnScrollProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  direction?: FadeDirection;
  className?: string;
  duration?: number;
  distance?: number;
  once?: boolean;
}

export function FadeInOnScroll({
  children,
  delay = 0,
  direction = 'up',
  className,
  duration = 0.6,
  distance = 20,
  once = true,
  ...props
}: FadeInOnScrollProps) {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
