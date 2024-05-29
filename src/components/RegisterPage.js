// RegisterPage.js
import React, { useContext, useState } from 'react';
import './RegisterPage.css';
import useHttpClient from '../shared/context/http_hook';
import { AuthContext } from '../shared/context/auth_context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaddingSpinner from '../shared/context/loading/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import BrandLogo from '../assets/logo (1).png'

const RegisterPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const defaultForm = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmedPassword: ''
  };

  const [formFields, setFormFields] = useState(defaultForm);
  const { username, firstname, lastname, email, phone, password, confirmedPassword } = formFields;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        'http://localhost:4000/api/users/signup',
        'POST',
        JSON.stringify({
          username,
          firstname,
          lastname,
          email,
          phone,
          password,
          confirmedPassword
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token // token to allow us update a place
        }
      );
      auth.login(responseData.userId, responseData.token)
      toast.success('Registration successful!');
      navigate('/auth')
      console.log(responseData);
    } catch (err) {
      toast.error(err.message || 'Something went wrong!');
    }
  };

  const changePassword = ()=>{
    navigate('/auth');
  }

  return (
    <div className="register-container">
      {isLoading && <LoaddingSpinner asOverlay/>}
      <header className="login-header">
        <img src ={BrandLogo} alt="J2 Trader Logo" className="logo" />
      </header>
      <h1>Hello there <span role="img" aria-label="clap">👏</span></h1>
      <form className="register-form" onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required onChange={handleInputChange} value={username} />

        <label htmlFor="firstname">Firstname</label>
        <input type="text" id="firstname" name="firstname" required onChange={handleInputChange} value={firstname} />

        <label htmlFor="lastname">Last Name</label>
        <input type="text" id="lastname" name="lastname" required onChange={handleInputChange} value={lastname} />

        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone" required onChange={handleInputChange} value={phone} />

        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required onChange={handleInputChange} value={email} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required onChange={handleInputChange} value={password} />

        <label htmlFor="confirmedPassword">Confirm Password</label>
        <input type="password" id="confirmedPassword" name="confirmedPassword" required onChange={handleInputChange} value={confirmedPassword} />

        <div className="checkbox-container">
          <div className='chek'>

          <input type="checkbox" id="agree" name="agree" required />
          </div>
          <label htmlFor="agree">I agree to the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy policy</a></label>
        </div>

        <button type="submit" className="register-button">Register</button>
        <p className='forget' onClick={changePassword}>Forgot your password?</p>
      </form>
    </div>
  );
};

export default RegisterPage;
