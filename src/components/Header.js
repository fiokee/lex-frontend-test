import React, {useContext} from 'react'
import './Header.css';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserDropdown from './UserDropDown';
import { AuthContext } from '../shared/context/auth_context';

const Header = () => {
    const { username, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
      };
    
  return (
    <div>
        <header className="header-nav">
        <h1 className="logo">skalex, {username} <span role="img" aria-label="smiley">😊</span></h1>
        <div className="header-icons">
          <FaBell className="icon" />
          <UserDropdown onLogout={handleLogout} />
        </div>
      </header>
    </div>
  )
}

export default Header