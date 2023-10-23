import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const EmployeeDashboard = () => {
  const [employeeName, setEmployeeName] = useState('Eduardo');
  const [reservations, setReservations] = useState([]);
  const [selectedReservations, setSelectedReservations] = useState([]);
  const {logout} = useAuth();

  // Simulación de reservas (esto debería obtenerse desde el back-end)
  const reservationsData = [
    { id: 1, customer: 'Cliente 1', date: '2023-10-30' },
    { id: 2, customer: 'Cliente 2', date: '2023-11-05' },
    { id: 3, customer: 'Cliente 3', date: '2023-11-10' },
  ];

  useEffect(() => {
    // Simulación de carga de reservas desde el back-end
    setReservations(reservationsData);
  }, []);

  const handleReservationSelect = (reservation) => {
    setSelectedReservations((prevSelected) => [...prevSelected, reservation]);
    setReservations((prevReservations) => prevReservations.filter((r) => r.id !== reservation.id));
  };

  return (
    <div className="employee-dashboard-container">
      <header>
        <div className="header-content">
          <h2>{`Hola, ${employeeName}`}</h2>
            <IconButton size="small" onClick={logout} className="logout-button">
                <ExitToAppIcon />
            </IconButton>
        </div>
      </header>
      <main>
        <h3>Reservas Disponibles:</h3>
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              {reservation.customer} - {reservation.date}
              <button onClick={() => handleReservationSelect(reservation)}>Seleccionar</button>
            </li>
          ))}
        </ul>
      </main>
      <aside>
        <div className="aside-content">
          <h3>Tus Reservas Seleccionadas:</h3>
          <ul>
            {selectedReservations.map((reservation) => (
              <li key={reservation.id}>
                {reservation.customer} - {reservation.date}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 WashUp. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default EmployeeDashboard;
