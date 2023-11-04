import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const UserInterface = () => {
  const [reservations, setReservations] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  // Extraer el userId del token de autenticación almacenado en localStorage
  const userID = localStorage.getItem('userId');

  const fetchUserReservations = async () => {
    try {
      console.log('Realizando solicitud para obtener reservas...');
      const response = await fetch(`/my-reservations/${userID}`, {
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
        // Manejar el error de la solicitud
      }
    } catch (error) {
      console.error('Error de red u otro error:', error);
      // Manejar errores de red u otros
    }
  };

  useEffect(() => {
    if (token === null) {
      // El token se ha actualizado a null, por lo que redirige a la página de inicio de sesión
      navigate('/login');
    } else {
      console.log('Token de autenticación válido. Cargando reservas...');
      // Cargar las reservas del usuario al iniciar la pantalla
      fetchUserReservations();
    }
  }, [token, navigate, userID]);

  const handleReservationCancel = async (reservation) => {
    try {
      // En una aplicación real, deberás enviar una solicitud al backend para cancelar la reserva.
      // Aquí, simplemente simulamos la eliminación de la reserva localmente.
      setReservations((prevReservations) => prevReservations.filter((r) => r.id !== reservation.id));
    } catch (error) {
      console.error('Error al cancelar reserva:', error);
      // Manejar errores de cancelación de reserva
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
