import React, { useState, useEffect } from 'react';
import './Reservations.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Reservations = () => {
  const [servicio, setServicio] = useState('');
  const [fecha, setFecha] = useState(null);
  const [horario, setHorario] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [fechasNoDisponibles, setFechasNoDisponibles] = useState([]);

  const servicios = ['Lavado Exterior', 'Lavado Interior', 'Lavado Completo', 'Lavado de Motor', 'Lavado de Tapicería', 'Encerado', 'Limpieza de Vidrios', 'Desinfección', 'Lavado Express'];
  const horarios = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'];

  const handleServicioChange = (e) => {
    const nuevoServicio = e.target.value;
    setServicio(nuevoServicio);
    setFecha(null);
    setHorario('');
    // Realiza una solicitud al servidor para obtener las fechas no disponibles para el nuevo servicio
    // URL del servidor para obtener fechas no disponibles (ajusta la URL según tu configuración)
    const fechasNoDisponiblesURL = `http://localhost:4000/fechasdisponibles/${nuevoServicio}`;

    console.log('Haciendo solicitud GET a:', fechasNoDisponiblesURL);

    fetch(fechasNoDisponiblesURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (response.ok) {
          console.log('Petición exitosa');
          return response.json(); // Parsea la respuesta JSON
        } else {
          console.error('Error al realizar la petición');
          // Maneja errores si la solicitud no es exitosa
          throw new Error('Error en la solicitud');
        }
      })
      .then((data) => {
        console.log('Datos de fechas no disponibles:', data.fechas_no_disponibles);
        // Actualiza el estado con las fechas no disponibles
        setFechasNoDisponibles(data.fechas_no_disponibles);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };

  const handleFechaChange = (date) => {
    setFecha(date);
  };

  const handleHorarioChange = (e) => {
    setHorario(e.target.value);
  };

  const handleUbicacionChange = (e) => {
    setUbicacion(e.target.value);
  };

  const backendURL = 'http://localhost:4000/reservations';

  const enviarReserva = () => {
    const reservaData = {
      servicio,
      fecha,
      horario,
      ubicacion,
    };

    fetch(backendURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservaData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Reserva exitosa');
        } else {
          console.error('Error al realizar la reserva');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setServicio('');
    setFecha(null);
    setHorario('');
    setUbicacion('');
  };

  const fechasNoDisponiblesFormatted = fechasNoDisponibles ? fechasNoDisponibles.map((fecha) => new Date(fecha)) : [];
  
  //const arrayDeFechas = ["2023-10-26", "2023-11-15", "2023-12-03"]; // Ejemplo de un array de fechas

  //const fechasNoDisponiblesFormatted = arrayDeFechas.map((fecha) => new Date(fecha));

// Ahora, fechasNoDisponiblesFormatted contendrá un array de objetos Date.



  return (
    <div className="products-container" style={{ marginTop: '40px' }}>
      <h2>Reservar un Servicio</h2>
      <form>
        <div className="form-group">
          <label>Selecciona un servicio:</label>
          <select className="select" value={servicio} onChange={handleServicioChange}>
            <option value="">Selecciona un servicio</option>
            {servicios.map((s, index) => (
              <option key={index} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        {servicio && (
          <>
            <div className="form-group">
              <label>Selecciona una fecha:</label>
              <DatePicker
                selected={fecha}
                onChange={handleFechaChange}
                dateFormat="P"
                className="select"
                excludeDates={fechasNoDisponiblesFormatted} // Bloquea fechas no disponibles
              />
            </div>
            {fecha && (
              <div className="form-group">
                <label>Selecciona un horario:</label>
                <select className="select" value={horario} onChange={handleHorarioChange}>
                  <option value="">Selecciona un horario</option>
                  {horarios.map((h, index) => (
                    <option key={index} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}
        {horario && (
          <div className="form-group">
            <label>Especifique una ubicación:</label>
            <input className="input" type="text" value={ubicacion} onChange={handleUbicacionChange} />
          </div>
        )}
        {ubicacion && (
          <button className="btn-reservar" type="button" onClick={enviarReserva}>
            Pagar
          </button>
        )}
      </form>
    </div>
  );
};

export default Reservations;
