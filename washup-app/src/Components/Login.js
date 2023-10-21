import './login.css';
import React, { useState,useEffect } from 'react';
import { validateEmail } from './utils'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login} = useAuth();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (showMessage) {
      const timeout = setTimeout(() => {
        setShowMessage(false);
      }, 5000); // 5000 milisegundos (5 segundos)
  
      return () => clearTimeout(timeout);
    }
  }, [showMessage]);

  const handleRegisterForm = async () => {

    // Verificar si los campos obligatorios están vacíos
    if (!username || !email || !password) {
      setErrorMessage('Por favor, complete todos los campos.');
      return;
    }
    
    if (!validateEmail(email)) {
      setErrorMessage('Por favor, ingrese un correo electrónico válido.');
      return;
    }
    // Obtener los valores más recientes de los campos
    const usernameValue = username;
    const emailValue = email;
    const passwordValue = password;
  
    //Para probar que los datos se esten pasando correctamente 
    console.log('Username:', usernameValue);
    console.log('Email:', emailValue);
    console.log('Password:', passwordValue);
  
    // Restablecer el mensaje de error en caso de éxito
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
        }),
      });
  
      if (response.ok) {
        // Manejar la respuesta exitosa
        setShowMessage(true);
      } else {
        // Manejar la respuesta de error, por ejemplo, mostrar un mensaje de error.
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLoginForm = async () => {

    if (!email || !password) {
      setErrorMessage('Por favor, complete todos los campos.');
      return;
    }
    const emailValue = email;
    const passwordValue = password;
  
    console.log('Email:', emailValue);
    console.log('Password:', passwordValue);

    setErrorMessage('');

    if(email.endsWith('@washup.com')){
      try {
        // Realizar una petición a /empleados
        const response = await fetch('http://localhost:4000/employee', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
          }),
        });
        if (response.ok) {
          // Manejar la respuesta exitosa, por ejemplo
          
          const data = await response.json();
          //const token = data.token; // Asume que el token se devuelve desde el backend
      
          //login(token); 
          if (data.email === 'coti@washup.com') {
            navigate('/dashboard');
          } else {
            //login(token);
            navigate('/empleados');
          }
  
        } else {
          // Manejar la respuesta de error, por ejemplo, mostrar un mensaje de error.
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }else{
      try {
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
          }),
        });
    
        if (response.ok) {
          // Manejar la respuesta exitosa, por ejemplo
          
          const data = await response.json();
          //const token = data.token; // Asume que el token se devuelve desde el backend
          //login(token);
          navigate('/');
          

        } else {
          // Manejar la respuesta de error, por ejemplo, mostrar un mensaje de error.
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };


  const handleFormChange = (isLoginForm) => {
    setIsLoginForm(isLoginForm);

    // Reiniciar los campos a blanco cuando se cambia entre formularios
    if (isLoginForm) {
      setUsername('');
      setPassword('');
    } else {
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };
  
  return (
    <div>
      <h1 className="welcome">Welcome to WashUp</h1>
      <div className={`general-container ${isLoginForm ? '' : 'right-panel-active'}`}>
        {isLoginForm ? (
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleLoginForm={handleLoginForm}
            errorMessage={errorMessage} 
          />
        ) : (
          <RegisterForm
            username={username}
            email={email}
            password={password}
            setUsername={setUsername}
            setEmail={setEmail}
            setPassword={setPassword}
            handleRegisterForm={handleRegisterForm}
            errorMessage={errorMessage} 
            showMessage={showMessage}
          />
        )}
        <div className="overlay-container">
          <div className="overlay">
            <LeftOverlay handleFormChange={() => handleFormChange(true)} />
            <RightOverlay handleFormChange={() => handleFormChange(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterForm = ({ username, email, password, setUsername, setEmail, setPassword, handleRegisterForm, errorMessage,showMessage}) => (
  <div className="form-container register-container">
    <link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet"></link>
    <form action="#">
      <h1>Register here</h1>
      {showMessage && (
        <p className="success-message">¡Registro exitoso! Ahora puedes iniciar sesión.</p>
      )}
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar mensaje de error */}
      <button  type="button" onClick={handleRegisterForm}>Register</button>
      <div className="social-container">
        <a href="#" className="social">
          <i className="lni lni-google"></i>
          <span className="span-link">Register with your account</span>
        </a>
      </div>
    </form>
  </div>
);

const LoginForm = ({ email, password, setEmail, setPassword, handleLoginForm, errorMessage}) => (
  <div className="form-container login-container">
    <link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet"></link>
    <form action="#">
      <h1>Login here</h1>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <div className="content">
        <div className="checkbox">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <div className="pass-link">
          <a href="#">Forgot password?</a>
        </div>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar mensaje de error */}
      <button onClick={handleLoginForm}>Login</button>
      <div className="social-container">
        <a href="#" className="social">
          <i className="lni lni-google"></i>
          <span>Login with your account</span>
        </a>
      </div>
    </form>
  </div>
);

const LeftOverlay = ({ handleFormChange }) => (
  <div className="overlay-panel overlay-left">
    <h1 className="title">Hello friends</h1>
    <p>If you have an account, login here</p>
    <button className="ghost" onClick={() => handleFormChange()}>
      Login
    </button>
  </div>
);

const RightOverlay = ({ handleFormChange }) => (
  <div className="overlay-panel overlay-right">
    <h1 className="title">Start your journey</h1>
    <p>If you don't have an account yet, join us and start your journey.</p>
    <button className="ghost" onClick={() => handleFormChange()}>
      Register
    </button>
  </div>
);


export default Login;
