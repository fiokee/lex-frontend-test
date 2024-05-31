
import React from 'react';
import { FaHome, FaHistory ,FaMoneyBill, FaUser  } from 'react-icons/fa'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import './FooterGray.css'

const FooterGray = () => {
  
    const handleMoneyIconClick = () => {
        toast.warning('Bill payment coming soon!');
      };
    
  return (
    <footer className="footer-gray">
        <NavLink to='/dashboard'>
          <div className="footer-icon"><FaHome/></div>
        </NavLink>
        <NavLink to='/history'>
          <div className="footer-icon"><FaHistory/></div>
        </NavLink>
        <div className="footer-icon" onClick={handleMoneyIconClick}><FaMoneyBill/></div> 
        <NavLink to='/profile'>
          <div className="footer-icon"><FaUser/></div>
        </NavLink>
      </footer>
  )
}

export default FooterGray