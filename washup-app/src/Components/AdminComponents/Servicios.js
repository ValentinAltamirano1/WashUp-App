import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
import { MainListItems } from './ListItems';
import Grid from '@mui/material/Grid';
import { FormControl, FormLabel, TextField, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel, Button} from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        WashUp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
 
export const getDepartment = () => ([
    { id: '1', title: 'Montevideo' },
    { id: '2', title: 'Artigas' },
    { id: '3', title: 'Canelones' },
    { id: '4', title: 'Cerro Largo' },
    { id: '5', title: 'Colonia' },
    { id: '6', title: 'Durazno' },
    { id: '7', title: 'Flores' },
    { id: '8', title: 'Florida' },
    { id: '9', title: 'Lavalleja' },
    { id: '10', title: 'Maldonado' },
    { id: '11', title: 'Paysandu' },
    { id: '12', title: 'Rio Negro' },
    { id: '13', title: 'Rivera' },
    { id: '14', title: 'Rocha' },
    { id: '15', title: 'Salto' },
    { id: '16', title: 'San Jose' },
    { id: '17', title: 'Soriano' },
    { id: '18', title: 'Tacuarembo' },
    { id: '19', title: 'Treinta y Tres' },
   
])
 
const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]
 
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
 
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
 
export default function ServiciosAdmin(props) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const navigate = useNavigate();
 
    const initialValues = {
        fullname: '',
        email: '',
        password: '',
        passwordConfirm: '',
        gender: '',
        hireDate: '',
    };
 
    const { addOrEdit, recordForEdit } = props
 
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })
 
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
 
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }
 
    const [values, setValues] = useState({
        fullname: '',
        email: '',
        password: '',
        passwordConfirm: '',
        gender: '',
        hireDate: '',
    });
   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
 
    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])
 
    const [errors, setErrors] = useState({});
 
    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };
 
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{backgroundColor: '#2596be'}}>
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
              Servicios
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
    </ThemeProvider>
    );
}