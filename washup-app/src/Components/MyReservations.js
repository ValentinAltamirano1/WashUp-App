import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const UserInterface = () => {
  const [reservations, setReservations] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  const userEmail = localStorage.getItem('userEmail');
  console.log(userEmail);

  const fetchUserReservations = async () => {
    try {
      console.log('Realizando solicitud para obtener reservas...');
      const response = await fetch(`http://localhost:4000/my-reservations/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Reservas obtenidas:', data.reservations);
        setReservations(data.reservations);
      } else {
        console.log('Error en la solicitud:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error de red u otro error:', error);
    }
  };

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    } else {
      console.log('Token de autenticación válido. Cargando reservas...');
      fetchUserReservations();
    }
  }, [token, navigate, userEmail]);

  const handleReservationCancel = async (reservation) => {
    try {
      console.log(reservation.ID);
      const response = await fetch(`http://localhost:4000/cancel-reservations/${reservation.ID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchUserReservations();
      } else {
        console.log('Error en la solicitud de cancelación:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error de red u otro error al cancelar la reserva:', error);
    }
  };

  return (
    <div className="user-interface">
      <header className="user-interface-header">
        <h2 className="user-name">Hola, {localStorage.getItem('userName')}</h2>
      </header>
      <main className="user-interface-main">
        <div className="user-reservations-box">
          <h3 style={{ color: 'black' }}>Tus Reservas:</h3>
          <ul>
            {reservations.map((reservation) => (
              <li key={reservation.id} style={{ color: 'black' }}>
                <div className="reservation-details">
                  <div className="reservation-text">
                    <div>
                      <span className="info-label">Servicio:</span> {reservation.service}
                    </div>
                    <div>
                      <span className="info-label">Fecha:</span> {reservation.date}
                    </div>
                  </div>
                  <button className="cancel-button" onClick={() => handleReservationCancel(reservation)}>
                    Cancelar Reserva
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="user-interface-footer">
        <p style={{ color: 'black' }}>&copy; 2023 Tu Aplicación. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default UserInterface;
