// src/components/UserDropdown.js
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './UserDropDown.css';

const UserDropdown = ({ onLogout, profilePicture, visible }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSettings = () => {
    navigate('/profile');
  };

  const handle2FA = () => {
    navigate('/2fa');
  };

  if(visible) return null;

  return (
    <div className="user-dropdown">
      {profilePicture ? (
        <img
          src={profilePicture}
          alt="Profile"
          className="profile-picture"
          onClick={toggleDropdown}
        />
      ) : (
      <FaUserCircle className="icon" onClick={toggleDropdown} />
      )}
      {dropdownVisible && (
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={handle2FA}>2FA</div>
          <div className="dropdown-item" onClick={handleSettings}>Settings</div>
          <div className="dropdown-item" onClick={onLogout}>Logout</div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
