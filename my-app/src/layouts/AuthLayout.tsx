import React, { createContext, useEffect, useState } from 'react';
import '../assets/css/login_register.css';
import Login from '../components/Authentication/Login';
import Register from '../components/Authentication/Register';

const AuthLayout = () => {
  const [isSignUp, setSignUp] = useState(true);

  return (
    <div className="auth-body">
      <div
        className={`${isSignUp ? '' : 'right-panel-active'} login-container`}
        id="container"
      >
        <Login />
        <Register isSignUp={isSignUp} setSignUp={setSignUp} />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => {
                  setSignUp(!isSignUp);
                }}
                className="ghost"
                id="signIn"
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                onClick={() => {
                  setSignUp(!isSignUp);
                }}
                className="ghost"
                id="signUp"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>
          Created with <i className="fa fa-heart" /> by
          <a target="_blank" href="https://florin-pop.com">
            Florin Pop
          </a>
          - Read how I created this and how you can join the challenge
          <a
            target="_blank"
            href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/"
          >
            here
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default AuthLayout;
