import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Flame, Zap, TrendingDown, Calendar } from 'lucide-react';
import Button from './Button';
import useCartStore from '../store/cartStore';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

const MealCard = ({ meal }) => {
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();
  const [purchaseType, setPurchaseType] = useState('oneTime'); // 'oneTime', 'weekly', 'monthly'
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    if (purchaseType === 'oneTime') {
      addItem(meal);
      setShowToast(true);
    } else {
      // Navigate to Plans page with subscription data
      navigate('/plans', {
        state: {
          meal,
          subscriptionType: purchaseType,
          calculatedPrice: subscriptionPlans[purchaseType].totalPrice
        }
      });
    }
  };

  // Subscription pricing logic with discounts
  const basePrice = meal.price;
  const weeklyDays = 6;
  const monthlyDays = 25; // Default to 25 days

  const weeklyDiscount = 0.07; // 7% discount
  const monthlyDiscount = 0.12; // 12% discount

  const weeklyTotal = Math.round(basePrice * weeklyDays * (1 - weeklyDiscount));
  const monthlyTotal = Math.round(basePrice * monthlyDays * (1 - monthlyDiscount));

  const subscriptionPlans = {
    oneTime: {
      label: 'One-time',
      price: basePrice,
      discount: 0,
      mealsInfo: '1 meal',
      buttonText: 'Add to Cart',
      totalPrice: basePrice,
    },
    weekly: {
      label: 'Weekly',
      price: basePrice,
      discount: 7,
      mealsInfo: `${weeklyDays} days/week`,
      buttonText: 'Select Days',
      totalPrice: weeklyTotal,
    },
    monthly: {
      label: 'Monthly',
      price: basePrice,
      discount: 12,
      mealsInfo: `${monthlyDays} days/month`,
      buttonText: 'Select Days',
      totalPrice: monthlyTotal,
    },
  };

  const currentPlan = subscriptionPlans[purchaseType];

  // Nutrition data - Protein, Carbs, Fats only
  const nutritionData = [
    {
      label: 'Protein',
      value: meal.protein,
      unit: 'g',
      color: 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200',
    },
    {
      label: 'Carbs',
      value: meal.carbs,
      unit: 'g',
      color: 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border border-orange-200',
    },
    {
      label: 'Fiber',
      value: meal.fiber || 0,
      unit: 'g',
      color: 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border border-yellow-200',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.12,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -16, transition: { duration: 0.3 } }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100"
    >
      {/* Image Container with Overlay */}
      <motion.div
        className="relative h-48 sm:h-56 md:h-48 lg:h-56 bg-gradient-to-br from-neutral-bg to-gray-100 overflow-hidden group"
        whileHover="hover"
      >
        <motion.img
          src={meal.image || 'https://via.placeholder.com/300x200?text=Meal'}
          alt={meal.name}
          className="w-full h-full object-cover"
          variants={imageVariants}
        />

        {/* Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/10 backdrop-blur-sm"
        />

        {/* Calories Badge */}
        {meal.calories && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Flame size={14} className="flex-shrink-0" />
            <span>{meal.calories}</span>
            <span className="text-xs font-medium">cal</span>
          </motion.div>
        )}

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-dark-text px-3 py-1.5 rounded-full text-xs font-semibold shadow-md border border-white/50"
        >
          {meal.category}
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 md:p-5 lg:p-6 flex flex-col flex-grow">
        {/* Meal Name */}
        <h3 className="font-poppins font-bold text-base sm:text-lg md:text-base lg:text-lg text-dark-text mb-2 line-clamp-2 leading-tight hover:text-primary transition-colors">
          {meal.name}
        </h3>

        {/* Description */}
        {meal.description && (
          <p className="text-gray-600 text-xs sm:text-sm md:text-xs lg:text-sm mb-4 line-clamp-2 leading-relaxed">
            {meal.description}
          </p>
        )}

        {/* Nutrition Badges - Protein, Carbs, Fats */}
        <div className="flex flex-wrap gap-2 mb-5">
          {nutritionData.map((badge, i) => (
            <motion.div
              key={badge.label}
              custom={i}
              variants={badgeVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ scale: 1.08, y: -2 }}
              className={`${badge.color} px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-default`}
            >
              <span className="font-bold">{badge.label}</span>
              <span className="font-bold">{badge.value}</span>
              <span className="text-xs opacity-70">{badge.unit}</span>
            </motion.div>
          ))}
        </div>

        {/* Subscription Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-5 p-2 bg-gray-50 rounded-xl flex gap-1.5"
        >
          {['oneTime', 'weekly', 'monthly'].map((type) => (
            <motion.button
              key={type}
              onClick={() => setPurchaseType(type)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all duration-200 ${purchaseType === type
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              {subscriptionPlans[type].label}
            </motion.button>
          ))}
        </motion.div>

        {/* Price Section with Discount Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-5 mt-auto pt-4 border-t border-gray-100"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl font-poppins font-bold text-primary">
                ₹{currentPlan.totalPrice}
              </span>
            </div>
            <AnimatePresence>
              {currentPlan.discount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-1.5 rounded-lg text-xs font-bold"
                >
                  <TrendingDown size={14} />
                  <span>Save {currentPlan.discount}%</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="text-xs text-gray-500 font-medium">
            {currentPlan.mealsInfo}
          </p>
        </motion.div>

        {/* Subscribe/Add to Cart Button */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full"
        >
          <Button
            variant="primary"
            size="md"
            className="w-full flex items-center justify-center gap-2 text-sm sm:text-base font-semibold"
            onClick={handleAddToCart}
          >
            {purchaseType === 'oneTime' ? (
              <>
                <ShoppingCart size={18} className="flex-shrink-0" />
                <span>Add to Cart</span>
              </>
            ) : (
              <>
                <Calendar size={18} className="flex-shrink-0" />
                <span>{currentPlan.buttonText}</span>
              </>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <Toast
        message="Product added to cart"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
    </motion.div>
  );
};

export default MealCard;
