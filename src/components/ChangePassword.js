import React, { Fragment, useContext, useState } from 'react';
import './ChangePassword.css';
import useHttpClient from '../shared/context/http_hook';
import { AuthContext } from '../shared/context/auth_context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../shared/context/loading/LoadingSpinner';
import FooterGray from './FooterGray';
import MainHeader from './MainHeader';


const ChangePassword = () => {
  const [formFields, setFormFields] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const auth = useContext(AuthContext);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const changePasswordHandler = async (event) => {
    event.preventDefault();

    if (formFields.newPassword !== formFields.confirmPassword) {
      toast.error('New password and confirm password do not match!');
      return;
    }

    try {
      await sendRequest(
        `http://localhost:4000/api/users/change-password`, 
        'PATCH',
        JSON.stringify({
          oldPassword: formFields.oldPassword,
          newPassword: formFields.newPassword,
          confirmedPassword: formFields.confirmPassword,
        }),
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}` // Include token in the header
        }
      );
      toast.success('Password updated successfully!');
      setFormFields({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('Failed to update password.');
      console.error('Failed to update password', error);
    }
  };

  return (
    <Fragment>

      <MainHeader/>
    <div className="register-container">
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <form className="register-form" onSubmit={changePasswordHandler}>
          <h1>Change Password</h1>
          <label htmlFor="oldPassword">Old Password</label>
          <input 
            type="password" 
            id="oldPassword" 
            name="oldPassword" 
            value={formFields.oldPassword} 
            onChange={handleInputChange} 
            required 
          />

          <label htmlFor="newPassword">New Password</label>
          <input 
            type="password" 
            id="newPassword" 
            name="newPassword" 
            value={formFields.newPassword} 
            onChange={handleInputChange} 
            required 
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            value={formFields.confirmPassword} 
            onChange={handleInputChange} 
            required 
          />

          <button type="submit" className="register-button">Update</button>
        </form>
      )}
      <FooterGray/>
    </div>
    </Fragment>
  );
};

export default ChangePassword;
