import './home.css';
import { NavBar } from './NavBar';
import { Banner } from './Banner';
import { Skills } from './Skills';
import { Project } from './Project';
import { Footer } from './Footer';
import { Locations } from './Locations'
import React from 'react';
import { useAuth } from './AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="Home">
      <NavBar isAuthenticated={isAuthenticated}/>
      <Banner />
      <Skills />
      <Project />
      <Locations />
      <Footer/>
    </div>
  );
}

export default Home;