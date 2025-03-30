import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { useState, useEffect } from 'react';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLogin = () => setIsLoginOpen((cur) => !cur);

  useEffect(() => {
    if (isAuthorized === false && !isLoginOpen) navigate('/');
  }, [isAuthorized, isLoginOpen, navigate]);

  useEffect(() => {
    async function auth() {
      const token = localStorage.getItem(ACCESS_TOKEN);

      try {
        if (!token) {
          setIsAuthorized(false);
          setIsLoginOpen(true);
          return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
          await refreshToken();
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.log(error);
        setIsAuthorized(false);
        setIsLoginOpen(true);
      }
    }

    auth();
  }, []);

  async function refreshToken() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      const res = await api.post('/api/token/refresh/', { refresh: refreshToken });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        setIsLoginOpen(true);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
      setIsLoginOpen(true);
    }
  }

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Login onToggle={toggleLogin} isOpen={isLoginOpen} />;
}

export default ProtectedRoute;
