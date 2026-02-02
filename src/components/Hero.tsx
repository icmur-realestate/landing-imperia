import { motion, useScroll, useTransform } from 'framer-motion';
import { CaretDown } from 'phosphor-react';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Parallax text
  const opacity = useTransform(scrollY, [0, 300], [1, 0]); // Fade out

  return (
    <section className="hero">

      <div className="hero-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            backgroundImage: "url('/assets/renders/EDIFICIO_HD.png')"
          }}
          className="hero-image"
        />
        <div className="hero-overlay" />
      </div>

      <motion.div
        style={{ y: y1, opacity }}
        className="hero-content container"
      >
        <div className="hero-label">
          <span className="line"></span>
          <span className="text">RESIDENCIAL IMPERIA COOPERATIVA</span>
          <span className="line"></span>
        </div>

        <h1 className="hero-title">
          <motion.span
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="block italics"
          >
            ESTO NO ES SOLO VIVIR
          </motion.span>
          <motion.span
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="block text-gold-gradient"
          >
            ES UNA DECLARACIÓN.
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="hero-actions"
        >
          <button
            className="btn-editorial"
            onClick={() => document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth' })}
          >
            EXPERIENCIA IMPERIA
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, delay: 2, repeat: Infinity }}
      >
        <p>DESCUBRE TU NUEVO HOGAR</p>
        <CaretDown size={20} />
      </motion.div>

      <style>{`
        .hero {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6));
        }

        .hero-header {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 10;
          padding: 2rem 0;
        }

        .header-content {
          display: flex;
          justify-content: center;
        }

        .header-logo {
          height: 60px;
          width: auto;
          filter: drop-shadow(0 0 10px rgba(0,0,0,0.5));
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          width: 100%;
        }

        .hero-label {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            opacity: 0.8;
        }

        .hero-label .line {
            width: 40px;
            height: 1px;
            background: white;
        }

        .hero-label .text {
            font-family: var(--font-sans);
            letter-spacing: 4px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .hero-title {
          font-family: var(--font-serif);
          font-size: var(--size-h2); /* Smaller by default or h2 */
          line-height: 1;
          margin-bottom: 3rem;
          color: white;
        }

        @media (min-width: 900px) {
          .hero-title {
            font-size: var(--size-h1);
            line-height: 0.9;
          }
        }

        .block {
            display: block;
        }

        .text-gold-gradient {
            background: linear-gradient(to right, #C5A059, #E5C585, #C5A059);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% auto;
            animation: shine 5s linear infinite;
        }
        
        @keyframes shine {
            to { background-position: 200% center; }
        }

        .italics {
            font-style: italic;
            font-weight: 400;
            font-size: 0.8em;
        }

        .hero-actions {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2rem;
        }

        .btn-editorial {
            background: white;
            color: black;
            padding: 1rem 1.5rem; /* Reduced for mobile */
            font-family: var(--font-sans);
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            border: none;
            transition: transform 0.3s;
            font-size: 0.85rem;
        }

        @media (min-width: 900px) {
            .btn-editorial {
                padding: 1rem 3rem;
                font-size: 1rem;
            }
            .btn-editorial:hover {
                transform: scale(1.05);
            }
        }

        .video-trigger {
            display: flex;
            align-items: center;
            gap: 1rem;
            cursor: pointer;
            color: white;
            font-family: var(--font-sans);
            font-weight: 600;
            letter-spacing: 2px;
            transition: opacity 0.3s;
        }
        
        .video-trigger:hover {
            opacity: 0.7;
        }

        .play-icon {
            width: 40px;
            height: 40px;
            border: 1px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 4rem;
          left: 0;
          right: 0;
          margin: 0 auto;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: white;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 3px;
          text-align: center;
        }
      `}</style>
    </section>
  );
};

export default Hero;
