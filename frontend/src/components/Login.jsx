import { useState } from 'react';
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Checkbox } from '@material-tailwind/react';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from 'react-router-dom';

function Login({ onToggle, isOpen }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/api/token/', { username, password });

      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      window.dispatchEvent(new Event('storage'));

      navigate('/');
      onToggle();
    } catch (error) {
      console.log(error);
      const message = error.response ? error.response.data.detail : 'Something went wrong!';
      alert(message);
    } finally {
      setPassword('');
      setUsername('');
      setLoading(false);
    }
  }
}

export default Login;
