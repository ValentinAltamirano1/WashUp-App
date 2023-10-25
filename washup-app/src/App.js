import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Services from './Components/Services';
import { AboutUs } from './Components/AboutUs';
import { AuthProvider } from './Components/AuthContext';
import Dashboard from './Components/AdminComponents/Dashboard'; 
import Reservations from './Components/Reservations';
import MakeReservation from './Components/MakeReservation';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/makereservation" element={<MakeReservation />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
