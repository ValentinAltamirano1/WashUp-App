import React, { useEffect } from 'react';

export const Login = () => {

  useEffect(() => {
    const registernButton = document.getElementById('register');
    const loginButton = document.getElementById('login');
    const container = document.getElementById('container');

    registernButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    loginButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });

    // Asegúrate de eliminar los event listeners cuando el componente se desmonte
    return () => {
      registernButton.removeEventListener('click', () => {
        container.classList.add('right-panel-active');
      });

      loginButton.removeEventListener('click', () => {
        container.classList.remove('right-panel-active');
      });
    };
  }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez

  return (
    <div>
      <div className="login" id="login">
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

        <div className="form-container login-container">
          <form action="#">
            <h1>Login here</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <div className="content">
              <div className="checkbox">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
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

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="title">Hello friends</h1>
              <p>If you have an account, login here</p>
              <button className="ghost" id="login">Login</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="title">Start your journey</h1>
              <p>If you don't have an account yet, join us and start your journey.</p>
              <button className="ghost" id="register">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};







