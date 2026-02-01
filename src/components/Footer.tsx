interface FooterProps {
  onLegalClick: (type: 'aviso' | 'privacidad' | 'cookies') => void;
}

const Footer = ({ onLegalClick }: FooterProps) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-contact">
            <h4>Contacto</h4>
            <p>Plaza Emilio Díez de revenga 3, Entlo</p>
            <a href="tel:+34604445924" style={{ display: 'inline', color: 'inherit' }}>+34 604 445 924</a>
            <a href="mailto:comercial@icmur.es" style={{ display: 'block', marginTop: '0.5rem' }}>comercial@icmur.es</a>
          </div>
          <div className="footer-links">
            <h4>Legal</h4>
            <button onClick={() => onLegalClick('aviso')} className="footer-link-btn">Aviso Legal</button>
            <button onClick={() => onLegalClick('privacidad')} className="footer-link-btn">Privacidad</button>
            <button onClick={() => onLegalClick('cookies')} className="footer-link-btn">Cookies</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 ICMUR Real Estate. Todos los derechos reservados.</p>
        </div>
      </div>

      <style>{`
        .footer {
          background: #000;
          padding: var(--spacing-xl) 0 var(--spacing-md);
          color: white;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-lg);
        }

        @media (min-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
          }
        }

        .footer h4 {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          text-transform: uppercase;
          margin-bottom: 1rem;
          color: var(--color-gray);
        }

        .footer p, .footer a, .footer-link-btn {
          color: var(--color-gray);
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          text-align: center;
        }

        .footer-contact, .footer-links {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .footer-link-btn {
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: color 0.3s;
          font-family: inherit;
        }

        .footer a:hover, .footer-link-btn:hover {
          color: var(--color-gold);
        }

        .footer-bottom {
          text-align: center;
          padding-top: var(--spacing-md);
          border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 0.8rem;
          color: #555;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
