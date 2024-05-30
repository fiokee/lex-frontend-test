import React, { useContext, useState, useEffect } from 'react';
import './Profile.css';
import './RegisterPage.css';
import useHttpClient from '../shared/context/http_hook';
import { AuthContext } from '../shared/context/auth_context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../shared/context/loading/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import ProfileImg from '../assets/placeholder.png';

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

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, sendRequest } = useHttpClient();

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

  //updating user info
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
      await sendRequest(
        'http://localhost:4000/api/users/update',
        'PATCH',
        formData
      );
      toast.success('Profile Update successful!');
      navigate('/dashboard/history');
      auth.updateUser(formFields);
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
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="register-container">
      <h3>Profile Setting</h3>
      <p onClick={changePasswordHandler}>Change Password</p>
      <div className='container'>
        <div className='profile-image'>
          <p>Profile Picture</p>
          <img src={ProfileImg} alt='profile-image'/>
          <h1>Choose File</h1>
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
          <label htmlFor="profilePicture">Profile Picture</label>
          <input type="file" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleFileChange} />
          <button type="submit" className="register-button">Update</button>
        </form>
      )}
    </div>
      </div>
  );
};

export default Profile;
