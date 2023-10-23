import './home.css';
import { NavBar } from './NavBar';
import { Banner } from './Banner';
import { Skills } from './Skills';
import { Project } from './Project';
import { Footer } from './Footer';
import { Locations } from './Locations'
import Products from './Products'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
  return (
    <div className="Home">
      <NavBar/>
      <Banner />
      <Skills />
      <Project />
      <Locations />
      <Products />
      <Footer/>
    </div>
  );
}

export default Home;