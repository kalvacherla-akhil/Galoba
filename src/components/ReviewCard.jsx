import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-accent text-accent' : 'text-gray-300'}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-premium hover:shadow-hover transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-poppins font-bold text-dark-text">
            {review.user_name}
          </h4>
          <p className="text-sm text-gray-600">
            {new Date(review.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex gap-1 mb-3">
        {renderStars(review.rating)}
      </div>

      <p className="text-gray-700 leading-relaxed">
        {review.comment}
      </p>
    </motion.div>
  );
};

export default ReviewCard;
