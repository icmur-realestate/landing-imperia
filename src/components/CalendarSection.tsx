import { useEffect } from "react";

const CalendarSection = () => {
    useEffect(() => {
        // Load Calendly widget script securely
        const head = document.querySelector("head");
        const script = document.createElement("script");
        script.setAttribute(
            "src",
            "https://assets.calendly.com/assets/external/widget.js"
        );
        head?.appendChild(script);
    }, []);

    return (
        <section className="calendar-section container text-center" id="agenda">
            <h2 className="editorial-title" style={{ marginBottom: '1rem', marginTop: '2rem' }}>AGENDA TU VISITA PRIVADA</h2>
            <p className="mb-lg text-muted" style={{ letterSpacing: '1px' }}>Selecciona el día y hora que mejor te convenga para conocer Imperia.</p>

            <div className="calendar-wrapper">
                {/* 
            IMPORTANT: The 'data-url' below must be a valid Calendly scheduling page.
            If this URL is 404, the widget will show an error.
          */}
                <div
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/comercial-icmur/visita-imperia?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=d4af37"
                    style={{ minWidth: '320px', height: '700px' }}
                />
            </div>

            <style>{`
            .calendar-section {
                padding: 6rem 0;
                border-top: 1px solid rgba(255,255,255,0.05);
            }

            .calendar-wrapper {
                max-width: 1000px;
                margin: 0 auto;
                height: 700px;
                overflow: hidden;
                border-radius: 8px;
            }
            
            @media (max-width: 768px) {
                .calendar-section {
                    padding: 4rem 1rem;
                }
            }
        `}</style>
        </section>
    );
};

export default CalendarSection;
