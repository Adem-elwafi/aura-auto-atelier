import { useState } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { LeadModal, Button } from '@/components/ui';
import { Sparkles, ShieldCheck, Car, CalendarClock } from 'lucide-react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string | undefined>(
    undefined
  );

  const openModal = (service?: string) => {
    setSelectedServiceCategory(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-canvas text-textPrimary selection:bg-cobalt selection:text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar onRequestCallback={() => openModal()} />

      {/* Main Content Layout Shell */}
      <main className="flex-1 pt-20">
        {/* Placeholder: Hero Section (Phase 5) */}
        <section className="py-24 px-6 lg:px-12 max-w-[1280px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-cyan text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Aura Auto Atelier</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-textPrimary max-w-4xl mx-auto">
            Perfection in Every Reflection
          </h1>

          <p className="text-textSecondary text-base md:text-lg max-w-2xl mx-auto font-body">
            Bespoke paint protection film, nanoceramic shielding, and master-level correction for
            exotic and luxury marques.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              variant="primary"
              onClick={() => openModal('Paint Protection Film (PPF)')}
              className="shadow-lg shadow-cobalt/25"
            >
              Book Private Consultation
            </Button>
            <a href="#services">
              <Button variant="ghost">Explore Services</Button>
            </a>
          </div>
        </section>

        {/* Placeholder: Services Section (Phase 6) */}
        <section
          id="services"
          className="scroll-mt-24 py-20 px-6 lg:px-12 max-w-[1280px] mx-auto border-t border-white/[0.06]"
        >
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase font-semibold text-cyan tracking-widest">
              Craftsmanship
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-textPrimary">
              Atelier Services
            </h2>
            <p className="text-textSecondary text-sm max-w-md mx-auto">
              Master-crafted protection packages engineered to preserve showroom brilliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-borderSubtle hover:border-borderHighlight transition-colors group">
              <ShieldCheck className="w-6 h-6 text-cyan mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-display font-bold text-textPrimary text-lg">Paint Protection Film</h3>
              <p className="text-sm text-textSecondary mt-2 mb-4">
                Self-healing optical shields safeguarding exotic bodywork from rock chips and abrasions.
              </p>
              <Button
                variant="ghost"
                onClick={() => openModal('Paint Protection Film (PPF)')}
                className="text-xs h-9 px-4"
              >
                Inquire Service
              </Button>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-borderSubtle hover:border-borderHighlight transition-colors group">
              <Car className="w-6 h-6 text-cobalt mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-display font-bold text-textPrimary text-lg">Ceramic &amp; Graphene</h3>
              <p className="text-sm text-textSecondary mt-2 mb-4">
                Hydrophobic molecular shield providing permanent gloss depth and chemical resistance.
              </p>
              <Button
                variant="ghost"
                onClick={() => openModal('Ceramic & Graphene Coating')}
                className="text-xs h-9 px-4"
              >
                Inquire Service
              </Button>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-borderSubtle hover:border-borderHighlight transition-colors group">
              <CalendarClock className="w-6 h-6 text-cyan mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-display font-bold text-textPrimary text-lg">Bespoke Styling</h3>
              <p className="text-sm text-textSecondary mt-2 mb-4">
                Precision color changes, satin transformations, and bespoke cabin interior shielding.
              </p>
              <Button
                variant="ghost"
                onClick={() => openModal('Bespoke Color Change Wrap')}
                className="text-xs h-9 px-4"
              >
                Inquire Service
              </Button>
            </div>
          </div>
        </section>

        {/* Placeholder: About Section (Phase 7) */}
        <section
          id="about"
          className="scroll-mt-24 py-20 px-6 lg:px-12 max-w-[1280px] mx-auto border-t border-white/[0.06]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase font-semibold text-cyan tracking-widest">
                Our Standards
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-textPrimary">
                Museum-Grade Precision
              </h2>
              <p className="text-textSecondary text-sm leading-relaxed">
                Operating inside a climate-controlled, hospital-grade clean room in Beverly Hills,
                our master artisans treat every automobile as high art. We never cut film directly
                on paint, ensuring seamless rolled edges and invisible protection.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-surface border border-white/10 space-y-4">
              <h4 className="font-display font-semibold text-textPrimary text-base">
                Beverly Hills Atelier Guarantee
              </h4>
              <p className="text-xs text-textSecondary leading-relaxed">
                Every installation undergoes digital micron paint depth inspection, 100% HEPA air
                purification isolation, and comes backed by our comprehensive nationwide warranty.
              </p>
            </div>
          </div>
        </section>

        {/* Placeholder: Contact Section (Phase 8) */}
        <section
          id="contact"
          className="scroll-mt-24 py-20 px-6 lg:px-12 max-w-[1280px] mx-auto border-t border-white/[0.06]"
        >
          <div className="p-8 lg:p-12 rounded-3xl bg-surface border border-white/10 text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-textPrimary">
              Schedule Your Private Consultation
            </h2>
            <p className="text-textSecondary text-sm max-w-md mx-auto">
              Speak directly with our master detailers to formulate a bespoke aesthetic and
              preservation plan.
            </p>
            <div>
              <Button
                variant="primary"
                onClick={() => openModal()}
                className="shadow-lg shadow-cobalt/25"
              >
                Request Callback
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Lead Consultation Modal */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialService={selectedServiceCategory}
      />
    </div>
  );
}

export default App;
