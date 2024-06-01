// src/App.js
import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './components/Auth';
import RegisterPage from './components/RegisterPage';
import HistoryPage from './components/HistoryPage';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import { AuthContext } from './shared/context/auth_context';
import Footer from './components/Footer';
import TwoFactorAuth from './components/TwofactorAuth';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [firstname, setFirstName] = useState(null);
  const [lastname, setLastName] =useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const login = useCallback((uid, token, username, firstname, lastname, profilePicture) => {
    setToken(token);
    setUserId(uid);
    setUsername(username);
    setFirstName(firstname);
    setLastName(lastname);
    setProfilePicture(profilePicture);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    setFirstName(null);
    setLastName(null);
    setProfilePicture(null);
  }, []);

  const update = useCallback((data) => {
    if (data.username) setUsername(data.username);
    if(data.firstname) setFirstName(data.firstname);
    if(data.lastname) setLastName(data.lastname);
    if (data.profilePicture) setProfilePicture(data.profilePicture);
  }, []);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/history' element={<HistoryPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/2fa' element={<TwoFactorAuth />} />
        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<Navigate to='/auth' />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{ token, isLogedIn: !!token, userId, username, firstname, lastname, profilePicture, login, logout, update }}>
      <Router>
        <main>
          {routes}
        </main>
        {/* <ConditionalFooter /> */}
      </Router>
      <ToastContainer />
    </AuthContext.Provider>
  );
}

// Not to render Footer in auth and register components
const ConditionalFooter = () => {
  const location = useLocation();
  return location.pathname !== '/auth' && location.pathname !== '/register' ? <Footer /> : null;
};

export default App;
