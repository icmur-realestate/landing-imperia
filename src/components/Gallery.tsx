const images = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
];

const Gallery = () => {
    return (
        <section className="gallery-section">
            <div className="container text-center mb-lg">
                <span className="text-gold text-uppercase" style={{ letterSpacing: '2px' }}>Galería</span>
                <h2>Detalles que enamoran</h2>
            </div>

            <div className="gallery-grid">
                {images.map((img, idx) => (
                    <div key={idx} className="gallery-item">
                        <img src={img} alt={`Imperia Detail ${idx + 1}`} loading="lazy" />
                        <div className="gallery-overlay">
                            <span>Ver Detalle</span>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .gallery-section {
          padding: var(--spacing-xl) 0;
          background: #151515;
        }

        .mb-lg {
          margin-bottom: var(--spacing-lg);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 0;
        }

        @media (min-width: 600px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1200px) {
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .gallery-item {
          position: relative;
          aspect-ratio: 1; /* Square images */
          overflow: hidden;
          cursor: pointer;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: rgba(212, 175, 55, 0.8); /* Gold overlay */
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-overlay span {
          color: white;
          font-family: var(--font-serif);
          font-size: 1.5rem;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.1);
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-item:hover .gallery-overlay span {
          transform: translateY(0);
        }
      `}</style>
        </section>
    );
};

export default Gallery;
