import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'font-poppins font-semibold rounded-2xl transition-all duration-300 cursor-pointer';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-premium hover:shadow-hover',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-neutral-bg',
    accent: 'bg-accent text-white hover:bg-orange-500 shadow-premium hover:shadow-hover',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
