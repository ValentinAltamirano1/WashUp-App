import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/img/Logo.png';
import navIcon1 from '../assets/img/nav-icon3.svg';

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
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
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" style={{ width: '100px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="#about-us" className={activeLink === 'about-us' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('about-us')}>About us</Nav.Link>
            <Nav.Link href="#services" className={activeLink === 'services' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('services')}>Servicios</Nav.Link>
            <Nav.Link href="#locations" className={activeLink === 'locations' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('locations')}>Locations</Nav.Link>
            <Nav.Link href="#products" className={activeLink === 'products' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('products')}>Products</Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="#"><img src={navIcon1} alt="" /></a>
            </div>
            <button className="btn btn-lg vvd-btn" onClick={() => console.log('connect')}><span>Connect</span></button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
