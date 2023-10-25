import React, { useState } from 'react';
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
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

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


function ServiceRegistrationForm () {

    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
      setOpen(!open);
    };
  
    

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '', 
        price: '',
        serviceDescription: '',

    });
      
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
     
    const handleFormReset = () => {
        setFormData({
            name: '',
            price: '',
            serviceDescription: '',

        });
    
        setErrors({});
    };


    const [errors, setErrors] = useState({});
      
    const validate = (fieldValues = formData) => {
        let temp = { ...errors };
    
        if ('name' in fieldValues)
          temp.name = fieldValues.name ? '' : 'This field is required.';

        if ('price' in fieldValues)
        temp.price = fieldValues.price ? '' : 'This field is required.';

        if ('serviceDescription' in fieldValues)
        temp.name = fieldValues.serviceDescription ? '' : 'This field is required.';

        setErrors({
          ...temp,
        });
    
        return Object.values(temp).every((x) => x === '');
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            // Obtener los valores más recientes de los campos
            const nameValue = formData.nombre; 
            const priceValue = formData.price;
            const serviceDescriptionValue = formData.serviceDescription;
        
            // Para probar que los datos se estén pasando correctamente
            console.log('nombre el servicio:', nameValue);
            console.log('precio:', priceValue);

        
            // Restablecer el mensaje de error en caso de éxito
            // setErrorMessage('');
        
            try {
            const response = await fetch('http://localhost:4000/service', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                name: nameValue,
                price: priceValue, 
                serviceDescription: serviceDescriptionValue,

                }),
            });
        
            if (response.ok) {
                // Manejar la respuesta exitosa
                //setShowMessage(true);
            } else {
                // Manejar la respuesta de error, por ejemplo, mostrar un mensaje de error.
            }
            } catch (error) {
            console.error('Error:', error);
            }
        }
        console.log('Datos del formulario:', formData);
        
        handleFormReset(); // Esto restablecerá el formulario después de enviar los datos.
    };

    return (
        <div >
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />
            <AppBar position="absolute" open={open} sx={{ backgroundColor: '#2596be' }}>
            <Toolbar
                sx={{
                pr: '24px', // keep right padding when drawer closed
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
                Empleados
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
            <Drawer variant="permanent" open={open} >
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
          <h1 style={{ color: '#2596be', fontWeight: 'bold', textAlign: 'center', textShadow: '0 0 10px rgba(16, 46, 74, 0.5)' }}>Registro de Servicios</h1>
          <form action="#" className="employee-form">
            <div className="employee-column">
                <div className="employee-input-box">
                <label>Nombre del servicio</label>
                <input type="text" name="name" placeholder="Ingresar nombre del servicio" required value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="employee-input-box">
                <label>Precio</label>
                <TextField
                type="text"
                name="price"
                placeholder='Ingresar precio'
                required
                value={formData.price}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                    />
                </div> 
            </div>
            <div className="employee-input-box">
              <label>Descripcion del servicio</label>
              <input type="text" name="serviceDescription" placeholder="Ingresar descripcion del servicio" required value={formData.serviceDescription} onChange={handleInputChange} />
            </div>
            <button onClick={handleSubmit}>Enviar</button>
          </form>
        </section>
      </div>
    );
  }

export default ServiceRegistrationForm;

