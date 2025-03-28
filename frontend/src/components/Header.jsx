import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    setIsAuthenticated(!!token);
  }, []);

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
    <header
      className={`fixed top-0 left-0 transition-transform duration-500 ease-in-out right-0 flex py-3 px-4 sm:px-10 ${!isVisible ? '-translate-y-full' : ''} ${
        !isOpen ? 'backdrop-blur-xs' : 'backdrop-blur-none'
      } min-h-[65px] mr-1 ml-1 tracking-wide z-50 rounded-full duration-300 ${isScrolled ? 'shadow-lg shadow-black/25' : 'shadow-none'}`}
    >
}

export default Header;
