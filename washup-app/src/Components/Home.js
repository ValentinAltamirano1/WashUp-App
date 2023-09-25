import './home.css';
import { NavBar } from './NavBar';
import { Banner } from './Banner';
import { Skills } from './Skills';
import { Project } from './Project';
import { Footer } from './Footer';
import { AboutUs } from './AboutUs'
import { Services } from './Services'
import { Locations } from './Locations'

import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
  return (
    <div className="Home">
      <NavBar/>
      <Banner />
      <Skills />
      <Project />
      <AboutUs />
      <Services />
      <Locations />
      <Footer/>
    </div>
  );
}

export default Home;