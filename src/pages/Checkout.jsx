import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import useCartStore from '../store/cartStore';
import { createOrder } from '../api/services';

const Checkout = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    payment_method: 'card',
  });

  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const subtotal = totalPrice;
  const tax = subtotal * 0.1;
  const delivery = subtotal > 0 ? 5 : 0;
  const total = subtotal + tax + delivery;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        user_details: formData,
        items: items.map(item => ({
          meal_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        total_price: total,
        status: 'pending',
      };

      await createOrder(orderData);
      setOrderPlaced(true);
      clearCart();

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-neutral-bg py-12 px-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-premium p-12"
          >
            <p className="text-gray-600 mb-8">
              Your cart is empty. Add items before checking out.
            </p>
            <Link to="/menu">
              <Button variant="primary" size="lg" className="w-full">
                Back to Menu
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-neutral-bg py-12 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-premium p-12 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <CheckCircle size={64} className="mx-auto text-primary" />
          </motion.div>
          <h1 className="text-3xl font-poppins font-bold text-dark-text mb-4">
            Order Placed!
          </h1>
          <p className="text-gray-600 mb-2">
            Thank you for your order. Your meals will be delivered soon!
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Redirecting to home page...
          </p>
          <Link to="/">
            <Button variant="primary" size="lg" className="w-full">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-bg py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link to="/cart" className="flex items-center gap-2 text-primary hover:text-primary-dark mb-4 w-fit">
            <ChevronLeft size={20} />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-poppins font-bold text-dark-text">
            Checkout
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Delivery Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-premium p-8"
              >
                <h2 className="text-2xl font-poppins font-bold text-dark-text mb-6">
                  Delivery Details
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-dark-text mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark-text mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dark-text mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dark-text mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-dark-text mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark-text mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-premium p-8"
              >
                <h2 className="text-2xl font-poppins font-bold text-dark-text mb-6">
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {['card', 'paypal', 'bank_transfer'].map((method) => (
                    <label key={method} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="radio"
                        name="payment_method"
                        value={method}
                        checked={formData.payment_method === method}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 font-semibold text-dark-text capitalize">
                        {method.replace('_', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Submit Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </Button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-premium p-8 h-fit sticky top-24"
          >
            <h2 className="text-2xl font-poppins font-bold text-dark-text mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold text-dark-text">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>₹{delivery.toFixed(2)}</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-3 flex justify-between">
                <span className="font-poppins font-bold text-dark-text">Total</span>
                <span className="font-poppins font-bold text-2xl text-primary">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
