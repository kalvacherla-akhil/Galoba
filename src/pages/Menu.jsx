import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
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
import dates from '../assets/Dates-shake.jpg';
import greek from '../assets/greek-yogurt.jpeg';
import oatmealshake from '../assets/oatmeal-chocolate.jpeg';
import oatmeal2 from '../assets/Oatmeal-smoothi.jpeg';
import pista from '../assets/pista.jpeg';
import pumpkin from '../assets/pummpkin.jpeg';
import peanutbanana from '../assets/peanutbutter-banana.jpeg';
import ketochicken from '../assets/ketochickenmeal.jpeg';
import ketopanner from '../assets/ketopannermeal.jpeg';
import ketoegg from '../assets/KetoEggmeal.jpeg';









const Menu = () => {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Keep category labels user-facing (buttons)
  const categories = [
    'All',
    'High Protein',
    'Salads',
    'Fruit Bowl',
    'Protein Shakes',
    'Keto Meal',
    'New Category', // Add new category here
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
          // ... rest of mock meals
        ];
        setMeals(mockMeals);
        setFilteredMeals(mockMeals);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

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
