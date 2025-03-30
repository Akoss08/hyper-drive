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

}

export default Login;
