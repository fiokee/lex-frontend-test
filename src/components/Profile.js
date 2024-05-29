import React, { useContext, useState, useEffect } from 'react';
import './Profile.css';
import './RegisterPage.css';
import useHttpClient from '../shared/context/http_hook';
import { AuthContext } from '../shared/context/auth_context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../shared/context/loading/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [formFields, setFormFields] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    zip: '',
    state: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, sendRequest, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const responseData = await sendRequest('http://localhost:4000/api/users');
        if (responseData && responseData.user) {
          setFormFields(responseData.user);
          console.log('User Info:', responseData.user);
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUserInfo();
  }, [sendRequest]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const updatePlacehandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        'http://localhost:4000/api/users/update',
        'PATCH',
        JSON.stringify(formFields),
        {
          'Content-Type': 'application/json'
        }
      );
      toast.success('Profile Update successful!');
      navigate('/dashboard/history');
      auth.updateUser(formFields);
    } catch (error) {
      console.error('Failed to update user data', error);
    }
  };

  const handlePictureUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    try {
      await sendRequest(
        'http://localhost:4000/api/users/profile-picture',
        'PATCH',
        formData
      );
      toast.success('Profile picture updated successfully!');
    } catch (error) {
      console.error('Failed to upload profile picture', error);
    }
  };

  const changePasswordHandler =()=>{
    navigate('/change-password')
  }
  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="register-container">
      <h1>Hello there <span role="img" aria-label="wave">👋</span></h1>
      <p onClick={changePasswordHandler}>change password</p>
      {!isLoading && (
        <>
          <form className="register-form" onSubmit={updatePlacehandler}>
            <label htmlFor="firstname">Firstname</label>
            <input type="text" id="firstname" name="firstname" value={formFields.firstname} required onChange={handleInputChange} />
            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastname" value={formFields.lastname} required onChange={handleInputChange} />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={formFields.username} required onChange={handleInputChange} />
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={formFields.email} required onChange={handleInputChange} />
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formFields.phone} required onChange={handleInputChange} />
            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" value={formFields.country} onChange={handleInputChange} />
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" value={formFields.city} onChange={handleInputChange} />
            <label htmlFor="zip">Zip</label>
            <input type="text" id="zip" name="zip" value={formFields.zip} onChange={handleInputChange} />
            <label htmlFor="state">State</label>
            <input type="text" id="state" name="state" value={formFields.state} onChange={handleInputChange} />
            <button type="submit" className="register-button">Update</button>
          </form>
          <form className="profile-picture-form" onSubmit={handlePictureUpload}>
            <label htmlFor="profilePicture">Profile Picture</label>
            <input type="file" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleFileChange} required />
            <button type="submit" className="register-button">Upload</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Profile;
