import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingCart, LogOut } from 'lucide-react';
import useCartStore from '../store/cartStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/Galobalogo.jpeg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const navigate = useNavigate();

  // Check auth status on component mount and storage changes
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem('isAuthenticated') === 'true');
    };

    // Initial check
    checkAuth();

    // Listen for auth changes
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('phoneNumber');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
    navigate('/login');
    setIsOpen(false); // Close mobile menu if open
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Plans', path: '/plans' },
    { name: 'About', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-premium sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
           <motion.img
  src={logo}
  alt="DBOX Logo"
  className="h-11 w-auto"
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
/>

          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="font-inter text-dark-text hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Cart, Auth Buttons and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="text-primary" size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Logout Button - Desktop */}
            {isLoggedIn && (
              <motion.button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Logout"
              >
                <LogOut size={18} className="mr-1" />
                <span>Logout</span>
              </motion.button>
            )}

            {/* Login Button - Desktop */}
            {!isLoggedIn && (
              <Link
                to="/login"
                className="hidden md:block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block py-2 px-4 hover:bg-neutral-bg rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left py-2 px-4 hover:bg-neutral-bg rounded-lg transition-colors flex items-center gap-2 text-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block py-2 px-4 hover:bg-neutral-bg rounded-lg transition-colors text-primary font-medium"
                onClick={() => setIsOpen(false)}
              >
                Login / Sign Up
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
