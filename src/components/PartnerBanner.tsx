import logoComercializadora from '../assets/logo_comercializadora.png';
import logoConstructora from '../assets/logo_constructora.png';
import logoCooperativa from '../assets/logo_cooperativa.png';

const PartnerBanner = () => {
    return (
        <section className="partner-banner">
            <div className="container">
                <div className="pyramid-container">
                    {/* Top of Pyramid */}
                    <div className="pyramid-top">
                        <div className="partner-group vertical">
                            <img src={logoCooperativa} alt="Imperia Cooperativa" className="banner-logo cooperativa" />
                        </div>
                    </div>

                    {/* Bottom Row of Pyramid */}
                    <div className="pyramid-bottom">
                        <div className="partner-group">
                            <div className="label-logo-stack">
                                <span className="partner-tag">COMERCIALIZA</span>
                                <img src={logoComercializadora} alt="ICMUR Logo" className="banner-logo icmur" />
                            </div>
                        </div>

                        <div className="partner-divider"></div>

                        <div className="partner-group">
                            <div className="label-logo-stack">
                                <span className="partner-tag">CONSTRUYE</span>
                                <img src={logoConstructora} alt="Navarro Palazón Logo" className="banner-logo navarro" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .partner-banner {
                    background: #000;
                    padding: 3rem 0;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .pyramid-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .pyramid-top {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                .pyramid-bottom {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: flex-start;
                    width: 100%;
                }

                .pyramid-bottom > .partner-group {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                }

                /* Ensure the first group aligns its content to the right to hug the divider */
                .pyramid-bottom > .partner-group:first-child {
                    justify-content: flex-end;
                    padding-right: 4rem;
                }

                /* Ensure the second group aligns its content to the left to hug the divider */
                .pyramid-bottom > .partner-group:last-child {
                    justify-content: flex-start;
                    padding-left: 4rem;
                }

                .partner-group {
                    display: flex;
                    align-items: center;
                }

                .partner-group.vertical {
                    flex-direction: column;
                    gap: 1rem;
                    text-align: center;
                }

                .label-logo-stack {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .housing-text {
                    font-family: var(--font-sans);
                    font-size: 1.2rem;
                    color: rgba(255,255,255,0.4);
                    letter-spacing: 2px;
                    max-width: 400px;
                    line-height: 1.4;
                    text-align: center;
                    font-weight: 500;
                }

                .partner-tag {
                    font-family: var(--font-sans);
                    font-size: 1rem;
                    font-weight: 700;
                    letter-spacing: 4px;
                    color: var(--color-gold);
                    text-transform: uppercase;
                    white-space: nowrap;
                }

                .banner-logo {
                    height: auto;
                    display: block;
                    /* Enhanced visibility filter to make logos "pop" on black */
                    filter: drop-shadow(0 0 1px rgba(255,255,255,0.9)) 
                            drop-shadow(0 0 12px rgba(255,255,255,0.3)) 
                            brightness(1.25) 
                            contrast(1.1);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .banner-logo:hover {
                    transform: scale(1.05);
                    filter: drop-shadow(0 0 2px rgba(255,255,255,1)) 
                            drop-shadow(0 0 25px rgba(255,255,255,0.5)) 
                            brightness(1.4);
                }

                /* PROPORTIONAL MASSIVE SIZES - SYMMETRIC HIERARCHY */
                .cooperativa { 
                    height: 220px; 
                    /* Sticker effect for Imperia */
                    filter: drop-shadow(0 0 1px white) 
                            drop-shadow(0 0 2px white) 
                            drop-shadow(0 0 15px rgba(255,255,255,0.4)) 
                            brightness(1.5) 
                            contrast(1.1);
                }
                
                .icmur { 
                    height: 320px; 
                    /* Multi-layered "Sticker" effect for maximum clarity on black */
                    filter: drop-shadow(0 0 1px white) 
                            drop-shadow(0 0 2px white) 
                            drop-shadow(0 0 15px rgba(255,255,255,0.5)) 
                            brightness(1.5) 
                            contrast(1.2);
                }
                
                .navarro { 
                    height: 320px; 
                    /* Sticker effect for Navarro Palazón */
                    filter: drop-shadow(0 0 1px white) 
                            drop-shadow(0 0 2px white) 
                            drop-shadow(0 0 12px rgba(255,255,255,0.4)) 
                            brightness(1.4) 
                            contrast(1.1);
                }

                .partner-divider {
                    width: 1px;
                    height: 320px;
                    background: rgba(255,255,255,0.1);
                    flex-shrink: 0;
                    margin-top: 3.5rem; /* Precise alignment below tags */
                }

                @media (max-width: 1200px) {
                    .pyramid-bottom > .partner-group:first-child { padding-right: 1.5rem; }
                    .pyramid-bottom > .partner-group:last-child { padding-left: 1.5rem; }
                    .cooperativa { height: 180px; }
                    .icmur { height: 260px; }
                    .navarro { height: 260px; } /* Equal height for tablet */
                    .partner-divider { height: 260px; }
                }
            `}</style>
        </section>
    );
};

export default PartnerBanner;
