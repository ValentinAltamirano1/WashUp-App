import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const SuccessPage = () => {
    const navigate = useNavigate();


    const volverAlHome = () => {
        navigate('/'); // Redirige al usuario al home
    };

    return (
        <div>
            <h2>Pago realizado con éxito</h2>
            <p>Tu reserva ha sido confirmada.</p>
            <button onClick={{volverAlHome}}>Volver al inicio</button>
        </div>
    );
};

export default SuccessPage;