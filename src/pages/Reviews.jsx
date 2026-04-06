import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import Button from '../components/Button';
import { getReviews, createReview } from '../api/services';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    rating: 5,
    comment: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await getReviews();
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await createReview(formData);
      setFormData({ user_name: '', rating: 5, comment: '' });
      setShowModal(false);
      await fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-bg py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-4xl font-poppins font-bold text-dark-text mb-2">
              Customer Reviews
            </h1>
            <p className="text-gray-600">
              See what our customers are saying about DBOX
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowModal(true)}
          >
            Add Review
          </Button>
        </motion.div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg mb-4">
              No reviews yet. Be the first to share your experience!
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowModal(true)}
            >
              Write a Review
            </Button>
          </motion.div>
        )}

        {/* Review Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-hover max-w-md w-full p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-poppins font-bold text-dark-text">
                    Share Your Review
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-dark-text transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-dark-text mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-dark-text mb-2">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            size={32}
                            className={star <= formData.rating ? 'fill-accent text-accent' : 'text-gray-300'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-semibold text-dark-text mb-2">
                      Your Review
                    </label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      placeholder="Share your experience with DBOX..."
                      required
                      rows="4"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reviews;
