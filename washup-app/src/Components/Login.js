import './login.css';
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleRegisterForm = async () => {
    // Obtener los valores más recientes de los campos
    const usernameValue = username;
    const emailValue = email;
    const passwordValue = password;
  
    console.log('Username:', usernameValue);
    console.log('Email:', emailValue);
    console.log('Password:', passwordValue);
  
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
        // Manejar la respuesta exitosa, por ejemplo, redirigir al usuario
        // o mostrar un mensaje de éxito.
      } else {
        // Manejar la respuesta de error, por ejemplo, mostrar un mensaje de error.
      }
    } catch (error) {
      console.error('Error:', error);
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

const RegisterForm = ({ username, email, password, setUsername, setEmail, setPassword }) => (
  <div className="form-container register-container">
    <link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet"></link>
    <form action="#">
      <h1>Register here</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>Register</button>
      <div className="social-container">
        <a href="#" className="social">
          <i className="lni lni-google"></i>
          <span className="span-link">Register with your account</span>
        </a>
      </div>
    </form>
  </div>
);

const LoginForm = ({ email, password, setEmail, setPassword, handleLogin }) => (
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
      <button onClick={handleLogin}>Login</button>
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
