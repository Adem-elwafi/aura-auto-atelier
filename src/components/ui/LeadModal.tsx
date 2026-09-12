import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';
import { SERVICE_CATEGORIES } from '@/data/content';
import type { LeadFormData } from '@/types';
import { Button } from '@/components/ui/Button';

export interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  title?: string;
  onSubmitSuccess?: (data: LeadFormData) => void;
}

interface LeadModalContentProps {
  onClose: () => void;
  initialService?: string;
  title: string;
  onSubmitSuccess?: (data: LeadFormData) => void;
}

function LeadModalContent({
  onClose,
  initialService,
  title,
  onSubmitSuccess,
}: LeadModalContentProps) {
  const categories =
    initialService && !SERVICE_CATEGORIES.includes(initialService)
      ? [...SERVICE_CATEGORIES, initialService]
      : SERVICE_CATEGORIES;

  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    serviceCategory: initialService || SERVICE_CATEGORIES[0] || '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle ESC key and background scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Auto-close on successful submission
  useEffect(() => {
    if (!isSubmitted) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [isSubmitted, onClose]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmitSuccess?.(formData);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#0B0E14]/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-surface border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl overflow-hidden my-auto text-left"
      >
        {/* Close 'X' button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-textSecondary hover:text-textPrimary hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-cobalt/10 border border-cobalt/20 flex items-center justify-center mx-auto text-cyan shadow-lg shadow-cobalt/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-display font-normal text-2xl text-white">
                Request Received
              </h3>
              <p className="text-textSecondary text-sm mt-2 max-w-xs mx-auto leading-relaxed">
                Our master atelier specialist will contact you within 15 minutes to confirm your vehicle's reservation.
              </p>
            </div>
            <div className="pt-4">
              <Button variant="ghost" onClick={onClose} className="w-full">
                Close Window
              </Button>
            </div>
          </motion.div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cobalt/10 border border-cobalt/20 text-cyan text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Aura Concierge</span>
              </div>
              <h2 id="modal-title" className="font-display font-normal text-2xl text-white">
                {title}
              </h2>
              <p className="text-textSecondary text-sm mt-1">
                Connect directly with our master craftsmen to tailor your protection package.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="lead-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-textSecondary mb-2"
                >
                  Full Name <span className="text-cobalt">*</span>
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  placeholder="e.g. Julian Sterling"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full h-11 bg-canvas border border-white/10 rounded-xl px-4 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-cobalt focus:ring-1 focus:ring-cobalt transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="lead-phone"
                  className="block text-xs font-semibold uppercase tracking-wider text-textSecondary mb-2"
                >
                  Phone Number <span className="text-cobalt">*</span>
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  required
                  placeholder="e.g. +1 (310) 555-0199"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full h-11 bg-canvas border border-white/10 rounded-xl px-4 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-cobalt focus:ring-1 focus:ring-cobalt transition-colors"
                />
              </div>

              {/* Service Category */}
              <div>
                <label
                  htmlFor="lead-service"
                  className="block text-xs font-semibold uppercase tracking-wider text-textSecondary mb-2"
                >
                  Desired Service
                </label>
                <div className="relative">
                  <select
                    id="lead-service"
                    value={formData.serviceCategory}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, serviceCategory: e.target.value }))
                    }
                    className="w-full h-11 bg-canvas border border-white/10 rounded-xl px-4 pr-10 text-sm text-textPrimary focus:outline-none focus:border-cobalt focus:ring-1 focus:ring-cobalt transition-colors appearance-none cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-surface text-textPrimary">
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-textSecondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="lead-notes"
                  className="block text-xs font-semibold uppercase tracking-wider text-textSecondary mb-2"
                >
                  Vehicle &amp; Notes (Optional)
                </label>
                <textarea
                  id="lead-notes"
                  rows={3}
                  placeholder="e.g. 2024 Porsche 911 GT3 RS, Chalk exterior — seeking full front track package."
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  className="w-full bg-canvas border border-white/10 rounded-xl p-3.5 text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-cobalt focus:ring-1 focus:ring-cobalt transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full shadow-lg shadow-cobalt/25"
                >
                  {isSubmitting ? 'Submitting Request...' : 'Confirm Consultation Request'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function LeadModal({
  isOpen,
  onClose,
  initialService,
  title = 'Request Private Consultation',
  onSubmitSuccess,
}: LeadModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <LeadModalContent
          key={initialService || 'default'}
          onClose={onClose}
          initialService={initialService}
          title={title}
          onSubmitSuccess={onSubmitSuccess}
        />
      )}
    </AnimatePresence>
  );
}
