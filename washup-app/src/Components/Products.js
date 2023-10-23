import React, { useState } from 'react';
import './Products.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Products = () => {
  const [servicio, setServicio] = useState('');
  const [fecha, setFecha] = useState(null); // Estado para almacenar la fecha seleccionada
  const [horario, setHorario] = useState(''); // Estado para almacenar el horario seleccionado
  const [ubicacion, setUbicacion] = useState('');

  const servicios = ['Lavado Exterior', 'Lavado Interior', 'Lavado Completo', 'Lavado de Motor', 'Lavado de Tapicería', 'Encerado', 'Limpieza de Vidrios', 'Desinfección','Lavado Express'];
  const horarios = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'];

  const handleServicioChange = (e) => {
    setServicio(e.target.value);
    setFecha(null); // Reinicia la fecha cuando cambia el servicio
    setHorario('');
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

  const enviarReserva = () => {
    console.log('Reserva enviada:', servicio, fecha, horario, ubicacion);
    setServicio('');
    setFecha(null);
    setHorario('');
    setUbicacion('');
  };

  return (
    <div className="products-container">
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
            Reservar
          </button>
        )}
      </form>
    </div>
  );
};

export default Products;
