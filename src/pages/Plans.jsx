import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, Clock, ShoppingCart, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import useCartStore from '../store/cartStore';

const Plans = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [deliverySlot, setDeliverySlot] = useState('');
  const [endDate, setEndDate] = useState(null);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation();
  const addItem = useCartStore((state) => state.addItem);
  
  // Get subscription data from navigation state
  const subscriptionData = location.state || {};
  const { meal, subscriptionType, calculatedPrice } = subscriptionData;

  // Calculate end date when start date is selected
  useEffect(() => {
    if (selectedDate && subscriptionType) {
      const startDate = new Date(selectedDate);
      const daysToAdd = subscriptionType === 'weekly' ? 6 : 25;
      let endDate = new Date(startDate);
      let workingDaysAdded = 0;
      
      while (workingDaysAdded < daysToAdd) {
        endDate.setDate(endDate.getDate() + 1);
        // Skip Sundays
        if (endDate.getDay() !== 0) {
          workingDaysAdded++;
        }
      }
      
      setEndDate(endDate);
    }
  }, [selectedDate, subscriptionType]);
  
  // Generate calendar dates starting from tomorrow
  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Start from tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    // Generate next 30 days from tomorrow
    for (let i = 0; i < 30; i++) {
      const date = new Date(tomorrow);
      date.setDate(tomorrow.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };
  
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    // Disable past dates, today, and Sundays
    return checkDate <= today || date.getDay() === 0;
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedDate) {
      newErrors.date = 'Please select a start date';
    }
    
    if (!deliverySlot) {
      newErrors.delivery = 'Please select a delivery slot';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleAddToCart = () => {
    if (!validateForm()) {
      return;
    }
    
    // Create subscription item
    const subscriptionItem = {
      ...meal,
      subscriptionType,
      startDate: selectedDate,
      endDate: endDate,
      deliverySlot,
      totalPrice: calculatedPrice,
      isSubscription: true
    };
    
    addItem(subscriptionItem);
    navigate('/cart');
  };

  // If no subscription data, redirect to menu
  if (!meal || !subscriptionType) {
    navigate('/menu');
    return null;
  }
  
  const calendarDates = generateCalendarDates();
  const progressSteps = ['Menu', 'Plans', 'Cart'];
  const currentStep = 2;

  return (
    <div className="min-h-screen bg-neutral-bg py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4">
            {progressSteps.map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    index + 1 < currentStep
                      ? 'bg-primary text-white'
                      : index + 1 === currentStep
                      ? 'bg-primary text-white ring-4 ring-primary/20'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1 < currentStep ? <Check size={16} /> : index + 1}
                  </div>
                  <span className={`text-sm font-medium ${
                    index + 1 <= currentStep ? 'text-primary' : 'text-gray-500'
                  }`}>
                    {step}
                  </span>
                </div>
                {index < progressSteps.length - 1 && (
                  <ArrowRight className={`w-4 h-4 ${
                    index + 1 < currentStep ? 'text-primary' : 'text-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-poppins font-bold text-dark-text mb-4">
            Select Subscription Details
          </h1>
          <p className="text-lg text-gray-600">
            Choose your start date and delivery preferences for {meal.name}
          </p>
        </motion.div>

        {/* Selected Meal Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex items-center gap-4">
            <img
              src={meal.image || 'https://via.placeholder.com/100x100?text=Meal'}
              alt={meal.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-poppins font-bold text-dark-text">{meal.name}</h3>
              <p className="text-gray-600">{meal.description}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm font-medium text-primary capitalize">
                  {subscriptionType} Subscription
                </span>
                <span className="text-sm font-bold text-primary">
                  ₹{calculatedPrice}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Calendar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-primary" size={24} />
            <h2 className="text-2xl font-poppins font-bold text-dark-text">
              Select Start Date
            </h2>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {calendarDates.map((date, index) => {
              const isDisabled = isDateDisabled(date);
              const isSelected = selectedDate && date.toDateString() === new Date(selectedDate).toDateString();
              const isSunday = date.getDay() === 0;
              
              return (
                <motion.button
                  key={index}
                  whileHover={!isDisabled && !isSunday ? { scale: 1.05 } : {}}
                  whileTap={!isDisabled && !isSunday ? { scale: 0.95 } : {}}
                  disabled={isDisabled || isSunday}
                  onClick={() => !isDisabled && !isSunday && setSelectedDate(date.toISOString())}
                  className={`
                    relative p-3 rounded-lg text-sm font-medium transition-all
                    ${isDisabled || isSunday
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : isSelected
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white border-2 border-gray-200 hover:border-primary hover:bg-gray-50'
                    }
                  `}
                >
                  {date.getDate()}
                  {isSunday && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </motion.button>
              );
            })}
          </div>
          
          {errors.date && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2"
            >
              {errors.date}
            </motion.p>
          )}
          
          <div className="mt-4 text-sm text-gray-600">
            <p>• Current date and past dates are disabled</p>
            <p>• Sundays are disabled for delivery</p>
            <p>• Subscription starts from next available date</p>
          </div>
        </motion.div>

        {/* End Date Display */}
        {endDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-8"
          >
            <p className="text-green-800 text-center">
              <span className="font-semibold">Subscription Period:</span> {new Date(selectedDate).toLocaleDateString()} - {endDate.toLocaleDateString()}
              <span className="block text-sm mt-1">(Excluding Sundays)</span>
            </p>
          </motion.div>
        )}

        {/* Delivery Slot Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Clock className="text-primary" size={24} />
            <h2 className="text-2xl font-poppins font-bold text-dark-text">
              Select Delivery Slot
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {['morning', 'evening'].map((slot) => (
              <motion.button
                key={slot}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setDeliverySlot(slot)}
                className={`
                  relative p-4 rounded-xl border-2 transition-all
                  ${deliverySlot === slot
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${deliverySlot === slot
                      ? 'border-primary'
                      : 'border-gray-300'
                    }
                  `}>
                    {deliverySlot === slot && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold capitalize text-dark-text">
                      {slot === 'morning' ? 'Morning' : 'Evening'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {slot === 'morning' ? '7:00 AM - 10:00 AM' : '5:00 PM - 8:00 PM'}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          
          {errors.delivery && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-2"
            >
              {errors.delivery}
            </motion.p>
          )}
        </motion.div>

        {/* Add to Cart Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="sticky bottom-0 bg-white border-t border-gray-200 p-6 -mx-6 -mb-6 rounded-t-2xl"
        >
          <Button
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-3 text-lg font-semibold"
            onClick={handleAddToCart}
            disabled={!selectedDate || !deliverySlot}
          >
            <ShoppingCart size={20} className="flex-shrink-0" />
            <span>Add to Cart - ₹{calculatedPrice}</span>
          </Button>
          
          <p className="text-center text-sm text-gray-500 mt-2">
            All selections must be completed to proceed
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Plans;
