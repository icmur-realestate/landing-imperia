
import { useState } from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import InteractiveFloorPlans from './components/InteractiveFloorPlans'
import LeadForm from './components/LeadForm'
import Footer from './components/Footer'
import LegalModal from './components/LegalModal'
import Header from './components/Header'
import WhatsAppButton from './components/WhatsAppButton'
import PartnerBanner from './components/PartnerBanner'
import BookingWidget from './components/BookingWidget'

function App() {
    const [legalModal, setLegalModal] = useState<{
        isOpen: boolean;
        type: 'aviso' | 'privacidad' | 'cookies' | null;
    }>({
        isOpen: false,
        type: null
    });

    const openLegal = (type: 'aviso' | 'privacidad' | 'cookies') => {
        setLegalModal({ isOpen: true, type });
    };

    return (
        <div className="app-container">
            <Header />
            <Hero />

            <main>
                <Features />

                <InteractiveFloorPlans />

                <BookingWidget />

                <div id="contact">
                    <LeadForm />
                </div>

                <PartnerBanner />
            </main>

            <Footer onLegalClick={openLegal} />

            <WhatsAppButton />

            <LegalModal
                isOpen={legalModal.isOpen}
                type={legalModal.type}
                onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
            />
        </div>
    )
}

export default App
