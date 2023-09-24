import './login.css';
import React, { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    const registernButton = document.getElementById('register');
    const loginButton = document.getElementById('login');
    const container = document.getElementById('general-container');

    if (registernButton && loginButton && container) {
      registernButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
      });

      loginButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
      });
    }
  }, []);

  const RegisterForm = () => (
    <div className="form-container register-container">
      <form action="#">
        <h1>Register here</h1>
        <input type="username" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Register</button>
        <span>or use your account</span>
        <div className="social-container">
          <a href="#" className="social"><i className="lni lni-google"></i></a>
        </div>
      </form>
    </div>
  );

  const LoginForm = () => (
    <div className="form-container login-container">
      <form action="#">
        <h1>Login here</h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <div className="content">
          <div className="checkbox">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">Remember me</label>
          </div>
          <div className="pass-link">
            <a href="#">Forgot password?</a>
          </div>
        </div>
        <button>Login</button>
        <span>or use your account</span>
        <div className="social-container">
          <a href="#" className="social"><i className="lni lni-google"></i></a>
        </div>
      </form>
    </div>
  );

  const LeftOverlay = () => (
    <div className="overlay-panel overlay-left">
      <h1 className="title">Hello friends</h1>
      <p>If you have an account, login here</p>
      <button className="ghost" id="login">Login</button>
    </div>
  );

  const RightOverlay = () => (
    <div className="overlay-panel overlay-right">
      <h1 className="title">Start your journey</h1>
      <p>If you don't have an account yet, join us and start your journey.</p>
      <button className="ghost" id="register">Register</button>
    </div>
  );

  return (
    <div>
      <h1 className="welcome">Welcome to WashUp</h1>
        <div className="general-container" id="general-container">
          <RegisterForm />
          <LoginForm />
          <div className="overlay-container">
            <div className="overlay">
              <LeftOverlay />
              <RightOverlay />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Login;