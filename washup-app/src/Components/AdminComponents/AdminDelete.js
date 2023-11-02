import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Empleados.css';
import {
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  Button,
  List,
  Divider,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems } from './ListItems';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { validateEmail } from '../utils';

const defaultTheme = createTheme();

const drawerWidth = 240;
 
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
 
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


function AdminDelete() {
    const [showMessage, setShowMessage] = useState(false);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const toggleDrawer = () => {
      setOpen(!open);
    };
  
    useEffect(() => {
      if (showMessage) {
        const timeout = setTimeout(() => {
          setShowMessage(false);
        }, 2000);
  
        return () => clearTimeout(timeout);
      }
    }, [showMessage]);
  
    const navigate = useNavigate();
  
    // Estados y manejadores de entrada para "Dar de baja empleados"
    const [employeeFormData, setEmployeeFormData] = useState({
      email: '',
    });
  
    const [employeeFieldErrors, setEmployeeFieldErrors] = useState({
      email: '',
    });
  
    const handleEmployeeInputChange = (event) => {
      const { name, value } = event.target;
      setEmployeeFormData({
        ...employeeFormData,
        [name]: value,
      });
    };
  
    const handleEmployeeFormReset = () => {
      setEmployeeFormData({ email: '' });
      setEmployeeFieldErrors({});
    };
  
    const handleEmployeeSubmit = async (e) => {
      e.preventDefault();
      // Validaciones y solicitud al backend para "Dar de baja empleados"
      try {
        const response = await fetch('http://localhost:4000/employee/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: employeeFormData.email,
          }),
        });
  
        if (response.ok) {
          setShowMessage(true);
        } else {
          // Manejar el error
        }
      } catch (error) {
        console.error('Error:', error);
      }
  
      handleEmployeeFormReset();
    };
  
    // Estados y manejadores de entrada para "Dar de baja servicios"
    const [serviceFormData, setServiceFormData] = useState({
      ServiceReferenceID: '',
    });
  
    const [serviceFieldErrors, setServiceFieldErrors] = useState({
      ServiceReferenceID: '',
    });
  
    const handleServiceInputChange = (event) => {
      const { name, value } = event.target;
      setServiceFormData({
        ...serviceFormData,
        [name]: value,
      });
    };
  
    const handleServiceFormReset = () => {
      setServiceFormData({ ServiceReferenceID: '' });
      setServiceFieldErrors({});
    };
  
    const handleServiceSubmit = async (e) => {
      e.preventDefault();
      // Validaciones y solicitud al backend para "Dar de baja servicios"
      try {
        const response = await fetch('http://localhost:4000/service/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ServiceReferenceID: serviceFormData.ServiceReferenceID,
          }),
        });
  
        if (response.ok) {
          setShowMessage(true);
        } else {
          // Manejar el error
        }
      } catch (error) {
        console.error('Error:', error);
      }
  
      handleServiceFormReset();
    };
  
    return (
      <div>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open} sx={{ backgroundColor: '#2596be' }}>
            <Toolbar
              sx={{
                pr: '24px',
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                 Dar de baja empleados y Servicios
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  navigate('/');
                  toggleDrawer();
                }}
              >
                Cerrar sesión
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <MainListItems />
            </List>
          </Drawer>
        </Box>
        <section className="employee-container">
        <h1 style={{ color: '#2596be', fontWeight: 'bold', textAlign: 'center', textShadow: '0 0 10px rgba(16, 46, 74, 0.5)' }}>Dar de baja empleados</h1>
          <form action="#" className="employee-form">
            {showMessage && (
              <p className="success-message">Empleado eliminado exitosamente</p>
            )}
            <div className="employee-input-box">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Ingresar Email"
                required
                value={employeeFormData.email}
                onChange={handleEmployeeInputChange}
              />
              {employeeFieldErrors.email && (
                <div className="error-message">{employeeFieldErrors.email}</div>
              )}
            </div>
            <button onClick={handleEmployeeSubmit}>Enviar</button>
          </form>
        </section>
        <section className="employee-container" style={{ marginTop: 100 }}>
        <h1 style={{ color: '#2596be', fontWeight: 'bold', textAlign: 'center', textShadow: '0 0 10px rgba(16, 46, 74, 0.5)' }}>Dar de baja Servicios</h1>
          <form action="#" className="employee-form">
            {showMessage && (
              <p className="success-message">Servicio eliminado exitosamente</p>
            )}
            <div className="employee-input-box">
              <label>ID de referencia del servicio</label>
              <input
                type="text"
                name="ServiceReferenceID"
                placeholder="Ingresar ID de referencia del servicio"
                required
                value={serviceFormData.ServiceReferenceID}
                onChange={handleServiceInputChange}
              />
              {serviceFieldErrors.ServiceReferenceID && (
                <div className="error-message">
                  {serviceFieldErrors.ServiceReferenceID}
                </div>
              )}
            </div>
            <button onClick={handleServiceSubmit}>Enviar</button>
          </form>
        </section>
      </div>
    );
  }
export default AdminDelete;


