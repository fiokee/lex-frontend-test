// src/components/Dashboard.js
import React, { useContext } from 'react';
import OptionCard from '../OptionCard';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { AuthContext } from '../shared/context/auth_context';
import Footer from './Footer';
import UserDropdown from './UserDropDown';
import useFetchUserInfo from './useFetchUserIfo';
import icon1 from '../assets/buy_bitcoin.jpeg';
import icon2 from '../assets/sell_crypto.png';
import icon3 from '../assets/logo.png';
import icon4 from '../assets/logo.png';
import icon5 from '../assets/logo.png';
import icon6 from '../assets/logo.png';

const Dashboard = () => {
  const options = [
    { title: "Buy Crypto", description: "Btc,Eth,USDT,UDC,TRX,LTC & More", icon: icon1 },
    { title: "Sell Crypto", description: "Btc,Eth,USDT,UDC,TRX,LTC & More", icon: icon2 },
    { title: "Buy & Sell Giftcards", description: "Btc,Eth,USDT,UDC,TRX,LTC & More", icon: icon3 },
    { title: "Buy & Sell Paypal Funds", description: "Btc,Eth,USDT,UDC,TRX,LTC & More", icon: icon4 },
    { title: "Chime Funds", description: "Btc,Eth,USDT,UDC,TRX,LTC & More", icon: icon5 },
    { title: "CashApp Funds", description: "Btc,Eth,USDT,UDC,TRX,LTC & More", icon: icon6 },
  ];

  const { username, profilePicture, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useFetchUserInfo();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="logo">{username} <span role="img" aria-label="smiley">😊</span></h1>
        <div className="header-icons">
          <FaBell className="icon" />
          <UserDropdown onLogout={handleLogout} profilePicture={profilePicture} />
        </div>
      </header>
      <div className="content">
        <h2 className="title">What would you like to trade today?</h2>
        <div className="options-container">
          {options.map((option, index) => (
            <OptionCard key={index} title={option.title} description={option.description} icon={option.icon} />
          ))}
        </div>
      </div>
      <Footer />
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Dashboard;
