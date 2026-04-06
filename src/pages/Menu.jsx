import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import MealCard from '../components/MealCard';
import { getMeals } from '../api/services';

// Example local images (put your images in src/assets and import them)
import nonvegbf from '../assets/N.jpeg';
import oats from '../assets/oats.jpeg'
import vegbf from '../assets/Vegbf.jpeg';
import sprouts from '../assets/Sprout-Salad.jpg'      // <-- add your file
import eggsalad from '../assets/eggsalad.jpg';   // <-- add your file
import Wlsalad from '../assets/weightlossSalad.jpg';   // <-- add your file
import FruitSamp from '../assets/fruitSample.jpg';   // <-- add your file
import FruitPrem from '../assets/fruitPremimum.jpg';   // <-- add your file
import chickenmeal from '../assets/chickenmeal.jpeg';
import Bshake from '../assets/Banana.jpeg';
import cashew from '../assets/cashew-shake.jpeg';
import greek from '../assets/greek-yogurt.jpeg';
import oatmealshake from '../assets/oatmeal-chocolate.jpeg';
import oatmeal2 from '../assets/Oatmeal-smoothi.jpeg';
import pista from '../assets/pista.jpeg';
import pumpkin from '../assets/pummpkin.jpeg';
import peanutbanana from '../assets/peanutbutter-banana.jpeg';
import ketochicken from '../assets/ketochickenmeal.jpeg';
import ketopanner from '../assets/ketopannermeal.jpeg';
import ketoegg from '../assets/KetoEggmeal.jpeg';
import dates from '../assets/Dates-shake.jpg';



const Menu = () => {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const categoryRefs = useRef({});

  // Keep category labels user-facing (buttons)
  const categories = [
    'All',
    'High Protein',
    'Salads',
    'Fruit Bowl',
    'Protein Shakes',
    'Keto Meal',
    
  ];

  // Mock meal data: set `image` to either an imported variable (local image)
  // or a public URL. For public folder images use "/images/yourfile.jpg"
 const mockMeals = [
  {
    id: 1,
    name: 'Non-veg Breakfast',
    description: 'High protein-packed breakfast',
    image: nonvegbf,
    price: 79,
    protein: 35,
    carbs: 20,
    fiber: 4,
    calories: 420,
    category: 'High Protein',
  },
  {
    id: 2,
    name: 'Veg Breakfast',
    description: 'Healthy vegetarian breakfast',
    image: vegbf,
    price: 64,
    protein: 18,
    carbs: 45,
    fiber: 10,
    calories: 380,
    category: 'High Protein',
  },
  {
    id: 3,
    name: 'Oats Meal',
    description: 'Perfect breakfast choice',
    image: oats,
    price: 65,
    protein: 12,
    carbs: 40,
    fiber: 8,
    calories: 300,
    category: 'High Protein',
  },
  {
    id: 4,
    name: 'Healthy Salad',
    description: 'Sprouts & veggie salad',
    image: sprouts,
    price: 45,
    protein: 15,
    carbs: 22,
    fiber: 9,
    calories: 220,
    category: 'Salads',
  },
  {
    id: 5,
    name: 'Egg Salad',
    description: 'Protein-rich egg salad',
    image: eggsalad,
    price: 68,
    protein: 22,
    carbs: 6,
    fiber: 2,
    calories: 260,
    category: 'Salads',
  },
  {
    id: 6,
    name: 'Salad (Weight Loss)',
    description: 'Low calorie salad',
    image: Wlsalad,
    price: 45,
    protein: 10,
    carbs: 15,
    fiber: 8,
    calories: 180,
    category: 'Salads',
  },
  {
    id: 7,
    name: 'Fruit Bowl (Basic)',
    description: 'Seasonal fresh fruits',
    image: FruitSamp,
    price: 69,
    protein: 3,
    carbs: 35,
    fiber: 6,
    calories: 180,
    category: 'Fruit Bowl',
  },
  {
    id: 8,
    name: 'Fruit Bowl (Premium)',
    description: 'Premium mixed fruits',
    image: FruitPrem,
    price: 89,
    protein: 5,
    carbs: 42,
    fiber: 7,
    calories: 220,
    category: 'Fruit Bowl',
  },
  {
    id: 9,
    name: 'Chicken Dinner Meal',
    description: 'Balanced high-protein dinner',
    image: chickenmeal,
    price: 99,
    protein: 38,
    carbs: 18,
    fiber: 3,
    calories: 450,
    category: 'High Protein',
  },
  {
    id: 10,
    name: 'Banana Shake',
    description: 'Energy boosting shake',
    image: Bshake,
    price: 65,
    protein: 8,
    carbs: 35,
    fiber: 4,
    calories: 260,
    category: 'Protein Shakes',
  },
  {
    id: 11,
    name: 'Cashew Milk Shake',
    description: 'Healthy fat rich shake',
    image: cashew,
    price: 70,
    protein: 10,
    carbs: 22,
    fiber: 2,
    calories: 320,
    category: 'Protein Shakes',
  },
  {
    id: 12,
    name: 'Dates High-Protein Shake',
    description: 'Natural energy shake',
    image: dates,
    price: 99,
    protein: 70,
    carbs: 40,
    fiber: 5,
    calories: 350,
    category: 'Protein Shakes',
  },
  {
    id: 13,
    name: 'Greek Yogurt Shake',
    description: 'Protein-rich yogurt shake',
    image: greek,
    price: 90,
    protein: 18,
    carbs: 12,
    fiber: 2,
    calories: 220,
    category: 'Protein Shakes',
  },
  {
    id: 14,
    name: 'Chocolate Oats Shake',
    description: 'Oats with cocoa',
    image: oatmealshake,
    price: 80,
    protein: 14,
    carbs: 38,
    fiber: 6,
    calories: 340,
    category: 'Protein Shakes',
  },
  {
    id: 15,
    name: 'Oatmeal Smoothie',
    description: 'Fiber rich smoothie',
    image: oatmeal2,
    price: 80,
    protein: 12,
    carbs: 32,
    fiber: 7,
    calories: 310,
    category: 'Protein Shakes',
  },
  {
    id: 16,
    name: 'Pistachio Shake',
    description: 'Healthy fat shake',
    image: pista,
    price: 90,
    protein: 11,
    carbs: 18,
    fiber: 3,
    calories: 290,
    category: 'Protein Shakes',
  },
  {
    id: 17,
    name: 'Pumpkin Seeds Vanilla Shake',
    description: 'Mineral rich shake',
    image: pumpkin,
    price: 75,
    protein: 16,
    carbs: 15,
    fiber: 4,
    calories: 280,
    category: 'Protein Shakes',
  },
  {
    id: 18,
    name: 'Peanut Butter Banana Shake',
    description: 'High calorie bulking shake',
    image: peanutbanana,
    price: 75,
    protein: 20,
    carbs: 30,
    fiber: 5,
    calories: 420,
    category: 'Protein Shakes',
  },
  {
    id: 19,
    name: 'Keto Chicken Meal',
    description: 'Low-carb keto chicken',
    image: ketochicken,
    price: 120,
    protein: 40,
    carbs: 5,
    fiber: 2,
    calories: 480,
    category: 'Keto Meal',
  },
  {
    id: 20,
    name: 'Keto Paneer Meal',
    description: 'Vegetarian keto meal',
    image: ketopanner,
    price: 120,
    protein: 30,
    carbs: 6,
    fiber: 3,
    calories: 420,
    category: 'Keto Meal',
  },
  {
    id: 21,
    name: 'Keto Egg Meal',
    description: 'Egg-based keto meal',
    image: ketoegg,
    price: 98,
    protein: 28,
    carbs: 4,
    fiber: 1,
    calories: 390,
    category: 'Keto Meal',
  },
];


  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await getMeals();
        // If API returns array or { data: [] } adapt accordingly
        const apiMeals = Array.isArray(response) ? response : response.data || [];
        setMeals(apiMeals);
        setFilteredMeals(apiMeals);
      } catch (error) {
        console.error('Error fetching meals — using mock data:', error);
        // Fallback to mock data if API fails
        setMeals(mockMeals);
        setFilteredMeals(mockMeals);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  // Handle navigation from Home page
  useEffect(() => {
    if (location.state?.category && !loading) {
      const category = location.state.category;
      setSelectedCategory(category);
      
      // Clear the location state to prevent re-triggering
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Scroll to category section after data is loaded (instant scroll, no smooth effect)
      const scrollToSection = () => {
        const sectionId = category.toLowerCase().replace(/\s+/g, '-');
        const element = categoryRefs.current[sectionId];
        if (element) {
          // Instant scroll to section (no smooth animation)
          element.scrollIntoView({ 
            behavior: 'instant',
            block: 'start'
          });
        }
      };

      // Try multiple times with increasing delays to ensure DOM is ready
      setTimeout(scrollToSection, 300);
      setTimeout(scrollToSection, 600);
      setTimeout(scrollToSection, 1000);
    }
  }, [location.state, loading]);

  useEffect(() => {
    // Filtering — case-insensitive comparison
    let filtered = meals;

    if (selectedCategory !== 'All') {
      const sel = selectedCategory.toLowerCase();
      filtered = filtered.filter(meal => (meal.category || '').toLowerCase() === sel);
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(meal =>
        (meal.name || '').toLowerCase().includes(q) ||
        (meal.description || '').toLowerCase().includes(q)
      );
    }

    setFilteredMeals(filtered);
  }, [searchTerm, selectedCategory, meals]);

  // Handle hash-based navigation
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Remove the hash from URL to prevent jumping
      window.history.replaceState(null, null, window.location.pathname);
      
      // Find the element and scroll to it smoothly
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-bg py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-poppins font-bold text-dark-text mb-2">
            Our Menu
          </h1>
          <p className="text-gray-600">
            Choose from our wide selection of nutritious meals
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-premium'
                    : 'bg-white text-dark-text border-2 border-gray-200 hover:border-primary'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Meals Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading meals...</p>
          </div>
        ) : filteredMeals.length > 0 ? (
          <div>
            {/* Category Sections */}
            {categories.filter(cat => cat !== 'All').map((category) => {
              const categoryMeals = filteredMeals.filter(meal => meal.category === category);
              if (categoryMeals.length === 0) return null;
              
              return (
                <div 
                  key={category} 
                  ref={(el) => {
                    const sectionId = category.toLowerCase().replace(/\s+/g, '-');
                    categoryRefs.current[sectionId] = el;
                  }}
                  id={category.toLowerCase().replace(/\s+/g, '-')} 
                  className="mb-16"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{category}</h2>
                    <p className="text-gray-600">{categoryMeals.length} items available</p>
                  </motion.div>
                  
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {categoryMeals.map((meal) => (
                      <MealCard key={meal.id} meal={meal} />
                    ))}
                  </motion.div>
                </div>
              );
            })}
            
            {/* All Items Grid (when no specific category is selected) */}
            {selectedCategory === 'All' && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {filteredMeals.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">
              No meals found. Try adjusting your filters.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;
