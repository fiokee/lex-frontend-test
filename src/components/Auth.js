import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import useHttpClient from '../shared/context/http_hook';
import { AuthContext } from '../shared/context/auth_context';
import { toast } from 'react-toastify';
import LoadingSpinner from '../shared/context/loading/LoadingSpinner';
import BrandLogo from '../../src/assets/logo.png';

const Auth = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formFields;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        'http://localhost:4000/api/users/login',
        'POST',
        JSON.stringify({
          email,
          password
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token // token to allow us update a place
        }
      );
      auth.login(responseData.userId, responseData.token);
      // console.log(responseData.username)
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Something went wrong!');
    }
  };

  return (
    <div className="login-container">
      {isLoading && <LoadingSpinner asOverlay/>}
      <header className="login-header">
        <img src ={BrandLogo} alt="J2 Trader Logo" className="logo" />
      </header>
      <main className="login-main">
        <h1>Welcome to J2 Trader <span role="img" aria-label="clap">👏</span></h1>
        <p>Login to your account to continue</p>
        <form className="login-form" onSubmit={submitHandler}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleInputChange}
            value={email}
          />
          
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleInputChange}
            value={password}
          />
          
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <Link to="/register">
          <button className="register-button">Register</button>
        </Link>
      </main>
    </div>
  );
};

export default Auth;
