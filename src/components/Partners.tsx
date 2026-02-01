const Partners = () => {
  return (
    <section className="partners-section">
      <div className="container">
        <div className="partners-wrapper">
          <div className="partner-item">
            <div className="partner-logo-container">
              <img src="/assets/LOGO_IMPERIA.png" alt="Imperia Cooperativa" className="partner-logo" />
            </div>
          </div>
          <div className="partner-divider"></div>
          <div className="partner-item">
            <div className="partner-logo-container">
              <img src="/assets/renders/ICMUR_LOGO_V2.png" alt="ICMUR Real Estate" className="partner-logo" />
            </div>
          </div>
          <div className="partner-divider"></div>
          <div className="partner-item">
            <div className="partner-logo-container">
              <img src="/assets/renders/CONSTRUCTORA_LOGO.jpg" alt="Logo 3" className="partner-logo" />
            </div>
          </div>
          <div className="partner-divider"></div>
          <div className="partner-item">
            <div className="partner-logo-container">
              <div className="placeholder-logo">LOGO 4</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .partners-section {
          padding: 3rem 0;
          background: #fff;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }
        .partners-wrapper {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 4rem;
          align-items: center;
          justify-items: center;
        }
        .partner-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .partner-logo-container {
          height: 180px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .partner-logo {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          opacity: 1;
        }
        .partner-divider {
          display: none; /* Removed for grid layout */
        }
        .placeholder-logo {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: #999;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        
        @media (max-width: 900px) {
          .partners-wrapper {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
          .partner-logo-container {
            height: 120px;
          }
        }
        @media (max-width: 480px) {
          .partners-wrapper {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Partners;
