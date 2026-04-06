import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

const Toast = ({ message, isVisible, onClose, type = 'success' }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 300, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[300px]"
        >
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${type === 'success' ? 'bg-green-100' : 'bg-red-100'
            }`}>
            {type === 'success' ? (
              <Check size={16} className="text-green-600" />
            ) : (
              <X size={16} className="text-red-600" />
            )}
          </div>
          <p className="text-gray-800 font-medium flex-1">{message}</p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
