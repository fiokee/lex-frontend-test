import React, { useContext, useState, useEffect, Fragment } from 'react';
import './Profile.css';
import './RegisterPage.css';
import useHttpClient from '../shared/context/http_hook';
import { AuthContext } from '../shared/context/auth_context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../shared/context/loading/LoadingSpinner';
import { GoShieldLock } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import ProfileImg from '../assets/placeholder.png';
import Footer from './Footer';
import MainHeader from './MainHeader';

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
    state: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(ProfileImg);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const responseData = await sendRequest('http://localhost:4000/api/users');
        if (responseData && responseData.user) {
          setFormFields(responseData.user);
          if (responseData.user.profilePicture) {
            const imageUrl = `http://localhost:4000/${responseData.user.profilePicture.replace(/\\/g, '/')}`;
            setProfilePictureUrl(imageUrl);
          }
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
    const file = event.target.files[0];
    setProfilePicture(file);
    setProfilePictureUrl(URL.createObjectURL(file));
  };

  const updatePlacehandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const key in formFields) {
      formData.append(key, formFields[key]);
    }
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await sendRequest(
        'http://localhost:4000/api/users/update',
        'PATCH',
        formData
      );
      toast.success('Profile Update successful!');
      navigate('/dashboard/history');
      auth.update({
        username: formFields.username,
        profilePicture: `http://localhost:4000/${response.user.profilePicture}`,
      });
    } catch (error) {
      console.error('Failed to update user data', error);
    }
  };

  const changePasswordHandler = () => {
    navigate('/change-password');
  };

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner className='center' />
      </div>
    );
  }

  return (
    <Fragment>
      <MainHeader/>
    <div className="register-container">
      <div className='settings-prof'>
        <h3>Profile Setting</h3>
        <p onClick={changePasswordHandler}><GoShieldLock/>Change Password</p>
      </div>
      <div className='container'>
        <div className='profile-image'>
          <p>Profile Picture</p>
          <img src={profilePictureUrl} alt='profile' />
          <label htmlFor="file-upload" className="custom-file-upload">
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        {!isLoading && (
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
            <div className='coutry-state'>
              <label htmlFor="country">Country</label>
              <input type="text" id="country" name="country" value={formFields.country} onChange={handleInputChange} />
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" value={formFields.city} onChange={handleInputChange} />
            </div>
            <div className='country-item'>
              <label htmlFor="zip">Zip</label>
              <input type="text" id="zip" name="zip" value={formFields.zip} onChange={handleInputChange} />
              <label htmlFor="state">State</label>
              <input type="text" id="state" name="state" value={formFields.state} onChange={handleInputChange} />
            </div>
            <button type="submit" className="register-button">Update</button>
          </form>
        )}
      </div>
      <Footer/>
    </div>
    </Fragment>
  );
};

export default Profile;
