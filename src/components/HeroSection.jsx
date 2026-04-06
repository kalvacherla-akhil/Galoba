import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { foodImages } from '../data/foodImages';

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle navigation to previous food item
  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? foodImages.length - 1 : prev - 1));
  };

  // Handle navigation to next food item
  const handleNext = () => {
    setActiveIndex((prev) => (prev === foodImages.length - 1 ? 0 : prev + 1));
  };

  const currentFood = foodImages[activeIndex];

  // Calculate positions for surrounding images along a circular path
  const getSurroundingImages = () => {
    const images = [];
    // Top left
    images.push({ index: (activeIndex - 2 + foodImages.length) % foodImages.length, angle: -135, distance: 140 });
    // Top
    images.push({ index: (activeIndex - 1 + foodImages.length) % foodImages.length, angle: -90, distance: 140 });
    // Top right
    images.push({ index: (activeIndex + 1) % foodImages.length, angle: -45, distance: 140 });
    // Bottom right
    images.push({ index: (activeIndex + 2) % foodImages.length, angle: 45, distance: 140 });
    return images;
  };

  const surroundingImages = getSurroundingImages();

  // Animation variants for main image
  const mainImageVariants = {
    enter: {
      opacity: 0,
      scale: 0.7,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  };

  // Animation for surrounding images
  const smallImageVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-white overflow-hidden pt-20">
      {/* SVG Background with curved shapes */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        style={{ zIndex: 0 }}
      >
        {/* Left white area */}
        <rect width="720" height="900" fill="white" />
        {/* Right green area with curved divider */}
        <path
          d="M 720 0 Q 800 450 720 900 L 1440 900 L 1440 0 Z"
          fill="#f0fdf4"
        />
        {/* Curved accent */}
        <path
          d="M 700 0 Q 750 450 700 900"
          stroke="#e5e7eb"
          strokeWidth="2"
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

            {/* Right Food Image Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="relative h-full flex items-center justify-center"
            >
              {/* SVG Dotted Circular Path */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 500 500"
                preserveAspectRatio="xMidYMid meet"
                style={{ zIndex: 1 }}
              >
                <defs>
                  <style>{`
                    .dotted-circle {
                      stroke: #e5e7eb;
                      stroke-width: 2;
                      stroke-dasharray: 6, 4;
                      fill: none;
                    }
                  `}</style>
                </defs>
                {/* Semi-circular dotted path */}
                <path
                  className="dotted-circle"
                  d="M 250 100 A 150 150 0 0 1 250 400"
                />
              </svg>

              {/* Surrounding Small Circular Images */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
                <AnimatePresence>
                  {surroundingImages.map((item, idx) => {
                    const radians = (item.angle * Math.PI) / 180;
                    const x = Math.cos(radians) * item.distance;
                    const y = Math.sin(radians) * item.distance;

                    return (
                      <motion.div
                        key={`small-${activeIndex}-${idx}`}
                        variants={smallImageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        }}
                      >
                        {/* Circular Container for Small Image */}
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
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
              </div>

              {/* Main Large Circular Food Image */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 3 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    variants={mainImageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {/* Circular Container for Main Image */}
                    <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
                      <motion.img
                        src={currentFood.image}
                        alt={currentFood.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
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
                {/* Up Arrow */}
                <motion.button
                  onClick={handlePrevious}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
                  aria-label="Previous food item"
                >
                  <ChevronUp size={28} />
                </motion.button>

                {/* Down Arrow */}
                <motion.button
                  onClick={handleNext}
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
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center z-20"
              >
                <p className="text-xl font-bold text-gray-800">{currentFood.name}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
