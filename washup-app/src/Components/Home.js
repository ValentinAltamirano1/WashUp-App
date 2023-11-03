import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './NavBar';
import { Banner } from './Banner';
import { Skills } from './Skills';
import { Project } from './Project';
import { Footer } from './Footer';
import { Locations } from './Locations';
import './home.css';

const Home = () => {
  return (
    <div className="Home">
      <NavBar />
      <Banner />
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Project />
      </section>
      <section id="locations">
        <Locations />
      </section>
      <Footer />
    </div>
  );
}

export default Home;
