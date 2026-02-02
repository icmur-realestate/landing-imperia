import { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';

// Initialize CRM Connection
const pb = new PocketBase('https://imperia-crm.161.97.120.36.nip.io');

// Configuration for "Visita Imperia"
const SCHEDULE_CONFIG = {
    days: [1, 2, 3, 4], // Monday (1) to Thursday (4)
    startHour: 17,
    startMinute: 30,
    endHour: 19,
    endMinute: 30,
    slotDuration: 60, // minutes
    // Explicit slots to make it cleaner given the narrow window
    slots: ["17:15", "18:15", "19:15"]
};

interface BookingState {
    step: 1 | 2 | 3; // 1: Date/Time, 2: Form, 3: Success
    selectedDate: Date | null;
    selectedSlot: string | null;
    formData: {
        name: string;
        phone: string;
        email: string;
    }
}

const BookingWidget = () => {
    const [state, setState] = useState<BookingState>({
        step: 1,
        selectedDate: null,
        selectedSlot: null,
        formData: { name: '', phone: '', email: '' }
    });

    const [availableDays, setAvailableDays] = useState<Date[]>([]);

    useEffect(() => {
        // Genera automáticamente los próximos 14 días a partir de HOY
        const days: Date[] = [];
        const today = new Date();

        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dayOfWeek = date.getDay(); // 0 = Dom, 1 = Lun, etc.

            // Solo añade los días habilitados en la configuración (Lunes a Jueves)
            if (SCHEDULE_CONFIG.days.includes(dayOfWeek)) {
                days.push(date);
            }
        }
        setAvailableDays(days);
    }, []);

    const handleDateSelect = (date: Date) => {
        setState(prev => ({ ...prev, selectedDate: date, selectedSlot: null }));
    };

    const handleSlotSelect = (slot: string) => {
        setState(prev => ({ ...prev, selectedSlot: slot, step: 2 }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({
            ...prev,
            formData: { ...prev.formData, [e.target.name]: e.target.value }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = {
                client_name: state.formData.name,
                client_phone: state.formData.phone,
                client_email: state.formData.email,
                date: state.selectedDate?.toLocaleDateString(),
                slot: state.selectedSlot,
                status: 'pending' // Default status
            };

            await pb.collection('citas_imperia').create(data);

            // Show success step
            setState(prev => ({ ...prev, step: 3 }));

        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Hubo un error al reservar. Por favor inténtalo de nuevo.");
        }
    };

    // Helper for formatting
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }).format(date);
    };

    return (
        <section className="booking-widget container" id="agenda">
            <h2 className="editorial-title text-center" style={{ marginBottom: '1rem', marginTop: '4rem' }}>
                AGENDA TU VISITA PRIVADA
            </h2>
            <p className="text-center text-muted mb-lg" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
                Selecciona el momento perfecto para descubrir Imperia.
            </p>

            <div className="booking-container">
                {state.step === 1 && (
                    <div className="booking-grid">
                        <div className="date-column">
                            <h3 className="column-title">1. Selecciona el Día</h3>
                            <div className="dates-list">
                                {availableDays.map((date, idx) => (
                                    <button
                                        key={idx}
                                        className={`date-btn ${state.selectedDate?.toDateString() === date.toDateString() ? 'active' : ''}`}
                                        onClick={() => handleDateSelect(date)}
                                    >
                                        {formatDate(date)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="slot-column">
                            <h3 className="column-title">2. Horas Disponibles</h3>
                            <div className="slots-list">
                                {!state.selectedDate ? (
                                    <p className="placeholder-text">Selecciona un día primero</p>
                                ) : (
                                    SCHEDULE_CONFIG.slots.map((slot, idx) => (
                                        <button
                                            key={idx}
                                            className="slot-btn animate-fade-in"
                                            onClick={() => handleSlotSelect(slot)}
                                        >
                                            <span className="slot-time">{slot}</span>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {state.step === 2 && (
                    <div className="booking-form animate-fade-in">
                        <div className="summary-header">
                            <button className="back-btn" onClick={() => setState(prev => ({ ...prev, step: 1 }))}>← Volver</button>
                            <h3>Confirmar Cita</h3>
                            <div className="selected-info">
                                <span>📅 {state.selectedDate && formatDate(state.selectedDate)}</span>
                                <span>⏰ {state.selectedSlot}</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="form-fields">
                            <div className="form-group">
                                <label>Nombre Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="dark-input"
                                    value={state.formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Teléfono</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="dark-input"
                                    value={state.formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="dark-input"
                                    value={state.formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="submit-btn">RESERVAR CITA</button>
                        </form>
                    </div>
                )}

                {state.step === 3 && (
                    <div className="booking-success animate-fade-in text-center">
                        <div className="success-icon">✨</div>
                        <h3>¡Cita Pre-Confirmada!</h3>
                        <p>Hemos recibido tu solicitud para el <strong>{state.selectedDate && formatDate(state.selectedDate)}</strong> a las <strong>{state.selectedSlot}</strong>.</p>
                        <p className="note">Recibirás una confirmación por WhatsApp en breve.</p>
                        <button className="reset-btn" onClick={() => setState({ step: 1, selectedDate: null, selectedSlot: null, formData: { name: '', phone: '', email: '' } })}>
                            Volver al Calendario
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                .booking-widget {
                    padding: 4rem 1rem;
                }

                .booking-container {
                    max-width: 900px;
                    margin: 0 auto;
                    background: #111;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    padding: 2rem;
                    min-height: 400px;
                }

                .column-title {
                    font-size: 1rem;
                    color: #d4af37;
                    margin-bottom: 1.5rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                /* Step 1 Grid */
                .booking-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3rem;
                }

                .dates-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                    gap: 0.8rem;
                }

                .date-btn {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid transparent;
                    color: #aaa;
                    padding: 0.8rem;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: capitalize;
                }

                .date-btn:hover {
                    background: rgba(255,255,255,0.1);
                    color: white;
                }

                .date-btn.active {
                    background: #d4af37;
                    color: black;
                    font-weight: bold;
                    border-color: #d4af37;
                }

                .slots-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                }

                .slot-btn {
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid #d4af37;
                    color: #d4af37;
                    padding: 0.8rem;
                    border-radius: 6px;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.2rem;
                    transition: all 0.3s ease;
                }

                .slot-time {
                    font-size: 1.1rem;
                    font-weight: bold;
                }

                .slot-duration {
                    font-size: 0.75rem;
                    color: #aaa;
                    text-transform: uppercase;
                }

                .slot-btn:hover {
                    background: #d4af37;
                    color: black;
                }
                
                .slot-btn:hover .slot-duration {
                    color: rgba(0,0,0,0.6);
                }

                /* Step 2 Form */
                .booking-form {
                    max-width: 500px;
                    margin: 0 auto;
                }

                .summary-header {
                    margin-bottom: 2rem;
                    text-align: center;
                    position: relative;
                }

                .back-btn {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: #666;
                    cursor: pointer;
                }

                .back-btn:hover { color: white; }

                .selected-info {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-top: 0.5rem;
                    color: #d4af37;
                    font-weight: bold;
                }

                .form-fields {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .dark-input {
                    width: 100%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 1rem;
                    color: white;
                    border-radius: 6px;
                    margin-top: 0.5rem;
                }

                .dark-input:focus {
                    border-color: #d4af37;
                    outline: none;
                }

                .submit-btn {
                    background: #d4af37;
                    color: black;
                    border: none;
                    padding: 1.2rem;
                    font-weight: bold;
                    letter-spacing: 2px;
                    cursor: pointer;
                    margin-top: 1rem;
                    transition: transform 0.2s;
                    border-radius: 6px;
                }

                .submit-btn:hover {
                    transform: scale(1.02);
                    background: #e5bd47;
                }

                /* Step 3 Success */
                .success-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                
                .note {
                    color: #666;
                    margin-top: 2rem;
                    font-size: 0.9rem;
                }

                .reset-btn {
                    margin-top: 2rem;
                    background: transparent;
                    border: 1px solid #333;
                    color: #666;
                    padding: 0.8rem 2rem;
                    cursor: pointer;
                    border-radius: 4px;
                }

                .placeholder-text {
                    color: #444;
                    font-style: italic;
                    text-align: center;
                    padding: 2rem 0;
                }

                @media (max-width: 768px) {
                    .booking-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    .booking-container {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default BookingWidget;
