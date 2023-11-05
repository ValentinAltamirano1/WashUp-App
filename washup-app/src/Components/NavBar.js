import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/img/Logo.png';
import navIcon1 from '../assets/img/nav-icon3.svg';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext';
import { IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const NavBar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const {isAuthenticated,logout} = useAuth();
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <div className='nav-container'>
      <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="#home" className="custom-logo" >
            <img src={logo} alt="logo" style={{ width: '100px' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Inicio</Nav.Link>
              <Nav.Link href="/#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Productos</Nav.Link>
              <Nav.Link href="/#projects" className={activeLink === 'project' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('project')}>Proyectos</Nav.Link>
              <Nav.Link as={Link} to="/about-us" className={`nav-link ${activeLink === 'about-us' ? 'active about-us' : ''}`} onClick={() => onUpdateActiveLink('about-us')}style={{ fontWeight: 400, color: '#2596be', letterSpacing: '0.8px', padding: '0 25px', fontSize: '18px', opacity: 0.75, marginLeft:'-20px' }}>Sobre nosotros</Nav.Link>
              <Nav.Link as={Link} to="/services" className={`nav-link ${activeLink === 'services' ? 'active services' : ''}`} onClick={() => onUpdateActiveLink('services')}style={{ fontWeight: 400, color: '#2596be', letterSpacing: '0.8px', padding: '0 25px', fontSize: '18px', opacity: 0.75 , marginLeft:'-20px' }}>Servicios</Nav.Link>
              <Nav.Link href="/#locations" className={activeLink === 'locations' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('locations')}>Ubicacion</Nav.Link>
              {isAuthenticated && (
                <Nav.Link as={Link} to="/my-reservations" className={`nav-link ${activeLink === 'my-reservations' ? 'active my-reservations' : ''}`} onClick={() => onUpdateActiveLink('my-reservations')}style={{ fontWeight: 400, color: '#2596be', letterSpacing: '0.8px', padding: '0 25px', fontSize: '18px', opacity: 0.75, marginLeft:'-20px' }}>Mis reservas</Nav.Link>
              )}
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="#"><img src={navIcon1} alt="" /></a>
              </div>
              {isAuthenticated ? (
                <div style={{ display: 'flex' }}>
                  <Button variant="contained" className="btn btn-lg vvd-btn connect-button" onClick={() => navigate('/makereservation')}>Reservar</Button>
                  <IconButton size="small" onClick={logout} className="logout-button" style={{ borderRadius: 0 }}>
                    <ExitToAppIcon />
                  </IconButton>
                </div>
              ) : (
                <Button variant="contained" className="btn btn-lg vvd-btn connect-button" style={{ borderRadius: 0 }} onClick={() => navigate('/login')}>Connect</Button>
              )}
              </span>
          </Navbar.Collapse>
        </Container>
     </Navbar>
    </div>
  );
}

