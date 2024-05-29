import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const login = useCallback((uid, token, username) => {
    console.log('Logging in with username:', username); // Debug log
    setToken(token);
    setUserId(uid);
    setUsername(username);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUsername(null);
  }, []);

  const update = (data) => {
    if (data.username) setUsername(data.username); // Update username if provided
  };

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/history' element={<HistoryPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/change-password' element={<ChangePassword />} />
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
    <AuthContext.Provider 
      value={{ token, isLogedIn: !!token, userId, username, login, logout, update }}
    >
      <Router>
        <main>
          {routes}
        </main>
        <Footer/>
      </Router>
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
