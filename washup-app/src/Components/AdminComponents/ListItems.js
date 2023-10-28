import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
 
export const MainListItems = () => {
  const navigate = useNavigate();
 
  return (
    <React.Fragment >
      <ListItemButton onClick={() => navigate("/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Panel" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/employee")}   >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Empleados" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/services/admin")}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Servicios" />
      </ListItemButton>
    </React.Fragment>
  );
};

