import React, { useContext, useEffect } from 'react';
import OptionCard from '../OptionCard';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';
import { AuthContext } from '../shared/context/auth_context';
import Footer from './Footer';
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
    { title: "Buy & Sell Giftcards", description: "Btc,Eth,USDT,UDC,TRX,LTC & More", icon: icon3},
    { title: "Buy & Sell Paypal Funds", description: "Btc,Eth,USDT,UDC,TRX,LTC & More", icon: icon4 },
    { title: "Chime Funds", description: "Btc,Eth,USDT,UDC,TRX,LTC & More", icon: icon5},
    { title: "CashApp Funds", description: "Btc,Eth,USDT,UDC,TRX,LTC & More", icon: icon6},
  ];

  const { username, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Log the username to verify it's present in the context
  // useEffect(() => {
  //   console.log('Username from AuthContext:', username);
  // }, [username]);

  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="logo">skalex, {username} <span role="img" aria-label="smiley">😊</span></h1>
        <div className="header-icons">
          <FaBell className="icon" />
          <NavLink to='/profile'><FaUserCircle className="icon" /></NavLink>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
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
      
      {/* <Footer/> */}
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Dashboard;
