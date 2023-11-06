import Typography from '@mui/material/Typography';
import Title from './Title';
import React, { useEffect, useState } from 'react';

export default function Deposits() {
  const [totalByYear, setTotalByYear] = useState(null);
  const [totalByMonth, setTotalByMonth] = useState(null);

  useEffect(() => {
    fetchYearProfit();
    fetchMonthProfit();
  }, []);

  const fetchMonthProfit = async () => {
    try {
      const month0 = new Date().getMonth() + 1;
      const month= month0.toString();
      const year0 = new Date().getFullYear();
      const year= year0.toString();
      const response = await fetch(`http://localhost:4000/reservations/profit/${year}/${month}`, {
        method: 'GET',
        /* headers: {
          'Authorization': `Bearer ${token}` // Include the token for authentication if needed
        },*/
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTotalByMonth(data);
      } else {
        console.error('Failed to fetch reservations data');
      }
    } catch (error) {
      console.error('Error fetching reservations data:', error);
    }
  };

  const fetchYearProfit = async () => {
    try {
      const year0 = new Date().getFullYear();
      const year= year0.toString();
      const response = await fetch(`http://localhost:4000/reservations/profit/${year}`, {
        method: 'GET',
        /*headers: {
          'Authorization': `Bearer ${token}`,
        },*/
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTotalByYear(data);
      } else {
        console.error('Failed to fetch assigned reservations');
      }
    } catch (error) {
      console.error('Error fetching assigned reservations:', error);
    }
  };
  return (
    <React.Fragment>
      <Title>Depósitos recientes</Title>
      {totalByYear !== null && (
        <Typography component="p" variant="h6">
          Total por año: ${totalByYear && totalByYear.profit}
        </Typography>
      )}
      {totalByMonth !== null && (
        <div style={{ marginTop: "16px" }}>
          <Typography component="p" variant="h6">
            Total por mes: ${totalByMonth && totalByMonth.profit}
          </Typography>
        </div>
      )}
    </React.Fragment>
  );
}

