import { createBrowserRouter, Outlet, RouterProvider, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cars from './pages/Cars';
import Circuits from './pages/Circuits';
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
  const location = useLocation();
  const hideFooterOnRoutes = ['/cars'];

  const shouldHideFooter = hideFooterOnRoutes.includes(location.pathname);
  
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
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
