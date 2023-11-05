import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const FailurePage = () => {
    const navigate = useNavigate();

    const volverAlHome = () => {
        navigate('/makereservation');
    };

    return (
        <div style={{ marginTop: '50px' }}>
            <h1 style={{ color: '#2596be', fontSize: '700', fontWeight: 'bold', marginBottom: '15px', textAlign:"center" , textShadow: '0 0 10px rgba(16, 46, 74, 0.5)'}}>Error en el pago</h1>
            <div className="reset-container">
                <p>No hemos podido procesar tu pago. Por favor, inténtalo de nuevo o utiliza otro método de pago.</p>
                <button style={{ marginLeft: '10px' }} onClick={volverAlHome}>Volver a intentar</button>
            </div>
        </div>
    );
};

export default FailurePage;