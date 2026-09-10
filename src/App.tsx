import { useState } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { LeadModal } from '@/components/ui';
import {
  HeroSection,
  BrandIntroSection,
  ServicesGridSection,
  ValuePropsSection,
  CtaBannerSection,
} from '@/components/sections';

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
      <main className="flex-1">
        <HeroSection onRequestConsultation={openModal} />
        <BrandIntroSection />
        <ServicesGridSection onRequestConsultation={openModal} />
        <ValuePropsSection />
        <CtaBannerSection onRequestConsultation={() => openModal()} />
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
