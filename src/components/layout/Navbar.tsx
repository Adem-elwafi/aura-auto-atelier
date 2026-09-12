import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_ROUTES } from '@/data/content';
import { cn } from '@/lib/utils';

export interface NavbarProps {
  onRequestCallback: () => void;
}

export function Navbar({ onRequestCallback }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'w-full fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0B0E14]/75 transition-all duration-300',
        isScrolled
          ? 'border-b border-white/[0.08] shadow-lg shadow-black/20 bg-[#0B0E14]/90'
          : 'border-b border-transparent'
      )}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Left: Brand Wordmark & Emblem */}
        <a
          href="#hero"
          className="flex items-center gap-3 group select-none focus:outline-none"
          aria-label="MAX COLOR Home"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-surface border border-white/10 group-hover:border-cyan/40 transition-colors">
            <svg
              className="w-6 h-6 text-cyan transform group-hover:scale-105 transition-transform duration-300"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M16 2L29 9.5V22.5L16 30L3 22.5V9.5L16 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cyan/50"
              />
              <path
                d="M16 6L25 11.5V20.5L16 26L7 20.5V11.5L16 6Z"
                fill="url(#brand-grad)"
                fillOpacity="0.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cyan"
              />
              <circle cx="16" cy="16" r="2.5" fill="#38BDF8" />
              <defs>
                <linearGradient id="brand-grad" x1="7" y1="6" x2="25" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563EB" />
                  <stop offset="1" stopColor="#38BDF8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <span className="font-display font-normal text-xl tracking-tight text-white">
            MAX COLOR
          </span>
        </a>

        {/* Center: Desktop Navigation Routes */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {NAV_ROUTES.map((route) => (
            <a
              key={route.anchor}
              href={route.anchor}
              className="text-sm tracking-wide text-white/90 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan hover:after:w-full after:transition-all after:duration-200"
            >
              {route.label}
            </a>
          ))}
        </nav>

        {/* Right: Primary Pill CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            type="button"
            onClick={onRequestCallback}
            className="rounded-full bg-cobalt hover:bg-cobaltHover text-white px-5 py-2 text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(37,99,235,0.35)] active:scale-[0.98] transition-all"
          >
            Callback
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl text-textSecondary hover:text-textPrimary hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown / Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-b border-white/[0.08] bg-[#0B0E14]/95 backdrop-blur-2xl"
          >
            <div className="px-6 py-6 space-y-4">
              <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
                {NAV_ROUTES.map((route) => (
                  <a
                    key={route.anchor}
                    href={route.anchor}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-base font-medium text-white/90 hover:text-white transition-colors"
                  >
                    <span>{route.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-textMuted" />
                  </a>
                ))}
              </nav>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onRequestCallback();
                  }}
                  className="w-full rounded-full bg-cobalt hover:bg-cobaltHover text-white py-2.5 text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(37,99,235,0.35)] active:scale-[0.98] transition-all text-center"
                >
                  Callback
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
