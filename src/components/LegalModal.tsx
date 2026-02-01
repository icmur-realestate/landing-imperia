import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'phosphor-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'aviso' | 'privacidad' | 'cookies' | null;
}

const LegalModal = ({ isOpen, onClose, type }: LegalModalProps) => {
  const content = {
    aviso: {
      title: 'AVISO LEGAL',
      body: `
        ICMUR REAL ESTATE-INMOBILIARIA CÁRCELES se encuentra muy concienciado con la normativa en materia de protección de los datos personales.
        La Web (https://www.icmur.es) es un dominio de internet cuyo propietario es ICMUR marca registrada con domicilio en Plaza Emilio Díaz de Revenga, 3, Entlo. C 30009 Murcia (España).

        1.- Utilización de este Sitio Web:
        En estas condiciones Generales se regula el funcionamiento del servicio del sitio Web que ICMUR pone a disposición del usuario. La utilización del sitio web atribuye la condición de usuario, y supone la aceptación plena por el Usuario de todas las Condiciones de Uso.

        2.- Derecho de modificar el sitio Web:
        ICMUR se reserva el derecho de modificar en cualquier momento, sin previo aviso, la presentación o configuración del sitio web, así como la información y servicios.

        3.- Propiedad Intelectual e Industrial:
        Todos los derechos de propiedad industrial e intelectual sobre los Contenidos y/o cualesquiera otros elementos insertados en el Sitio Web pertenecen a JOSÉ ANTONIO CÁRCELES MORENTE y/o a terceros.

        4.- Exclusión de garantías y responsabilidad:
        ICMUR no garantiza la disponibilidad y continuidad del funcionamiento del Sitio Web y no será responsable por daños derivados de la falta de accesibilidad.
      `
    },
    privacidad: {
      title: 'POLÍTICA DE PRIVACIDAD',
      body: `
        ICMUR REAL ESTATE-INMOBILIARIA CÁRCELES, con domicilio en Plaza Emilio Díaz de Revenga, 3, Entlo. C 30009 Murcia (España), es responsable del tratamiento de sus datos personales.

        ¿CON QUÉ FINALIDAD TRATAMOS SUS DATOS PERSONALES?
        - Tramitar la prestación de un servicio.
        - Dar curso y gestionar reclamaciones y solicitudes.
        - Utilización de sus datos personales con finalidad comercial (con consentimiento previo).

        ¿CUÁL ES LA LEGITIMACIÓN PARA EL TRATAMIENTO DE SUS DATOS?
        La base legal es la ejecución de un contrato, el interés legítimo para mejorar nuestros servicios, y el cumplimiento de obligaciones legales.

        ¿POR CUÁNTO TIEMPO CONSERVAREMOS SUS DATOS?
        Sus datos personales serán conservados durante el tiempo necesario para cumplir la finalidad para la cual se recogieron y las obligaciones legales correspondientes.

        DERECHOS:
        Usted tiene derecho a acceder, rectificar y suprimir sus datos, así como otros derechos detallados en la normativa vigente, enviando un email a comercial@icmur.es.
      `
    },
    cookies: {
      title: 'POLÍTICA DE COOKIES',
      body: `
        ¿QUÉ SON LAS COOKIES? 
        Las cookies son ficheros o pequeños archivos de texto que se instalan en el equipo del usuario al acceder a determinadas páginas web, para almacenar y recuperar información sobre la navegación.

        TIPOS DE COOKIES:
        - Cookies técnicas y funcionales: Estrictamente necesarias para el uso del sitio.
        - Cookies analíticas: Ayudan a comprender el uso que hacen los usuarios de nuestra web.
        - Cookies de personalización: Permiten configurar el diseño, idioma, etc.

        GESTIÓN DE COOKIES:
        Usted puede restringir, bloquear o borrar las cookies de nuestra web utilizando la configuración de su navegador. El hecho de desactivar el uso de cookies puede disminuir la funcionalidad del sitio web.
      `
    }
  };

  const activeContent = type ? content[type] : null;

  return (
    <AnimatePresence>
      {isOpen && activeContent && (
        <div className="legal-modal-overlay">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="legal-modal-container"
          >
            <div className="modal-header">
              <h3>{activeContent.title}</h3>
              <button onClick={onClose} className="close-btn">
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="legal-text-content">
                {activeContent.body.split('\n').map((line, i) => (
                  <p key={i}>{line.trim()}</p>
                ))}
              </div>
            </div>
          </motion.div>

          <style>{`
            .legal-modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 2rem;
            }
            .modal-backdrop {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.85);
              backdrop-filter: blur(5px);
            }
            .legal-modal-container {
              position: relative;
              background: #111;
              width: 100%;
              max-width: 800px;
              max-height: 80vh;
              border: 1px solid rgba(212, 175, 55, 0.2);
              border-radius: 8px;
              display: flex;
              flex-direction: column;
              overflow: hidden;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
            .modal-header {
              padding: 1.5rem 2rem;
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
              display: flex;
              justify-content: space-between;
              align-items: center;
              background: #1a1a1a;
            }
            .modal-header h3 {
              color: var(--color-gold);
              font-family: var(--font-serif);
              font-size: 1.5rem;
              letter-spacing: 1px;
            }
            .close-btn {
              background: transparent;
              color: white;
              border: none;
              cursor: pointer;
              transition: color 0.3s;
              padding: 0.5rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .close-btn:hover {
              color: var(--color-gold);
            }
            .modal-body {
              padding: 2rem;
              overflow-y: auto;
              color: rgba(255, 255, 255, 0.8);
              font-size: 0.95rem;
              line-height: 1.6;
            }
            .legal-text-content p {
              margin-bottom: 1.2rem;
              white-space: pre-wrap;
            }
            /* Custom Scrollbar */
            .modal-body::-webkit-scrollbar {
              width: 6px;
            }
            .modal-body::-webkit-scrollbar-track {
              background: #111;
            }
            .modal-body::-webkit-scrollbar-thumb {
              background: var(--color-gold);
              border-radius: 10px;
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
