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


function EmployeeRegistrationForm () {

    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
      setOpen(!open);
    };
  
    const [errorMessage, setErrorMessage] = useState('');
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '', 
        email: '',
        password: '',
        mobile: '',
        birthDate: '',
        gender: '',
        department: '', 
        adress: '',
        credentialID: '',
    });

    const [fieldErrors, setFieldErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        credentialID: '',
        mobile: '',
        birthDate: '',
        gender: '',
        department: '',
        adress: '',
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
          fullName: '',
          email: '',
          password: '',
          credentialID: '',
          mobile: '',
          birthDate: '',
          gender: '',
          department: '',
          adress: '',
        });
    
        setErrors({});
    };

    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const validateField = (name, value) => {
        switch (name) {
            case 'fullName':
                return value ? '' : 'Este campo es obligatorio.';
            case 'email':
                return validateEmail(value) ? '' : 'El correo no es válido.';
            case 'password':
                return value ? '' : 'Este campo es obligatorio.';
            case 'credentialID':
                return value ? '' : 'Este campo es obligatorio.';
            case 'mobile':
                return value ? '' : 'Este campo es obligatorio.';
            case 'birthDate':
                return value ? '' : 'Este campo es obligatorio.';
            case 'gender':
                return value ? '' : 'Este campo es obligatorio.';
            case 'department':
                return value ? '' : 'Este campo es obligatorio.';
            case 'adress':
                return value ? '' : 'Este campo es obligatorio.';
          default:
            return '';
        }
      };

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

    const newFieldErrors = { ...fieldErrors };

    for (const key in formData) {
      const error = validateField(key, formData[key]);
      newFieldErrors[key] = error;
    }

    setFieldErrors(newFieldErrors);

    // Verificar si hay algún mensaje de error en los campos
    const hasErrors = Object.values(newFieldErrors).some((error) => error);

    if (hasErrors) {
      return;
    }
        
        // Obtener los valores más recientes de los campos
        const usernameValue = formData.fullName; 
        const credentialidValue = formData.credentialid;
        const emailValue = formData.email;
        const passwordValue = formData.password;
        const mobileValue = formData.mobile;
        const birthdateValue = formData.birthdate;
        const genderValue = formData.gender;
        const departmentValue = formData.department;
        const addressValue = formData.adress;
    
        // Para probar que los datos se estén pasando correctamente
        console.log('Username:', usernameValue);
        console.log('Email:', emailValue);
        console.log('Password:', passwordValue);
    
        // Restablecer el mensaje de error en caso de éxito
        // setErrorMessage('');
    
        try {
        const response = await fetch('http://localhost:4000/employee', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            fullName: usernameValue,
            credentialID: credentialidValue, // Asegúrate de definir credentialidValue
            email: emailValue,
            password: passwordValue,
            mobile: mobileValue,
            birthDate: birthdateValue,
            gender: genderValue,
            department: departmentValue,
            adress: addressValue,
            
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
          <h1 style={{ color: '#2596be', fontWeight: 'bold', textAlign: 'center', textShadow: '0 0 10px rgba(16, 46, 74, 0.5)' }}>Registro de empleados</h1>
          <form action="#" className="employee-form">
            <div className="employee-input-box">
              <label>Nombre completo</label>
              <input type="text" name="fullName" placeholder="Ingresar nombre completo" required value={formData.fullName} onChange={handleInputChange} />
              {fieldErrors.fullName && <div className="error-message">{fieldErrors.fullName}</div>}
            </div>
            <div className="employee-input-box">
              <label>Email</label>
              <input type="text" name="email" placeholder="Ingresar Email" required value={formData.email} onChange={handleInputChange} />
              {fieldErrors.email && <div className="error-message">{fieldErrors.email}</div>}
            </div>
            <div className="employee-input-box">
              <label>Contraseña</label>
              <input type="password" name="password" placeholder="Ingresar Contraseña" required value={formData.password} onChange={handleInputChange} />
              {fieldErrors.password && <div className="error-message">{fieldErrors.password}</div>}
            </div>
            <div className="employee-input-box">
              <label>Cedula de Identidad</label>
              <input type="text" name="credentialID" placeholder="Ingresar CI" required value={formData.credentialID} onChange={handleInputChange} />
              {fieldErrors.credentialID && <div className="error-message">{fieldErrors.credentialID}</div>}
            </div>
            <div className="employee-column">
              <div className="employee-input-box">
                <label>Celular</label>
                <input type="number" name="mobile" placeholder="Ingresar celular" required value={formData.mobile} onChange={handleInputChange} />
                {fieldErrors.mobile && <div className="error-message">{fieldErrors.mobile}</div>}
              </div>
              <div className="employee-input-box">
                <label>Fecha de nacimiento</label>
                <input type="date" name="birthDate" placeholder="Enter birth date" required value={formData.birthDate} onChange={handleInputChange} />
                {fieldErrors.birthDate && <div className="error-message">{fieldErrors.birthDate}</div>}
              </div>
            </div>
            <div className="employee-gender-box">
              <h3 style={{ textAlign: 'left' }}>Genero</h3>
              <div className="employee-gender-option">
                <div className="employee-gender">
                  <input type="radio" id="check-male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleInputChange} />
                  <label htmlFor="check-male">Hombre</label>
                </div>
                <div className="employee-gender">
                  <input type="radio" id="check-female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleInputChange} />
                  <label htmlFor="check-female">Mujer</label>
                </div>
                <div className="employee-gender">
                  <input type="radio" id="check-other" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleInputChange} />
                  <label htmlFor="check-other">Otro</label>
                </div>
              </div>
              {fieldErrors.gender && <div className="error-message">{fieldErrors.gender}</div>}
            </div>
            <div className="employee-input-box employee-address">
              <div className="employee-select-box">
                <select name="department" value={formData.department} onChange={handleSelectChange}>
                  <option hidden>Departamento</option>
                  <option>Montevideo</option>
                        <option>Artigas</option>
                        <option>Canelones</option>
                        <option>Cerro Largo</option>
                        <option>Colonia</option>
                        <option>Durazno</option>
                        <option>Flores</option>
                        <option>Florida</option>
                        <option>Lavalleja</option>
                        <option>Maldonado</option>
                        <option>Rio Negro</option>
                        <option>Rivera</option>
                        <option>Rocha</option>
                        <option>Salto</option>
                        <option>San Jose</option>
                        <option>Soriano</option>
                        <option>Tacuarembo</option>
                        <option>Treinta y Tres</option>
                </select>
              </div>
              {fieldErrors.department && <div className="error-message">{fieldErrors.department}</div>}
              <input type="text" name="adress" placeholder="Ingresar direccion de residencia" required value={formData.adress} onChange={handleInputChange} />
              {fieldErrors.adress && <div className="error-message">{fieldErrors.adress}</div>}
            </div>
            <button onClick={handleSubmit}>Enviar</button>
          </form>
        </section>
      </div>
    );
  }

export default EmployeeRegistrationForm;


