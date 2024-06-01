
import React, {useContext} from 'react'
import './MainHeader.css';
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import UserDropdown from './UserDropDown';
import { AuthContext } from '../shared/context/auth_context';
import MainLogo from '../assets/whitelogo.png';

const MainHeader = () => {
    const {firstname, lastname, profilePicture, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
      };
  return (
    <div>
         <header className="header-nav">
        <img src={MainLogo} className="logo"/>
        <div className="header-icon">
          <UserDropdown profilePicture={profilePicture} onLogout={handleLogout} />
          <h1 className='other-name'>{firstname} {lastname} <IoMdArrowDropdown /></h1>
        </div>
      </header>
    </div>
  )
}

export default MainHeader