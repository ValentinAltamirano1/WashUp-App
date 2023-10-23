import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Services from './Components/Services';
import { AboutUs } from './Components/AboutUs';
import { AuthProvider } from './Components/AuthContext';
import Dashboard from './Components/AdminComponents/Dashboard'; 
import ResetPassword from './Components/ResetPassword';


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
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
