import React, { useState } from 'react';
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
import { MainListItems} from './ListItems';
import Grid from '@mui/material/Grid';
import {  TextField, Button,  FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';

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

export default function Servicios(props) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Define el estado para los campos del formulario
  const [serviceData, setServiceData] = useState({
    serviceType: '',
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData({
      ...serviceData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envía los datos del servicio al servidor o realiza alguna acción necesaria
    console.log('Datos del servicio:', serviceData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
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
              Servicios
            </Typography>
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
      <div className="content" style={{ }}>
        <form onSubmit={handleSubmit}>
        <h1 style={{ color: '#2596be', fontSize: '32px', fontWeight: 'bold', marginBottom: '25px', textAlign: 'center', textShadow: '0 0 10px rgba(16, 46, 74, 0.5' }}>Crear un servicio</h1>
          <div style={{ background: '#e2f5fc', borderRadius: '20px', padding: '60px' }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  name="serviceType"
                  label="Tipo de servicio"
                  value={serviceData.serviceType}
                  onChange={handleInputChange}
                  
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                      <InputLabel htmlFor="precio">Precio</InputLabel>
                      <OutlinedInput
                        id="precio"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Precio"
                      />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  
                  style={{ backgroundColor: '#2596be', width: '100%' }}
                >
                  Crear Servicio
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 50, py: 2, px: 3 }}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          WashUp
        </Link>
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </ThemeProvider>
  );
}

