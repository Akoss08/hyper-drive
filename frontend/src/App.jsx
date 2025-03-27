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

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/logout',
          element: <Logout />,
        },
        {
          path: '/cars',
          element: <Cars />,
        },
        {
          path: '/circuits',
          element: <Circuits />,
        },
        {
          path: '/cars/:id',
          element: <Car />,
        },
        {
          path: '/circuits/:id',
          element: <Circuit />,
        },
        {
          path: '/register',
          element: <RegisterAndLogout />,
        },
        {
          path: '/account',
          element: (
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          ),
        },
        {
          path: '/booking',
          element: (
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          ),
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
