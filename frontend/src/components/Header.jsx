import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';
import Login from './Login';

function Header() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem(ACCESS_TOKEN));
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLogin = () => setIsLoginOpen((cur) => !cur);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      setIsAuthenticated(!!token);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <Login onToggle={toggleLogin} isOpen={isLoginOpen} />
      <header
        className={`fixed top-0 left-0 transition-transform duration-500 ease-in-out right-0 flex py-3 px-4 sm:px-10 ${!isVisible ? '-translate-y-full' : ''} ${
          !isOpen ? 'backdrop-blur-xs' : 'backdrop-blur-none'
        } min-h-[65px] mr-1 ml-1 tracking-wide z-50 rounded-full duration-300 ${isScrolled ? 'shadow-lg shadow-black/25' : 'shadow-none'}`}
      >
        <nav className="flex items-center gap-4 max-w-screen-xl mx-auto w-full">
          <Link to="/" className="max-sm:hidden">
            <img src="../src/assets/logos/Black_Modern_Car_Auto_Services_Logo-removebg-preview.png" alt="logo" className="w-[134px]" />
          </Link>
          <Link to="/" className="hidden max-sm:block">
            <img src="../src/assets/logos/Black_Modern_Car_Auto_Services_Logo__1_-removebg-preview.png" alt="logo" className="w-50" />
          </Link>

          <div
            id="collapseMenu"
            className="max-lg:hidden lg:mx-auto lg:!block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-30 max-lg:before:inset-0 max-lg:before:z-50"
            style={{ display: isOpen ? 'block' : 'none' }}
          >
            <button
              id="toggleClose"
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
              onClick={toggleMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-slate-900" viewBox="0 0 320.591 320.591">
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>

            <ul
              onClick={() => setIsOpen(false)}
              className="transition-all ease-in-out lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50"
            >
              <li className="mb-6 hidden max-lg:block">
                <Link to="/">
                  <img src="../src/assets/logos/Screenshot_2025-03-27_172543-removebg-preview.png" alt="logo" className="w-36" />
                </Link>
              </li>
              {isAuthenticated && isOpen && <li className="max-lg:py-3 max-lg:text-2xl max-lg:px-3 max-lg:mt-5">Username123</li>}
              <li className="max-lg:border-b max-lg:py-3 px-3 hover:scale-125 duration-300">
                <Link to="/" className="font-medium lg:hover:text-neutral-400 lg:text-stone-200 block text-[15px]">
                  Home
                </Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3 hover:scale-125 duration-300">
                <Link to="/cars" className="font-medium lg:hover:text-neutral-400 lg:text-stone-200 block text-[15px]">
                  Cars
                </Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3 hover:scale-125 duration-300">
                <Link to="/circuits" className="font-medium lg:hover:text-neutral-400 lg:text-stone-200 block text-[15px]">
                  Circuits
                </Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3 hover:scale-125 duration-300">
                <Link to="/" className="font-medium lg:hover:text-neutral-400 lg:text-stone-200 block text-[15px]">
                  About
                </Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3 hover:scale-125 duration-300">
                <Link to="/" className="font-medium lg:hover:text-neutral-400 lg:text-stone-200 block text-[15px]">
                  Contact
                </Link>
              </li>
              {isAuthenticated && (
                <>
                  <li className="max-lg:border-b max-lg:py-3 px-3 hover:scale-125 duration-300">
                    <Link to="/account" className="font-medium lg:hover:text-neutral-400 lg:text-stone-200 block text-[15px]">
                      Account
                    </Link>
                  </li>
                  <li className="max-lg:border-b max-lg:py-3 px-3 hover:scale-125 duration-300">
                    <Link to="/booking" className="font-medium lg:hover:text-neutral-400 lg:text-stone-200 block text-[15px]">
                      Booking
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="flex gap-4 lg:ml-0 ml-auto">
            <div
              className={`flex max-w-xs w-full px-4 py-2.5 transition-all cursor-pointer rounded-full bg-gradient-to-b ${
                isAuthenticated ? 'hover:from-yellow-700  max-lg:from-yellow-700 max-lg:to-yellow-950' : 'hover:from-gray-700 max-lg:from-indigo-600 max-lg:to-indigo-950'
              } duration-300 ease-in-out hover:scale-110`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="cursor-pointer fill-stone-200 w-6 h-6">
                <path
                  d={isAuthenticated ? 'M12 4l1.41 1.41L7.83 11H24v2H7.83l5.58 5.59L12 20l-8-8z' : 'M12 4l-1.41 1.41L16.17 11H0v2h16.17l-5.58 5.59L12 20l8-8z'}
                ></path>
              </svg>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    navigate('/logout');
                    setIsAuthenticated(false);
                  }}
                  className="outline-none cursor-pointer pl-3 text-stone-200"
                >
                  Logout
                </button>
              ) : (
                <button onClick={toggleLogin} className="outline-none cursor-pointer pl-3 text-stone-200">
                  Login
                </button>
              )}
            </div>
            <button id="toggleOpen" className="lg:hidden" onClick={toggleMenu}>
              <svg className="w-7 h-7" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
