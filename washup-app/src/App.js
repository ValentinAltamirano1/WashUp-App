import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Services from './Components/Services';
import { AboutUs } from './Components/AboutUs';
import { AuthProvider } from './Components/AuthContext';
import Dashboard from './Components/AdminComponents/Dashboard'; 
import ResetPasswordMail from './Components/ResetPasswordMail';
import ResetPassword from './Components/ResetPassword';
import GoogleCallback from './Components/GoogleCallback';
import Reservations from './Components/Reservations';
import MakeReservation from './Components/MakeReservation';
import CreateEmployee from './Components/AdminComponents/CreateEmployee';
import CreateServices from './Components/AdminComponents/CreateServices';
import EmployeeInterface from './Components/EmployeeInterface';
import AdminDelete from './Components/AdminComponents/AdminDelete';

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
          <Route path="/reset-password-mail" element={<ResetPasswordMail />} />
          <Route path="/reset-password/:uniqueID" element={<ResetPassword />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route path="/employee" element={<CreateEmployee />} />  
          <Route path="/services/admin" element={<CreateServices />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/employeeinterface" element={<EmployeeInterface />} />
          <Route path="/admindelete" element={<AdminDelete />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
