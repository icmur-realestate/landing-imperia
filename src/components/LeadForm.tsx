import { useState } from 'react';
import PocketBase from 'pocketbase';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Información General'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Connect to CRM
      const pb = new PocketBase('https://imperia-crm.161.97.120.36.nip.io');

      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        interest: formData.interest,
        status: 'pending'
      };

      await pb.collection('leads_imperia').create(data);

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', interest: 'Información General' });

    } catch (err: any) {
      console.error("Error detailed:", err);
      let msg = "Error de conexión";

      if (err.status === 403) {
        msg = "Acceso Denegado (Revisa API Rules en PocketBase)";
      } else if (err.status === 400) {
        // PocketBase validation errors structure: err.data.data
        const validationData = err.data?.data || err.response?.data || {};
        const failedFields = Object.keys(validationData).join(", ");
        msg = failedFields ? `Error en campos: [${failedFields}].` : "Faltan campos obligatorios en PocketBase.";
      } else if (err.status === 404) {
        msg = "Colección 'leads_imperia' no encontrada";
      }

      setErrorMessage(msg);
      setStatus('error');
    }
  };

  return (
    <section className="lead-section container" id="contact">
      <div className="lead-wrapper">
        <div className="lead-text">
          <span className="text-gold" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Solicitud de Información Privada</span>
          <h2>ASEGURA TU PLAZA</h2>
          <p>¿Quieres saber más información? Rellena el formulario y te enviamos el dossier completo al instante. Descubre por qué Edificio IMPERIA es el proyecto más exclusivo de Murcia.</p>
        </div>

        <form className="lead-form" onSubmit={handleSubmit}>
          {status === 'success' ? (
            <div className="success-message fade-in-up">
              <h3>¡Gracias por confiar en nosotros! 🏢✨</h3>
              {formData.interest === 'Solicitar Planos' ? (
                <p>Hemos recibido tu solicitud. Te estamos enviando los <strong>planos detallados</strong> de la promoción a tu email ahora mismo.</p>
              ) : formData.interest === 'Visita Concertada' ? (
                <p>Hemos recibido tu interés por una <strong>visita</strong>. En breve nos pondremos en contacto contigo para coordinar el mejor momento.</p>
              ) : (
                <p>Hemos recibido tus datos correctamente. Te estamos enviando la <strong>información general</strong> de la promoción a tu email ahora mismo.</p>
              )}
              <p style={{ fontSize: '0.9rem', marginTop: '1.5rem', opacity: 0.9 }}>
                ¡Agradecemos mucho tu interés en la <strong>Cooperativa Imperia</strong>!
                <br /><br />
                ⚠️ <strong>NOTA:</strong> Revisa tu bandeja de <strong>spam</strong> por si tu proveedor ha decidido mandar el dossier allí para que no lo leas. ¡No dejes que se salga con la suya! 🕵️‍♂️📩
              </p>
              <button type="button" className="btn-secondary" onClick={() => {
                setStatus('idle');
                setFormData({ name: '', email: '', phone: '', interest: 'Información General' });
              }}>Volver</button>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+34 600 000 000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="interest">Interés Principal</label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                >
                  <option>Información General</option>
                  <option>Solicitar Planos</option>
                  <option>Visita Concertada</option>
                </select>
              </div>

              <button type="submit" className="btn-submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Enviando...' : 'SOLICITAR INFORMACIÓN'}
              </button>

              {status === 'error' && (
                <p className="error-text" style={{ color: '#ff6b6b', marginTop: '1rem', fontSize: '0.9rem' }}>
                  ❌ {errorMessage || "Hubo un error. Por favor inténtalo de nuevo."}
                </p>
              )}
            </>
          )}
        </form>
      </div>

      <style>{`
        .lead-section {
          padding: var(--spacing-xl) var(--spacing-sm);
        }

        .lead-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-lg);
          text-align: center;
        }

        .lead-text {
          max-width: 800px;
          margin: 0 auto;
        }

        @media (min-width: 900px) {
          .lead-wrapper {
            gap: var(--spacing-xl);
          }
        }

        .lead-text h2 {
          margin: var(--spacing-sm) 0;
          font-size: 3rem;
        }

        .lead-text p {
          color: var(--color-text-muted);
          font-size: 1.2rem;
          line-height: 1.6;
        }

        .lead-form {
          background: var(--color-dark-light);
          padding: 3rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255,255,255,0.05);
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-gray);
        }

        .form-group input, .form-group select {
          width: 100%;
          padding: 1rem;
          background: var(--color-bg);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          border-radius: var(--radius-sm);
          font-family: var(--font-sans);
          transition: border-color 0.3s;
        }

        .form-group input:focus, .form-group select:focus {
          outline: none;
          border-color: var(--color-gold);
        }

        .btn-submit {
          width: 100%;
          background: var(--color-gold);
          color: var(--color-dark);
          padding: 1rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: 0.3s;
        }

        .btn-submit:hover:not(:disabled) {
          background: white;
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .success-message {
          text-align: center;
        }
        
        .success-message h3 {
          color: var(--color-gold);
          margin-bottom: 1rem;
        }
        
        .btn-secondary {
          background: transparent;
          border: 1px solid var(--color-gold);
          color: var(--color-gold);
          padding: 0.5rem 1.5rem;
          margin-top: 1rem;
        }
      `}</style>
    </section>
  );
};

export default LeadForm;
