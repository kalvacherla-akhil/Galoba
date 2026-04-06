import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from './Button';

const PlanCard = ({ plan, isPopular = false }) => {
  const features = [
    `${plan.meals_per_week} meals per week`,
    'Free delivery',
    'Customizable meals',
    'Nutritionist consultation',
    'Mobile app access',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      className={`rounded-2xl overflow-hidden transition-all duration-300 ${isPopular
        ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-hover scale-105'
        : 'bg-white shadow-premium hover:shadow-hover'
        }`}
    >
      {isPopular && (
        <div className="bg-accent text-white py-2 text-center font-poppins font-bold text-sm">
          MOST POPULAR
        </div>
      )}

      <div className="p-8">
        <h3 className={`font-poppins font-bold text-2xl mb-2 ${isPopular ? 'text-white' : 'text-dark-text'}`}>
          {plan.name}
        </h3>

        <div className="mb-6">
          <span className={`text-4xl font-poppins font-bold ${isPopular ? 'text-white' : 'text-primary'}`}>
            ₹{plan.price}
          </span>
          <span className={`text-sm ml-2 ${isPopular ? 'text-gray-200' : 'text-gray-600'}`}>
            /month
          </span>
        </div>

        <p className={`mb-6 ${isPopular ? 'text-gray-100' : 'text-gray-600'}`}>
          {plan.description}
        </p>

        <Button
          variant={isPopular ? 'secondary' : 'primary'}
          size="lg"
          className="w-full mb-6"
        >
          Choose Plan
        </Button>

        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <Check size={20} className={isPopular ? 'text-white' : 'text-primary'} />
              <span className={isPopular ? 'text-gray-100' : 'text-gray-700'}>
                {feature}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PlanCard;
