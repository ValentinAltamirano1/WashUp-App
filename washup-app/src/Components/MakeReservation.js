import React, { useState, useEffect } from 'react';
import './Reservations.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Reservations = () => {
  const [servicio, setServicio] = useState('');
  const [fecha, setFecha] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [fechasNoDisponibles, setFechasNoDisponibles] = useState([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);

  const servicios = ['Lavado Exterior', 'Lavado Interior', 'Lavado Completo', 'Lavado de Motor', 'Lavado de Tapicería', 'Encerado', 'Limpieza de Vidrios', 'Desinfección', 'Lavado Express'];
  const horarios = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'];

  const handleServicioChange = (e) => {
    const nuevoServicio = e.target.value;
    setServicio(nuevoServicio);
    setFecha(null);
    setHorarioSeleccionado('');
    // Realiza una solicitud al servidor para obtener las fechas no disponibles para el nuevo servicio
    const fechasNoDisponiblesURL = `http://localhost:4000/fechasdisponibles/${nuevoServicio}`;

    fetch(fechasNoDisponiblesURL)
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parsea la respuesta JSON
        } else {
          console.error('Error al realizar la petición');
          throw new Error('Error en la solicitud');
        }
      })
      .then((data) => {
        setFechasNoDisponibles(data.fechas_no_disponibles);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const cargarHorariosDisponibles = (fechaSeleccionada) => {
    // Realiza una solicitud al servidor para obtener los horarios disponibles
  const horariosDisponiblesURL = `http://localhost:4000/horariosdisponibles/${servicio}/${fechaSeleccionada}`;



    fetch(horariosDisponiblesURL)
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parsea la respuesta JSON
        } else {
          console.error('Error al obtener horarios disponibles');
          throw Error('Error en la solicitud');
        }
      })
      .then((data) => {
        setHorariosDisponibles(data.horarios);
        console.log('Horarios disponibles:', data.horarios);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (fecha) {
      cargarHorariosDisponibles(fecha.toISOString().slice(0, 10));
    }
  }, [fecha, servicio]);

  const backendURL = 'http://localhost:4000/reservations';

  const enviarReserva = () => {
    const reservaData = {
      servicio,
      fecha,
      horario: horarioSeleccionado, // Utilizamos el horario seleccionado
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
    setHorarioSeleccionado(''); // Limpiamos el horario seleccionado
    setUbicacion('');
  };

  const fechasNoDisponiblesFormatted = fechasNoDisponibles ? fechasNoDisponibles.map((fecha) => new Date(fecha)) : [];

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
                onChange={(date) => setFecha(date)}
                dateFormat="P"
                className="select"
                excludeDates={fechasNoDisponiblesFormatted}
              />
            </div>
            {fecha && (
              <div className="form-group">
                <label>Selecciona un horario:</label>
                <select className="select" value={horarioSeleccionado} onChange={(e) => setHorarioSeleccionado(e.target.value)}>
                  <option value="">Selecciona un horario</option>
                  {horariosDisponibles.map((h, index) => (
                    <option key={index} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}
        {horarioSeleccionado && (
          <div className="form-group">
            <label>Especifique una ubicación:</label>
            <input className="input" type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
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

