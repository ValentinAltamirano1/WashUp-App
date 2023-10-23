import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const response = await fetch('/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        navigate('/login');

      } else {
        setMessage(data.message || 'Ocurrió un error al solicitar el restablecimiento de contraseña.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ marginTop: '90px' }}>
      <h1 style={{ color: '#2596be', fontSize: '700', fontWeight: 'bold', marginBottom: '15px', textAlign:"center" , textShadow: '0 0 10px rgba(16, 46, 74, 0.5)'}}>Restablecer Contraseña</h1>
      <div className="reset-container">
        <label style={{ marginLeft: '10px', fontSize: '20px', textAlign:'left', color: 'white'}}>Ingrese su correo electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          style={{ borderRadius: '20px', border: '1px solid #2596be',backgroundColor: '#e2f5fc' }}
        />
        <button style={{ marginLeft: '10px' }} onClick={handleResetPassword}>Solicitar</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ResetPassword;
