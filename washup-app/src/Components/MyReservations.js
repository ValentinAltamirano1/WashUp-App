import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const UserInterface = () => {
  const [userReservations, setUserReservations] = useState([]);
  const { token, logout } = useAuth();

  // Simulación de reservas del usuario (esto debería obtenerse desde el back-end)
  const userReservationsData = [
    { id: 1, date: '2023-11-15', service: 'Servicio 1' },
    { id: 2, date: '2023-11-20', service: 'Servicio 2' },
    { id: 3, date: '2023-11-25', service: 'Servicio 3' },
  ];

  const navigate = useNavigate();

  const userFullname = localStorage.getItem('userFullname');

  useEffect(() => {
    // Simulación de carga de reservas desde el back-end
    setUserReservations(userReservationsData);
  }, []);

  useEffect(() => {
    if (token === null) {
      // El token se ha actualizado a null, por lo que redirige a la página de inicio de sesión
      navigate('/login');
    }
  }, [token]);

  return (
    <div className="user-interface">
      <header className="user-interface-header">
        <h2 className="user-name">Hola, {userFullname}</h2>
        <button onClick={logout} className="user-logout-button">
          Cerrar Sesión
        </button>
      </header>
      <main className="user-interface-main">
        <div className="user-reservations-box">
          <h3>Tus Reservas:</h3>
          <ul>
            {userReservations.map((reservation) => (
              <li key={reservation.id}>
                <div className="reservation-details">
                  <div className="reservation-text">
                    {reservation.service} - {reservation.date}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="user-interface-footer">
        <p>&copy; 2023 WashUp. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default UserInterface;
