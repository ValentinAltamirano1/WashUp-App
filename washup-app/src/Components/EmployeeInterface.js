import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const EmployeeInterface = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservations, setSelectedReservations] = useState([]);
  const {logout} = useAuth();
  

  // Simulación de reservas (esto debería obtenerse desde el back-end)
  const reservationsData = [
    { id: 1, customer: 'Cliente 1', date: '2023-10-30' },
    { id: 2, customer: 'Cliente 2', date: '2023-11-05' },
    { id: 3, customer: 'Cliente 3', date: '2023-11-10' },
  ];

  const employeeFullname = localStorage.getItem('employeeFullname');

  useEffect(() => {
    // Simulación de carga de reservas desde el back-end
    setReservations(reservationsData);
  }, []);

  const handleReservationSelect = (reservation) => {
    setSelectedReservations((prevSelected) => [...prevSelected, reservation]);
    setReservations((prevReservations) => prevReservations.filter((r) => r.id !== reservation.id));
  };

  const handleReservationCancel = (reservation) => {
    setReservations((prevReservations) => [...prevReservations, reservation]);
    setSelectedReservations((prevSelected) =>
      prevSelected.filter((r) => r.id !== reservation.id)
    );
  };
  console.log(logout.EmployeeInterface);

  return (
    <div className="employee-interface">
    <header className="employee-interface-header">
      <h2 className="employee-name">Hola, {employeeFullname}</h2>
      <button onClick={logout} className="employee-logout-button">
          Cerrar Sesión
      </button>
    </header>
    <main className="employee-interface-main">
      <div className="reservations-box">
        <h3>Reservas Disponibles:</h3>
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <div className="reservation-details">
                <div className="reservation-text">
                  {reservation.customer} - {reservation.date}
                </div>
                <button className="confirm-button" onClick={() => handleReservationSelect(reservation)}>
                  Confirmar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="selected-reservations-box">
        <h3>Tus Reservas Seleccionadas:</h3>
        <ul>
          {selectedReservations.map((reservation) => (
            <li key={reservation.id}>
              <div className="reservation-details">
                <div className="reservation-text">
                  {reservation.customer} - {reservation.date}
                </div>
                <button className="cancel-button" onClick={() => handleReservationCancel(reservation)}>
                  Cancelar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
    <footer className="employee-interface-footer">
      <p>&copy; 2023 WashUp. Todos los derechos reservados.</p>
    </footer>
  </div>
  );
};

export default EmployeeInterface;
