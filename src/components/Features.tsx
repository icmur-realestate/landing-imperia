import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FeatureItemProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  idx: number;
}

const FeatureItem = ({ title, subtitle, description, image, idx }: FeatureItemProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isEven = idx % 2 === 0;

  return (
    <section ref={ref} className={`editorial-section ${!isEven ? 'reverse' : ''}`}>
      <div className="editorial-image-container">
        <div className="mask-wrapper">
          <motion.div
            style={{ backgroundImage: `url('${image}')` }}
            className="editorial-image"
          />
        </div>
        <div className="image-number">0{idx + 1}</div>
      </div>

      <motion.div style={{ opacity }} className="editorial-content">
        <h4 className="editorial-subtitle">{subtitle}</h4>
        <h2 className="editorial-title">{title}</h2>
        <p className="editorial-text">{description}</p>
        <button className="btn-link">VER ESPACIO</button>
      </motion.div>

      <style>{`
        .editorial-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          gap: 6rem;
          position: relative;
        }

        .reverse {
          flex-direction: row-reverse;
        }

        .editorial-image-container {
            width: 50vw;
            aspect-ratio: 1.5; /* Match architectural render ratio (3:2) */
            position: relative;
        }

        .mask-wrapper {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;
        }

        .editorial-image {
            width: 100%;
            height: 100%; /* No parallax so no crop is forced */
            background-size: cover; /* Still cover, but now ratio matches container */
            background-position: center;
            will-change: transform;
        }

        .image-number {
            position: absolute;
            top: -2rem; /* Adjusted for mobile */
            left: -1rem;
            font-size: 4rem; /* Smaller for mobile */
            font-family: var(--font-serif);
            color: rgba(255,255,255,0.05);
            z-index: -1;
        }

        @media (min-width: 900px) {
            .image-number {
                top: -4rem;
                left: -2rem;
                font-size: 8rem;
            }
        }

        .editorial-content {
            width: 30vw;
        }

        .editorial-subtitle {
            font-family: var(--font-sans);
            color: var(--color-gold);
            letter-spacing: 3px;
            text-transform: uppercase;
            font-size: 0.8rem;
            margin-bottom: 1.5rem;
        }

        .editorial-title {
            font-family: var(--font-serif);
            font-size: 2.2rem; /* Scaled for mobile */
            line-height: 1.1;
            margin-bottom: 2rem;
        }

        @media (min-width: 900px) {
            .editorial-title {
                font-size: 3.5rem;
                line-height: 1;
            }
        }

        .editorial-text {
            color: var(--color-gray);
            font-size: 1rem; /* Slightly smaller for mobile */
            line-height: 1.6;
            margin-bottom: 2rem;
        }

        @media (min-width: 900px) {
            .editorial-text {
                font-size: 1.1rem;
                line-height: 1.8;
            }
        }

        .btn-link {
            background: none;
            color: white;
            border-bottom: 1px solid var(--color-gold);
            padding-bottom: 5px;
            font-size: 0.9rem;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        @media (max-width: 900px) {
            .editorial-section {
                flex-direction: column;
                padding: 3rem 1.5rem !important; /* Standardized to 3rem */
                gap: 2rem !important; 
                min-height: auto !important;
                height: auto !important;
            }
            .editorial-section.reverse {
                flex-direction: column;
            }
            .editorial-image-container {
                width: 100%;
                height: auto; /* flexible height */
                aspect-ratio: 1.5;
            }
            .editorial-content {
                width: 100%;
            }
        }
      `}</style>
    </section>
  );
};

const Features = () => {
  const data = [
    {
      subtitle: "ZONA DE DÍA: DISEÑO QUE INSPIRA",
      title: "LUZ QUE TRANSFORMA",
      description: "Un espacio pensado para quienes buscan más que una vivienda: una experiencia de hogar. El salón principal, con un diseño impecable, se proyecta al exterior a través de grandes ventanales que inundan cada rincón de luz natural.",
      image: "/assets/renders/SALÓN.jpg"
    },
    {
      subtitle: "ZONA DE DÍA",
      title: "COCINA INTEGRADA AL SALÓN",
      description: "Un espacio diseñado para quienes buscan amplitud, fluidez y un estilo de vida moderno. La cocina abierta se fusiona con el salón, creando una atmósfera luminosa y acogedora, donde cada detalle potencia la sensación de hogar. Un entorno versátil y dinámico que se adapta a cualquier momento del día, integrando funcionalidad y diseño con un equilibrio perfecto.",
      image: "/assets/renders/SALÓN_ABIERTO_FINAL.jpg"
    },
    {
      subtitle: "ZONA DE DÍA",
      title: "COCINA INDEPENDIENTE",
      description: "Un espacio pensado para quienes prefieren una cocina funcional y bien organizada. La distribución independiente permite cocinar con comodidad, manteniendo el orden y la privacidad sin perder luminosidad. Cada detalle ha sido diseñado para que disfrutes de un entorno práctico y acogedor, donde todo está en su sitio y cada momento en la cocina se vive con total naturalidad.",
      image: "/assets/renders/COCINA_INDEPENDIENTE.jpg"
    },
    {
      subtitle: "ZONA DE NOCHE: TU LUGAR FAVORITO",
      title: "CUANDO CAE EL SOL",
      description: "El dormitorio principal es el protagonista. Su gran superficie aporta amplitud y versatilidad. El vestidor incorporado es el aliado perfecto para el orden con estilo. Y para esos momentos de desconexión, el baño en suite se convierte en tu pequeño spa privado con acabados de alta gama.",
      image: "/assets/renders/DORMITORIO.jpg"
    }
  ];

  return (
    <div className="features-container">
      {/* Intro Section */}
      <section className="intro-promotion container">
        <div className="intro-content">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold tracking-widest"
          >
            OBRA NUEVA ÚNICA EN MURCIA
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="intro-title"
          >
            UNA PROMOCIÓN <span className="text-gold">SIN PRECEDENTES</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="intro-text"
          >
            Ubicado en primera línea de AVENIDA PRÍNCIPE DE ASTURIAS, Edificio Imperia no es solo una promoción más. Es el proyecto con las superficies más amplias del mercado de obra nueva en Murcia.
          </motion.p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="intro-highlight"
          >
            IMPERIA, 15 VIVIENDAS EXCLUSIVAS EN LA ZONA NORTE DE MURCIA
          </motion.div>
          <motion.p className="intro-text-small">
            Diseñadas para quienes no se conforman con lo estándar y buscan el privilegio del espacio y la mejor ubicación.
          </motion.p>

          <div className="intro-property-banner">
            <div className="banner-grid-mini">
              <div className="banner-item">
                <span className="banner-value-mini">3 y 4</span>
                <span className="banner-label-mini">DORMITORIOS</span>
              </div>
              <div className="banner-divider-mini"></div>
              <div className="banner-item">
                <span className="banner-value-mini">123 - 203</span>
                <span className="banner-label-mini">METROS CONSTRUIDOS</span>
              </div>
              <div className="banner-divider-mini"></div>
              <div className="banner-item">
                <span className="banner-value-mini">MAX</span>
                <span className="banner-label-mini">EXCLUSIVIDAD</span>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn-cta-gold"
            onClick={() => document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth' })}
          >
            AGENDAR VISITA PRIVADA
          </motion.button>
        </div>
      </section>

      {/* Room Sections */}
      {data.map((item, idx) => (
        <FeatureItem key={idx} idx={idx} {...item} />
      ))}

      {/* Terrace Section (Text-focused) */}
      <section className="terrace-section container">
        <div className="terrace-grid">
          <div className="terrace-content">
            <span className="text-gold tracking-widest">EXTERIORES ÚNICOS</span>
            <h2 className="editorial-title">UNA GRAN TERRAZA EN PLENA CIUDAD</h2>
            <p className="editorial-text">
              Vivir en Príncipe de Asturias significa disfrutar de una de las zonas más exclusivas y codiciadas de Murcia. Y si a esto le sumas una terraza de grandes dimensiones, tienes un auténtico privilegio. Aquí, el espacio exterior no es un extra: es un lujo difícil de encontrar. Una terraza que amplía la sensación de libertad, donde la amplitud se vive y la privacidad se disfruta.
            </p>
          </div>
          <div className="terrace-collage">
            <div className="collage-main">
              <img src="/assets/renders/SALON_COLLAGE.jpg" alt="Interior view" />
            </div>
          </div>
        </div>
      </section>

      {/* Bathroom Section */}
      <section className="bathroom-section container">
        <div className="bathroom-grid">
          <div className="bathroom-image">
            <img src="/assets/renders/BAÑO_GRID.jpg" alt="Baños Edificio Imperia" />
          </div>
          <div className="bathroom-content">
            <span className="text-gold tracking-widest">CALIDAD EN CADA DETALLE</span>
            <h2 className="editorial-title">BAÑOS QUE INVITAN AL BIENESTAR</h2>
            <p className="editorial-text">
              Un espacio donde el diseño minimalista, los materiales premium y la iluminación sutil crean una atmósfera de lujo y bienestar. Cada detalle pensado para ofrecer una experiencia única.
            </p>
          </div>
        </div>
      </section>

      <div className="container text-center" style={{ padding: '8rem 0 8rem' }}>
        <p className="text-muted" style={{ letterSpacing: '2px', fontSize: '0.9rem', textTransform: 'uppercase', maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}>
          La memoria de calidades completa y el dossier se enviarán directamente a su email tras completar el formulario.
        </p>
        <button
          className="btn-link"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ fontSize: '1rem', borderBottom: '1px solid var(--color-gold)', paddingBottom: '5px' }}
        >
          SOLICITAR DOSSIER Y MEMORIA
        </button>
      </div>

      <style>{`
        .intro-promotion {
          padding: 10rem 2rem;
          text-align: center;
        }
        .intro-content {
          max-width: 900px;
          margin: 0 auto;
        }
        .intro-title {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          line-height: 1.1;
          margin: 2rem 0;
        }
        .intro-text {
          font-size: 1.25rem;
          color: var(--color-gray);
          line-height: 1.8;
          margin-bottom: 3rem;
        }
        .btn-cta-gold {
          background: var(--color-gold);
          color: var(--color-dark);
          padding: 1.25rem 3rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: 0.3s;
          margin-top: 4rem; /* Lowered as requested */
        }
        .intro-highlight {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5vw, 3.5rem);
          color: var(--color-gold);
          margin: 3rem 0;
          letter-spacing: 4px;
          font-weight: 400;
        }
        .intro-text-small {
          font-size: 1.1rem;
          opacity: 0.7;
          margin-bottom: 2rem;
        }
        .btn-cta-gold:hover {
          background: white;
        }
        .terrace-section {
          padding: 10rem 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .terrace-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        .terrace-collage {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .collage-main {
          width: 100%;
          border-radius: var(--radius-sm);
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }
        .collage-main img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .collage-main:hover img {
          transform: scale(1.05);
        }
        .terrace-highlight-box {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          background: rgba(212, 175, 55, 0.05);
          padding: 3rem;
          border-radius: var(--radius-sm);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 175, 55, 0.1);
        }
        .highlight-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .highlight-value {
          font-family: var(--font-serif);
          font-size: 3rem;
          color: var(--color-gold);
        }
        .highlight-label {
          font-size: 0.7rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 0.5rem;
          color: var(--color-gray);
        }
        
        /* Intro Property Banner Styles */
        .intro-property-banner {
          margin: 3rem 0;
          padding: 2rem 0;
          border-top: 1px solid rgba(212, 175, 55, 0.1);
          border-bottom: 1px solid rgba(212, 175, 55, 0.1);
          width: 100%;
        }
        .banner-grid-mini {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          flex-wrap: wrap;
        }
        .banner-value-mini {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          color: var(--color-gold);
          line-height: 1;
        }
        .banner-label-mini {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 0.5rem;
          color: var(--color-gray);
        }
        .banner-divider-mini {
          width: 1px;
          height: 40px;
          background: rgba(212, 175, 55, 0.2);
        }
        @media (max-width: 768px) {
          .banner-grid-mini { gap: 2rem; }
          .banner-divider-mini { display: none; }
          .intro-promotion { padding: 3rem 1.5rem !important; } /* Standardized to 3rem */
        }

        /* Bathroom Section Styles */
        .bathroom-section {
          padding: 10rem 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .bathroom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        .bathroom-image {
          border-radius: var(--radius-sm);
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }
        .bathroom-image img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bathroom-image:hover img {
          transform: scale(1.03);
        }
        
        @media (max-width: 900px) {
          .terrace-section, .bathroom-section {
             padding: 3rem 1.5rem !important; /* Standardized to 3rem */
          }
          .terrace-grid, .bathroom-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .bathroom-image, .terrace-collage {
            order: 2;
          }
          .bathroom-content, .terrace-content {
            order: 1;
          }
        }
      `}</style>
    </div >
  );
};

export default Features;
