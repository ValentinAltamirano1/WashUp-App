import Typography from '@mui/material/Typography';
import Title from './Title';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Deposits() {
  const [totalByYear, setTotalByYear] = useState(null);
  const [totalByMonth, setTotalByMonth] = useState(null);

  useEffect(() => {
    // Realiza la primera petición GET para obtener la suma de las reservas por año
    axios.get('/ruta/al/endpoint/ano') // Reemplaza '/ruta/al/endpoint/ano' con la URL correcta de tu backend para obtener la suma por año
      .then((response) => {
        setTotalByYear(response.data.totalByYear);
      })
      .catch((error) => {
        console.error('Error al obtener el total por año: ', error);
      });

    // Realiza la segunda petición GET para obtener la suma de las reservas por mes
    axios.get('/ruta/al/endpoint/mes') // Reemplaza '/ruta/al/endpoint/mes' con la URL correcta de tu backend para obtener la suma por mes
      .then((response) => {
        setTotalByMonth(response.data.totalByMonth);
      })
      .catch((error) => {
        console.error('Error al obtener el total por mes: ', error);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>Depósitos recientes</Title>
      {totalByYear !== null && (
        <Typography component="p" variant="h4">
          Total por año: ${totalByYear}
        </Typography>
      )}
      {totalByMonth !== null && (
        <Typography component="p" variant="h4">
          Total por mes: ${totalByMonth}
        </Typography>
      )}
    </React.Fragment>
  );
}

