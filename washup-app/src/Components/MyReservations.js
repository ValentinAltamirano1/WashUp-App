import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import {NavBar} from "./NavBar";

const UserInterface = () => {
  const [reservations, setReservations] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName'); // Obtener el nombre del usuario desde localStorage

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    } else {
      fetchUserReservations();
    }
  }, [token, navigate, userEmail]);

  const fetchUserReservations = async () => {
    try {
      const response = await fetch(`http://localhost:4000/my-reservations/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReservations(data.reservations || []); // Inicializa como un array vacío si no hay datos
      } else {
        console.error('Error al obtener las reservas:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error de red u otro error al obtener las reservas:', error);
    }
  };

  const handleReservationCancel = async (reservation) => {
    try {
      const response = await fetch(`http://localhost:4000/cancel-reservations/${reservation.ID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchUserReservations();
      } else {
        console.error('Error al cancelar la reserva:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error de red u otro error al cancelar la reserva:', error);
    }
  };

  return (
    <div>
      <NavBar/>
      <div className="employee-interface">
      <main className="employee-interface-main">
        <div className="reservations-box">
          <h3 className="box-title">Tus Reservas:</h3>
          <div className="reservation-columns">
            {reservations.map((reservation) => (
              <div key={reservation.ID} className="reservation-box">
                <div className="reservation-attribute">
                  <strong>Fecha:</strong> {reservation.date}
                </div>
                <div className="reservation-attribute">
                  <strong>Hora:</strong> {reservation.time}
                </div>
                <div className="reservation-attribute">
                  <strong>Ubicación:</strong> {reservation.location}
                </div>
                <div className="reservation-attribute">
                  <strong>Servicio:</strong> {reservation.service}
                </div>
                <button className="done-button" onClick={() => handleReservationCancel(reservation)}>
                  Cancelar Reserva
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="employee-interface-footer">
        <p>&copy; 2023 Tu Aplicación. Todos los derechos reservados.</p>
      </footer>
    </div>
    </div>
    
  );
};

export default UserInterface;
