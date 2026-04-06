import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Smartphone, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [step, setStep] = useState(1); // 1: Phone number, 2: OTP
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    setIsLoading(true);
    // Simulate API call to send OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep(2);
    toast.success('OTP sent to your mobile number');
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      toast.error('Please enter 4-digit OTP');
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    // On successful login
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('phoneNumber', phoneNumber);
    
    // Show success animation
    toast.success('Login successful!', {
      onClose: () => {
        const redirectTo = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirectTo);
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="mb-4 flex items-center text-sm text-blue-100 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" /> Back
            </button>
          )}
          <h1 className="text-2xl font-bold">
            {step === 1 ? 'Welcome to DBOX!' : 'Enter OTP'}
          </h1>
          <p className="text-blue-100 mt-1">
            {step === 1
              ? 'Sign in with your mobile number'
              : `We've sent a verification code to +91 ${phoneNumber}`}
          </p>
        </div>

        <div className="p-6">
          {step === 1 ? (
            <motion.form
              onSubmit={handlePhoneSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Smartphone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Mobile Number"
                  maxLength={10}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              onSubmit={handleOtpSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex justify-between space-x-4 mb-8">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="tel"
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-full h-16 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    maxLength={1}
                    required
                  />
                ))}
              </div>

              <motion.button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Verifying...
                  </>
                ) : (
                  'Verify OTP'
                )}
              </motion.button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp(['', '', '', '']);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Change Number
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
