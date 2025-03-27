import { createBrowserRouter, Outlet, RouterProvider, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './pages/Home';
import Cars from './pages/Cars';
import Car from './pages/Car';
import Circuits from './pages/Circuits';
import Circuit from './pages/Circuit';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Account from './pages/Account';
import Booking from './pages/Booking';

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

  return (
    <>
      <h1 className="text-red-500 bg-amber-200">Hali</h1>
    </>
  );
}

export default App;
