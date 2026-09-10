import { Phone, MapPin, Clock } from 'lucide-react';
import { BRAND_INFO, NAV_ROUTES, FOOTER_CONTACT } from '@/data/content';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-canvas py-16 lg:py-20 text-textSecondary">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left Column: Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="#hero"
              className="inline-flex items-center gap-3 group select-none focus:outline-none"
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
                    fill="url(#footer-brand-grad)"
                    fillOpacity="0.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan"
                  />
                  <circle cx="16" cy="16" r="2.5" fill="#38BDF8" />
                  <defs>
                    <linearGradient id="footer-brand-grad" x1="7" y1="6" x2="25" y2="26" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563EB" />
                      <stop offset="1" stopColor="#38BDF8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-textPrimary">
                MAX COLOR
              </span>
            </a>

            <p className="text-sm text-textSecondary leading-relaxed max-w-sm">
              {BRAND_INFO.description}
            </p>
          </div>

          {/* Center Column: Navigation Links */}
          <div className="lg:col-span-3 lg:pl-6 space-y-4">
            <h3 className="font-display font-semibold text-textPrimary text-sm uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-3" role="list">
              {NAV_ROUTES.map((route) => (
                <li key={route.anchor}>
                  <a
                    href={route.anchor}
                    className="text-sm text-textSecondary hover:text-cyan transition-colors inline-block"
                  >
                    {route.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-display font-semibold text-textPrimary text-sm uppercase tracking-wider">
              Concierge &amp; Atelier
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${FOOTER_CONTACT.phoneRaw}`}
                className="flex items-start gap-3 text-textSecondary hover:text-cyan transition-colors group"
                aria-label={`Call us at ${FOOTER_CONTACT.phone}`}
              >
                <Phone className="w-4 h-4 text-cyan mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                <span>{FOOTER_CONTACT.phone}</span>
              </a>

              <div className="flex items-start gap-3 text-textSecondary">
                <MapPin className="w-4 h-4 text-cyan mt-1 shrink-0" />
                <span className="leading-snug">{FOOTER_CONTACT.address}</span>
              </div>

              <div className="flex items-start gap-3 text-textSecondary">
                <Clock className="w-4 h-4 text-cyan mt-1 shrink-0" />
                <span className="leading-snug">{FOOTER_CONTACT.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-textMuted">
          <div>{BRAND_INFO.copyright}</div>
          <div>Crafted with precision &amp; passion for automotive excellence</div>
        </div>
      </div>
    </footer>
  );
}
