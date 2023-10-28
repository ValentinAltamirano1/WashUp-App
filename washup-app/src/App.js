import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Services from './Components/Services';
import { AboutUs } from './Components/AboutUs';
import { AuthProvider } from './Components/AuthContext';
import Dashboard from './Components/AdminComponents/Dashboard'; 
import Empleados from './Components/AdminComponents/Empleados';
import ServiciosAdmin from './Components/AdminComponents/Servicios';
import ResetPasswordMail from './Components/ResetPasswordMail';
import ResetPassword from './Components/ResetPassword';
import GoogleCallback from './Components/GoogleCallback';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Empleados />} />  
          <Route path="/services/admin" element={<ServiciosAdmin />} />
          <Route path="/reset-password-mail" element={<ResetPasswordMail />} />
          <Route path="/reset-password/:uniqueID" element={<ResetPassword />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
