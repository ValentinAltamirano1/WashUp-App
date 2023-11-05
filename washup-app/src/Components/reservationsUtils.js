
const backendURL = 'http://localhost:4000/reservations';

export const enviarReserva = (reservaData) => {
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
};