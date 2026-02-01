import { WhatsappLogo } from 'phosphor-react';

const WhatsAppButton = () => {
    const phoneNumber = "34604445924";
    const message = encodeURIComponent("Hola, me gustaría recibir más información sobre el Residencial Imperia Cooperativa.");
    const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={waLink}
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
        >
            <div className="whatsapp-content">
                <WhatsappLogo size={32} weight="fill" />
            </div>

            <style>{`
                .whatsapp-float {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    z-index: 999;
                    background: #25d366;
                    color: white;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    pointer-events: auto;
                }

                .whatsapp-content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .whatsapp-float:hover {
                    transform: scale(1.1) translateY(-5px);
                    background: #128c7e;
                    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
                }

                @media (max-width: 768px) {
                    .whatsapp-float {
                        bottom: 20px;
                        right: 20px;
                        width: 50px;
                        height: 50px;
                    }
                }
            `}</style>
        </a>
    );
};

export default WhatsAppButton;
