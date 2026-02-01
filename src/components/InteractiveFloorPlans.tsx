import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilePdf, Bed, Ruler, CaretDown, Check, Drop } from 'phosphor-react';

interface FloorPlanItemProps {
  title: string;
  bedrooms: string;
  bathrooms: string;
  size: string;
  pdfPath: string;
  letters: string;
}

const FloorPlanItem = ({ title, bedrooms, bathrooms, size, pdfPath, letters }: FloorPlanItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="plan-item">
      <div className="plan-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="plan-info">
          <h3>{title}</h3>
          <div className="plan-meta">
            <span><Bed size={20} /> {bedrooms}</span>
            <span><Drop size={20} /> {bathrooms}</span>
            <span className="hide-mobile"><Ruler size={20} /> {size}</span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <CaretDown size={24} color="var(--color-gold)" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="plan-content"
          >
            <div className="plan-actions">
              <div className="letters-info">
                <Check size={16} color="var(--color-gold)" />
                <span>Tipologías: {letters}</span>
              </div>
              <a href={pdfPath} target="_blank" rel="noopener noreferrer" className="btn-download">
                <FilePdf size={24} />
                DESCARGAR PLANO
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .plan-item {
          border-bottom: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
          margin-bottom: 1rem;
          border-radius: var(--radius-sm);
          overflow: hidden;
          transition: background 0.3s;
        }
        
        .plan-item:hover {
             background: rgba(255,255,255,0.04);
        }

        .plan-header {
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .plan-info h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: white;
        }

        .plan-meta {
          display: flex;
          gap: 2rem;
          color: var(--color-text-muted);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .plan-meta span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .plan-content {
          overflow: hidden;
          background: rgba(0,0,0,0.3);
        }

        .plan-actions {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-start;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .letters-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-white);
          font-style: italic;
        }

        .btn-download {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: transparent;
          border: 1px solid var(--color-gold);
          color: var(--color-gold);
          padding: 1rem 2rem;
          letter-spacing: 2px;
          font-size: 0.8rem;
          transition: all 0.3s;
          text-transform: uppercase;
        }

        .btn-download:hover {
          background: var(--color-gold);
          color: var(--color-dark);
        }
        
        @media (max-width: 600px) {
            .hide-mobile { display: none !important; }
            .plan-header { padding: 1.5rem; }
            .plan-info h3 { font-size: 1.25rem; }
        }
      `}</style>
    </div>
  );
};

const InteractiveFloorPlans = () => {
  const plans = [
    {
      title: "Modelo A",
      bedrooms: "3 DORM.",
      bathrooms: "2 BAÑOS",
      size: "142m² Construidos",
      letters: "Unidad A",
      pdfPath: "/assets/planos/PLANO 3 DORM-LETRA A.pdf"
    },
    {
      title: "Modelo B",
      bedrooms: "3 DORM.",
      bathrooms: "2 BAÑOS",
      size: "139m² Construidos",
      letters: "Unidad B",
      pdfPath: "/assets/planos/PLANO 3 DORM-LETRA B.pdf"
    },
    {
      title: "Modelo C",
      bedrooms: "3 DORM.",
      bathrooms: "2 BAÑOS",
      size: "123m² Construidos",
      letters: "Unidad C",
      pdfPath: "/assets/planos/PLANO 3 DORM-LETRA C.pdf"
    },
    {
      title: "Modelo D",
      bedrooms: "4 DORM.",
      bathrooms: "2 BAÑOS + 1 ASEO",
      size: "203m² Construidos",
      letters: "Unidad D",
      pdfPath: "/assets/planos/PLANO 4 DORM-LETRA D.pdf"
    },
    {
      title: "Modelo E",
      bedrooms: "4 DORM.",
      bathrooms: "2 BAÑOS + 1 ASEO",
      size: "203m² Construidos",
      letters: "Unidad E",
      pdfPath: "/assets/planos/PLANO 4 DORM-LETRA E.pdf"
    }
  ];

  return (
    <section className="plans-section container">
      <div className="text-center mb-xl">
        <span className="text-gold text-uppercase tracking-widest">TIPOLOGÍAS</span>
        <h2 className="mt-sm" style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem' }}>ENCUENTRA TU ESPACIO</h2>
      </div>

      <div className="plans-grid">
        {plans.map((plan, idx) => (
          <FloorPlanItem key={idx} {...plan} />
        ))}
      </div>

      <style>{`
        .plans-section {
          padding: 8rem 2rem;
        }
        
        .plans-grid {
          max-width: 900px;
          margin: 0 auto;
        }
      `}</style>
    </section>
  );
};

export default InteractiveFloorPlans;
