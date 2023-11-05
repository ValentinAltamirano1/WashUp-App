import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const EmployeeInterface = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservations, setSelectedReservations] = useState([]);
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const employeeFullname = localStorage.getItem('employeeFullname');
  const employeeEmail = localStorage.getItem('employeeEmail');
  const [doneReservations, setDoneReservations] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  console.log(selectedMonth);


  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }
  }, [token]);

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:4000/employee/reservations-without-assignment', {
        method: 'GET',
        /* headers: {
          'Authorization': `Bearer ${token}` // Include the token for authentication if needed
        },*/
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setReservations(data);
        fetchReservations();
      } else {
        console.error('Failed to fetch reservations data');
      }
    } catch (error) {
      console.error('Error fetching reservations data:', error);
    }
  };

  const fetchAssignedReservations = async () => {
    try {
      const response = await fetch(`http://localhost:4000/employee/reservations/assigned/${employeeEmail}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSelectedReservations(data);
      } else {
        console.error('Failed to fetch assigned reservations');
      }
    } catch (error) {
      console.error('Error fetching assigned reservations:', error);
    }
  };

  const handleReservationSelect = async (reservation) => {
    try {
      const data = {
        reservation_id: reservation.ID,
        email: employeeEmail,
      };
      console.log(data);

      const response = await fetch('http://localhost:4000/employee/confirm-reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reservation_id: reservation.ID,
          email: employeeEmail,
        }),
      });

      if (response.ok) {
        console.log('Reservation confirmed successfully');
      } else {
        console.error('Failed to confirm reservation');
      }
    } catch (error) {
      console.error('Error confirming reservation:', error);
    }
    setSelectedReservations((prevSelected) => [...prevSelected, reservation]);

    setReservations((prevReservations) => prevReservations.filter((r) => r.id !== reservation.id));
  };

  useEffect(() => {
    fetchAssignedReservations(); 
    fetchReservations(); 
  }, [employeeEmail, token]);
  
  const fetchDoneReservations = async () => {
    try {
      
      const year = new Date().getFullYear().toString(); 
      console.log(year);
      const doneReservationsResponse = await fetch(`http://localhost:4000/employee/reservations/done/assigned/${employeeEmail}/${year}/${selectedMonth}`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (doneReservationsResponse.ok) {
        const doneReservationsData = await doneReservationsResponse.json();
        
        setDoneReservations(doneReservationsData);
      } else {
        console.error('Failed to fetch done reservations from the backend');
      }
    } catch (error) {
      console.error('Error fetching done reservations:', error);
    }
  };
  
  
  const handleMarkAsDone = async (reservation) => {

    try {
      const response = await fetch('http://localhost:4000/employee/reservation-done', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reservation_id: reservation.ID,
        }),
      });
  
      if (response.ok) {
        setSelectedReservations((prevSelected) => prevSelected.filter((r) => r.id !== reservation.id));
      } else {
        console.error('Failed to fetch assigned reservations');
      }
    
      if (response.ok) {
        
        setSelectedReservations((prevSelected) => prevSelected.filter((r) => r.id !== reservation.id));

      } else {
        console.error('Failed to mark reservation as done in the backend');
      }
    } catch (error) {
      console.error('Error marking reservation as done:', error);
    }
  };
  
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    if (selectedMonth) {
      fetchDoneReservations();
    }
  }, [selectedMonth]);

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
          <h3 className="box-title">Reservas Disponibles:</h3>
          <div className="reservation-columns">
            {reservations.map((reservation, index) => (
              <div key={reservation.id} className="reservation-box">
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
                <button className="confirm-button" onClick={() => handleReservationSelect(reservation)}>
                  Confirmar
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="reservations-box">
          <h3 className="box-title">Tus Reservas Seleccionadas:</h3>
          <div className="reservation-columns">
            {selectedReservations.map((reservation, index) => (
              <div key={reservation.id} className="reservation-box">
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
                <button className="done-button" onClick={() => handleMarkAsDone(reservation)}>
                  Marcar como hecho
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="reservations-box">
          <h3 className="box-title">Servicios realizados en el año:</h3>
          <div className="filter-container">
            <label htmlFor="monthFilter" className="filter-label">Filtrar por mes:</label>
            <select id="monthFilter" name="monthFilter" value={selectedMonth} onChange={handleMonthChange} className="filter-select">
            <option value="">Seleccionar mes</option>
              <option value="01">Enero</option>
              <option value="02">Febrero</option>
              <option value="03">Marzo</option>
              <option value="04">Abril</option>
              <option value="05">Mayo</option>
              <option value="06">Junio</option>
              <option value="07">Julio</option>
              <option value="08">Agosto</option>
              <option value="09">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12" selected>Diciembre</option>
            </select>
          </div>
          <div className="reservation-columns">
            {doneReservations.map((reservation, index) => (
              <div key={reservation.id} className="reservation-box">
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
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="employee-interface-footer">
        <p>&copy; 2023 WashUp. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default EmployeeInterface;
