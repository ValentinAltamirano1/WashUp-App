import '../App.css';
import { NavBar } from './NavBar';
import { Banner } from './Banner';
import { Skills } from './Skills';
import { Project } from './Project';
import { Footer } from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';


function Index() {
  return (
    <div className="Index">
      <NavBar/>
      <Banner />
      <Skills />
      <Project />
      <Footer/>
    </div>
  );
}

export default Index;