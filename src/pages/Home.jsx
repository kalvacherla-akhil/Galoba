import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronUp, ChevronDown, Zap, Leaf, Clock, Award } from 'lucide-react';
import Button from '../components/Button';
import MealCard from '../components/MealCard';
import PlanCard from '../components/PlanCard';
import ReviewCard from '../components/ReviewCard';
import { getMeals, getPlans, getReviews } from '../api/services';
import { foodImages } from '../data/foodImages';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const Home = () => {
  const [meals, setMeals] = useState([]);
  const [plans, setPlans] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const popularBgRef = useRef(null);
  const plansBgRef = useRef(null);
  const reviewsBgRef = useRef(null);

  // Constants
  const ORBIT_IMAGE_COUNT = 6;
  const ORBIT_RADIUS = 150;
  const ROTATION_STEP = 60;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mealsRes, plansRes, reviewsRes] = await Promise.all([
          getMeals(),
          getPlans(),
          getReviews(),
        ]);
        setMeals(mealsRes.data.slice(0, 6));
        setPlans(plansRes.data);
        setReviews(reviewsRes.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-rotate orbit images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOrbitRotation((prev) => prev - 60);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mealsRes, plansRes, reviewsRes] = await Promise.all([
          getMeals(),
          getPlans(),
          getReviews(),
        ]);
        setMeals(mealsRes.data.slice(0, 6));
        setPlans(plansRes.data);
        setReviews(reviewsRes.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        <div className="relative z-10 px-6 pb-12 h-[calc(100vh-80px)]">
          <div className="max-w-7xl mx-auto h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
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
                  className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-2 leading-tight"
                >
                  Delicious
                </motion.h1>

                {/* Subheading */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-600 mb-8"
                >
                  Kill the Hunger
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg"
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
                    className="px-10 py-4 bg-green-600 text-white font-bold rounded-full text-lg hover:bg-green-700 transition-colors shadow-lg"
                  >
                    Order Now
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
                    {orbitImages.map((item, idx) => {
                      const angleRad = (item.baseAngle * Math.PI) / 180;
                      const x = Math.cos(angleRad) * ORBIT_RADIUS;
                      const y = Math.sin(angleRad) * ORBIT_RADIUS;

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
                          <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-white shadow-xl bg-white">
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
                      <div className="w-96 h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
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
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 z-20"
                >
                  {/* Up Arrow - Counter-clockwise */}
                  <motion.button
                    onClick={handlePreviousFood}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
                    aria-label="Previous food item"
                  >
                    <ChevronUp size={28} />
                  </motion.button>

                  {/* Down Arrow - Clockwise */}
                  <motion.button
                    onClick={handleNextFood}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
                    aria-label="Next food item"
                  >
                    <ChevronDown size={28} />
                  </motion.button>
                </motion.div>

                {/* Food Name Display */}
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center z-20"
                >
                  <p className="text-2xl font-bold text-gray-800">{currentFood.name}</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why DBOX Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-poppins font-bold text-dark-text mb-4">
              Why Choose GALOBA ?
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to reach your fitness goals
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
          >
            {[
              {
                icon: Zap,
                title: 'High Protein',
                description: 'Fuel your body with premium protein sources for muscle growth and recovery.',
              },
              {
                icon: Leaf,
                title: 'Fresh Ingredients',
                description: 'Locally sourced, organic ingredients prepared with love and care.',
              },
              {
                icon: Clock,
                title: 'Quick Delivery',
                description: 'Hot, fresh meals delivered to your doorstep in 30 minutes.',
              },
              {
                icon: Award,
                title: 'Expert Chefs',
                description: 'Prepared by culinary experts who combine nutrition with taste.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-premium hover:shadow-hover transition-all duration-300 text-center"
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="inline-block p-4 bg-neutral-bg rounded-full mb-4"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <feature.icon className="text-primary" size={32} />
                </motion.div>
                <h3 className="font-poppins font-bold text-lg text-dark-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      

    </div>
  );
};

export default Home;
