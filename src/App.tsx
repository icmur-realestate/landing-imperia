
import { useState, useEffect } from 'react'
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

    // Detectar hash #reserva y hacer scroll al calendario
    useEffect(() => {
        const hash = window.location.hash;
        if (hash === '#reserva') {
            // Esperar a que el DOM esté completamente cargado
            setTimeout(() => {
                const element = document.getElementById('reserva');
                if (element) {
                    const yOffset = -100; // Offset para header fijo
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 500);
        }
    }, []);

    return (
        <div className="app-container">
            <Header />
            <Hero />

            <main>
                <Features />

                <InteractiveFloorPlans />

                <div id="reserva" style={{ scrollMarginTop: '100px' }}>
                    <BookingWidget />
                </div>

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
