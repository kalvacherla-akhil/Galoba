import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Brain, Loader2 } from 'lucide-react';
import { foodImages } from '../data/foodImages';
import { useNavigate } from 'react-router-dom';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Menu images imports
import nonvegbf from '../assets/N.jpeg';
import sprouts from '../assets/Sprout-Salad.jpg';
import eggsalad from '../assets/eggsalad.jpg';
import FruitPrem from '../assets/fruitPremimum.jpg';
import Bshake from '../assets/Banana.jpeg';
import cashew from '../assets/cashew-shake.jpeg';
import ketochicken from '../assets/ketochickenmeal.jpeg';
import ketopanner from '../assets/ketopannermeal.jpeg';
import galobaLogo from '../assets/Galobalogo.jpeg';

gsap.registerPlugin(ScrollTrigger);


const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const popularBgRef = useRef(null);
  const plansBgRef = useRef(null);
  const reviewsBgRef = useRef(null);

  // Menu categories data
  const menuCategories = [
    {
      id: 1,
      name: 'High Protein',
      description: 'Fuel your workouts with protein-packed meals',
      image: nonvegbf, // Non-veg Breakfast image
      items: ['Non-veg Breakfast', 'Veg Breakfast', 'Oats Meal', 'Chicken Dinner']
    },
    {
      id: 2,
      name: 'Salads',
      description: 'Fresh and healthy salad options',
      image: eggsalad, // Egg Salad image
      items: ['Healthy Salad', 'Egg Salad', 'Weight Loss Salad']
    },
    {
      id: 3,
      name: 'Fruit Bowl',
      description: 'Nutritious and delicious fruit combinations',
      image: FruitPrem, // Premium Fruit Bowl image
      items: ['Basic Fruit Bowl', 'Premium Fruit Bowl']
    },
    {
      id: 4,
      name: 'Protein Shakes',
      description: 'Energy-boosting protein shakes',
      image: cashew, // Cashew Milk Shake image
      items: ['Banana Shake', 'Cashew Milk Shake', 'Dates High-Protein Shake']
    },
    {
      id: 5,
      name: 'Keto Meal',
      description: 'Low-carb high-fat keto options',
      image: ketopanner, // Keto Paneer Meal image
      items: ['Keto Chicken', 'Keto Paneer', 'Keto Egg Meal']
    }
  ];

  // Trending menu items data
  const trendingItems = [
    {
      id: 1,
      name: 'Non-veg Breakfast',
      description: 'High protein-packed breakfast to fuel your day',
      image: nonvegbf,
      price: 79,
      category: 'High Protein',
      badge: 'AI Recommended',
      rating: 4.8,
      calories: 420,
      aiScore: 95
    },
    {
      id: 2,
      name: 'Healthy Salad',
      description: 'Fresh sprouts & veggie salad with nutrients',
      image: sprouts,
      price: 45,
      category: 'Salads',
      badge: 'Healthy Choice',
      rating: 4.6,
      calories: 220,
      aiScore: 88
    },
    {
      id: 3,
      name: 'Banana Shake',
      description: 'Energy boosting protein shake with natural sweetness',
      image: Bshake,
      price: 65,
      category: 'Protein Shakes',
      badge: 'AI Popular',
      rating: 4.9,
      calories: 260,
      aiScore: 92
    },
    {
      id: 4,
      name: 'Keto Chicken',
      description: 'Low-carb high-fat keto-friendly chicken meal',
      image: ketochicken,
      price: 89,
      category: 'Keto Meal',
      badge: 'Keto Favorite',
      rating: 4.7,
      calories: 380,
      aiScore: 90
    }
  ];

  // Handle menu category click
  const handleMenuCategoryClick = (categoryName) => {
    navigate('/menu', { state: { category: categoryName } });
  };

  // Handle trending item click
  const handleTrendingItemClick = (item) => {
    navigate('/menu', {
      state: {
        category: item.category,
        selectedItem: item.id
      }
    });
  };

  useEffect(() => {
    const sections = [
      popularBgRef.current,
      plansBgRef.current,
      reviewsBgRef.current,
    ];

    sections.forEach((section) => {
      if (!section) return;

      gsap.fromTo(
        section,
        { y: "-10%" },
        {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  }, []);

  // Auto-rotate orbit images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOrbitRotation((prev) => prev - 60);
      setActiveIndex((prev) => (prev === foodImages.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);




  // Hero section state for orbit rotation
  const [orbitRotation, setOrbitRotation] = useState(0);
  const [orbitRadius, setOrbitRadius] = useState(320);
  const [mainImageSize, setMainImageSize] = useState(384); // w-96 = 24rem = 384px
  const [orbitImageSize, setOrbitImageSize] = useState(112); // w-28 = 7rem = 112px
  const ROTATION_STEP = 60; // degrees per click
  const ORBIT_IMAGE_COUNT = 4;

  // Update orbit dimensions based on screen size
  useEffect(() => {
    const updateOrbitSize = () => {
      const width = window.innerWidth;
      if (width < 640) { // sm breakpoint
        setOrbitRadius(120);
        setMainImageSize(200); // w-48 = 12rem = 192px
        setOrbitImageSize(60); // w-14 = 3.5rem = 56px
      } else if (width < 768) { // md breakpoint
        setOrbitRadius(180);
        setMainImageSize(256); // w-64 = 16rem = 256px
        setOrbitImageSize(80); // w-20 = 5rem = 80px
      } else if (width < 1024) { // lg breakpoint
        setOrbitRadius(240);
        setMainImageSize(320); // w-80 = 20rem = 320px
        setOrbitImageSize(96); // w-24 = 6rem = 96px
      } else {
        setOrbitRadius(320);
        setMainImageSize(384); // w-96 = 24rem = 384px
        setOrbitImageSize(112); // w-28 = 7rem = 112px
      }
    };

    updateOrbitSize();
    window.addEventListener('resize', updateOrbitSize);
    return () => window.removeEventListener('resize', updateOrbitSize);
  }, []);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Show splash for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Handle orbit rotation
  const handlePreviousFood = () => {
    setOrbitRotation((prev) => prev + ROTATION_STEP);
    setActiveIndex((prev) => (prev === 0 ? foodImages.length - 1 : prev - 1));
  };

  const handleNextFood = () => {
    setOrbitRotation((prev) => prev - ROTATION_STEP);
    setActiveIndex((prev) => (prev === foodImages.length - 1 ? 0 : prev + 1));
  };

  // Handle AI Diet Planning
  const handleAIDietPlanning = () => {
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      navigate('/menu');
    }, 3000);
  };

  // Calculate orbit image positions using polar coordinates
  const getOrbitImages = () => {
    const images = [];
    for (let i = 0; i < ORBIT_IMAGE_COUNT; i++) {
      const baseAngle = (i * 360) / ORBIT_IMAGE_COUNT;
      images.push({
        index: (activeIndex + i) % foodImages.length,
        baseAngle: baseAngle,
        position: i,
      });
    }
    return images;
  };

  const orbitImages = getOrbitImages();
  const currentFood = foodImages[activeIndex];

  // Animation variants
  const mainImageVariants = {
    enter: {
      opacity: 0,
      scale: 0.6,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="bg-neutral-bg">
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center"
          >
            <div className="text-center">
              {/* Animated Logo */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, type: "spring", stiffness: 100 }}
                className="mb-8"
              >
                <div className="relative">
                  {/* Outer rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-green-600 rounded-full"
                  />
                  {/* Inner circle with logo image */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-4 bg-green-600 rounded-full flex items-center justify-center overflow-hidden"
                  >
                    <motion.img
                      src={galobaLogo}
                      alt="Galoba Logo"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  {/* Orbiting sparkles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        rotate: 360,
                        x: Math.cos((i * 60 * Math.PI) / 180) * 80,
                        y: Math.sin((i * 60 * Math.PI) / 180) * 80,
                      }}
                      transition={{
                        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                        x: { duration: 1.5, repeat: Infinity, yoyo: true },
                        y: { duration: 1.5, repeat: Infinity, yoyo: true },
                      }}
                      className="absolute top-1/2 left-1/2 w-3 h-3 bg-yellow-400 rounded-full"
                      style={{ transformOrigin: '0 0' }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Brand Name */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-4"
              >
                Galoba
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-lg sm:text-xl text-gray-600 mb-8"
              >
                Smart Diet. Perfect Meals.
              </motion.p>

              {/* AI Loading Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex items-center justify-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full"
                />
                <span className="text-green-600 font-medium">AI is analyzing your preferences...</span>
              </motion.div>

              {/* Floating food icons */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: Math.random() * window.innerWidth,
                      y: window.innerHeight + 100,
                      rotate: Math.random() * 360
                    }}
                    animate={{
                      y: -100,
                      rotate: Math.random() * 720,
                      x: Math.random() * window.innerWidth
                    }}
                    transition={{
                      duration: 8 + Math.random() * 4,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "linear"
                    }}
                    className="absolute text-2xl opacity-20"
                  >
                    {['🥗', '🍗', '🥑', '🍳', '🥦', '🍓', '🥜', '🍎'][i]}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Diet Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm mx-4 text-center shadow-2xl"
            >
              {/* AI Brain Animation */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Brain className="w-10 h-10 text-white" />
              </motion.div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">AI Diet Planner</h3>
              <p className="text-gray-600 mb-6">Creating your personalized meal plan...</p>

              {/* Progress Steps */}
              <div className="space-y-3 mb-6">
                {['Analyzing nutrition data', 'Matching dietary preferences', 'Optimizing meal combinations'].map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.3 }}
                    className="flex items-center gap-3 text-sm text-gray-600"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: index * 0.3 }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                    {step}
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 text-green-600 animate-spin" />
                <span className="text-green-600 font-medium">Almost ready...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Hero Section with Orbit Layout */}
      <section className="relative min-h-screen bg-white overflow-hidden pt-20">
        {/* SVG Background with curved green shape */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          style={{ zIndex: 0 }}
        >
          {/* Left white area */}
          <rect width="720" height="900" fill="white" />
          {/* Right green curved area */}
          <path
            d="M 650 0 Q 850 450 650 900 L 1440 900 L 1440 0 Z"
            fill="#dcfce7"
          />
          {/* Curved divider accent */}
          <path
            d="M 650 0 Q 850 450 650 900"
            stroke="#bbf7d0"
            strokeWidth="3"
            fill="none"
          />
        </svg>

        {/* Main Content Container */}
        <div className="relative z-10 px-4 sm:px-6 pb-12 h-[calc(100vh-80px)]">
          <div className="max-w-7xl mx-auto h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
              {/* Left Content Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="flex flex-col justify-center"
              >
                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-2 leading-tight"
                >
                  Delicious
                </motion.h1>

                {/* Subheading */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-600 mb-8"
                >
                  Kill the Hunger
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-lg"
                >
                  Experience premium quality meals crafted with fresh ingredients and delivered straight to your door. Satisfy your cravings with our delicious food selections.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="w-fit"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAIDietPlanning}
                    className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-green-600 text-white font-bold rounded-full text-base sm:text-lg hover:bg-green-700 transition-colors shadow-lg flex items-center gap-2"
                  >
                    <Brain className="w-5 h-5" />
                    Start AI Diet Plan
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Right Orbit Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="relative h-full flex items-center justify-center"
              >

                {/* Orbit Container with Rotating Images */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ zIndex: 2 }}
                  animate={{ rotate: orbitRotation }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                  {/* Orbit Images positioned using polar coordinates */}
                  <AnimatePresence>
                    {orbitImages.map((item) => {
                      const angleRad = (item.baseAngle * Math.PI) / 180;
                      const x = Math.cos(angleRad) * orbitRadius;
                      const y = Math.sin(angleRad) * orbitRadius;

                      return (
                        <motion.div
                          key={`orbit-${item.position}`}
                          className="absolute"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${-orbitRotation}deg)`,
                          }}
                        >
                          {/* Circular Image Container */}
                          <div 
                            className="rounded-full overflow-hidden border-3 border-white shadow-xl bg-white"
                            style={{
                              width: `${orbitImageSize}px`,
                              height: `${orbitImageSize}px`
                            }}
                          >
                            <img
                              src={foodImages[item.index].image}
                              alt={foodImages[item.index].name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>

                {/* Center Main Food Image */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 3 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      variants={mainImageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      {/* Main Circular Container */}
                      <div 
                        className="rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white"
                        style={{
                          width: `${mainImageSize}px`,
                          height: `${mainImageSize}px`
                        }}
                      >
                        <motion.img
                          src={currentFood.image}
                          alt={currentFood.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.03 }}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Arrow Navigation Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 sm:gap-6 z-20"
                >
                  {/* Up Arrow - Counter-clockwise */}
                  <motion.button
                    onClick={handlePreviousFood}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 sm:p-3 md:p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
                    aria-label="Previous food item"
                  >
                    <ChevronUp size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  </motion.button>

                  {/* Down Arrow - Clockwise */}
                  <motion.button
                    onClick={handleNextFood}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 sm:p-3 md:p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
                    aria-label="Next food item"
                  >
                    <ChevronDown size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  </motion.button>
                </motion.div>

                {/* Food Name Display */}
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-12 sm:bottom-16 left-1/2 transform -translate-x-1/2 text-center z-20 px-4"
                >
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{currentFood.name}</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-poppins font-bold text-dark-text mb-4">
              Explore Our Menu
            </h2>
            <p className="text-lg text-gray-600">
              Discover delicious and healthy meals tailored to your fitness goals
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {menuCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onClick={() => handleMenuCategoryClick(category.name)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-green-600"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {category.items.length} items
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.h3
                    className="text-xl font-bold text-gray-900 mb-2"
                    whileHover={{ color: "#059669" }}
                    transition={{ duration: 0.2 }}
                  >
                    {category.name}
                  </motion.h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Popular Items */}
                  <div className="space-y-1">
                    {category.items.slice(0, 2).map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        className="flex items-center text-xs text-gray-500"
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.05 * itemIndex }}
                      >
                        <span className="w-1 h-1 bg-green-500 rounded-full mr-2" />
                        {item}
                      </motion.div>
                    ))}
                    {category.items.length > 2 && (
                      <motion.p
                        className="text-xs text-green-600 font-medium mt-2"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        +{category.items.length - 2} more →
                      </motion.p>
                    )}
                  </div>

                  {/* View Button */}
                  <motion.button
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-green-700 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Category
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View Full Menu CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => navigate('/menu')}
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-bold rounded-full text-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Menu
              <motion.svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Trending Items Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              🔥 Trending Now
            </motion.div>
            <h2 className="text-4xl font-poppins font-bold text-dark-text mb-4">
              Most Popular Items
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our customer favorites - these healthy and delicious meals are flying off the menu!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onClick={() => handleTrendingItemClick(item)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                {/* Badge */}
                <motion.div
                  className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 ${
                    item.badge === 'AI Recommended' ? 'bg-gradient-to-r from-purple-500 to-purple-700' :
                    item.badge === 'AI Popular' ? 'bg-gradient-to-r from-blue-500 to-blue-700' :
                    item.badge === 'Healthy Choice' ? 'bg-green-500' :
                    item.badge === 'Keto Favorite' ? 'bg-purple-500' : 'bg-red-500'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {(item.badge === 'AI Recommended' || item.badge === 'AI Popular') && (
                    <Brain className="w-3 h-3" />
                  )}
                  {item.badge}
                </motion.div>

                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Quick Actions */}
                  <motion.div
                    className="absolute bottom-4 right-4 flex gap-2"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.button
                      className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <motion.h3
                        className="text-xl font-bold text-gray-900 mb-1"
                        whileHover={{ color: "#059669" }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.name}
                      </motion.h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <motion.div
                      className="text-right"
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="text-2xl font-bold text-green-600">₹{item.price}</p>
                    </motion.div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <motion.div
                        className="flex"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </motion.div>
                      <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>{item.calories} cal</span>
                    </div>
                  </div>

                  {/* AI Score */}
                  {item.aiScore && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="mb-4 p-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4 text-purple-600" />
                          <span className="text-xs font-medium text-purple-700">AI Score</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.aiScore}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                            />
                          </div>
                          <span className="text-xs font-bold text-purple-700">{item.aiScore}%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Add to Cart Button */}
                  <motion.button
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Items CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => navigate('/menu')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-full text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Menu Items
              <motion.svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.button>
          </motion.div>
        </div>
      </section>



    </div>
  );
};

export default Home;
