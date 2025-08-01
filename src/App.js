import { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserManagementPage from './pages/UserManagementPage';
import AudioManagementPage from './pages/AudioManagementPage';

import axios from 'axios';
import Toolbar from './components/Toolbar';

function App() {
  const [status, setStatus] = useState('');
  const isLoggedIn = !!localStorage.getItem('token');

useEffect(() => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/health`)
    .then(res => console.log(res.data.status))
    .catch(err => console.log('error'));
}, []);

  return (
    <Router>
      <Toolbar />

      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/audios" element={<AudioManagementPage />} />
          <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
