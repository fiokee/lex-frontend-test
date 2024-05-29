import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    const handleMoneyIconClick = () => {
        toast.warning('Bill payment coming soon!');
      };
    
  return (
    <footer className="footer">
        <NavLink to='/dashboard'>
          <div className="footer-icon">🏠</div>
        </NavLink>
        <NavLink to='/history'>
          <div className="footer-icon">🔄</div>
        </NavLink>
        <div className="footer-icon" onClick={handleMoneyIconClick}>💵</div> 
        <NavLink to='/profile'>
          <div className="footer-icon">👤</div>
        </NavLink>
      </footer>
  )
}

export default Footer