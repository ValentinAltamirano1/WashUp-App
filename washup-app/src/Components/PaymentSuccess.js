import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { enviarReserva } from '../Components/reservationsUtils';

const SuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Recuperar información de la reserva del almacenamiento local
        const reserva = JSON.parse(localStorage.getItem('reservaTemporal'));
        
        if (reserva) {
            enviarReserva(reserva);
            localStorage.removeItem('reservaTemporal');
        }
    }, []);

    const volverAlHome = () => {
        navigate('/');
    };

    return (
        <div style={{ marginTop: '50px' }}>
            <h1 style={{ color: '#2596be', fontSize: '700', fontWeight: 'bold', marginBottom: '15px', textAlign:"center" , textShadow: '0 0 10px rgba(16, 46, 74, 0.5)'}}>Pago realizado con éxito</h1>
            <div className="reset-container">
                <p>Tu reserva ha sido confirmada.</p>
              <button style={{ marginLeft: '10px' }} onClick={volverAlHome}>Volver al inicio</button>
            </div>
        </div>
    );
};

export default SuccessPage;