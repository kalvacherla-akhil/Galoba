import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Calendar, Clock } from 'lucide-react';
import Button from '../components/Button';
import useCartStore from '../store/cartStore';

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const totalPrice = items.reduce((total, item) => {
    if (item.isSubscription) {
      return total + item.totalPrice;
    } else {
      return total + (item.price * item.quantity);
    }
  }, 0);
  const subtotal = totalPrice;
  const tax = subtotal * 0.1;
  const delivery = subtotal > 0 ? 5 : 0;
  const total = subtotal + tax + delivery;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-bg py-12 px-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-premium p-12"
          >
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-2xl font-poppins font-bold text-dark-text mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Start adding delicious, nutritious meals to your cart!
            </p>
            <Link to="/menu">
              <Button variant="primary" size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
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
          <h1 className="text-4xl font-poppins font-bold text-dark-text mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-premium p-6 flex gap-6"
              >
                {/* Image */}
                <div className="w-24 h-24 bg-neutral-bg rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image || 'https://via.placeholder.com/100x100?text=Meal'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-poppins font-bold text-lg text-dark-text mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {item.description}
                  </p>
                  
                  {/* Subscription Details */}
                  {item.isSubscription ? (
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {item.subscriptionType === 'weekly' ? 'Weekly' : 'Monthly'} Subscription
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span className="capitalize">{item.deliverySlot}</span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  
                  <p className="text-primary font-bold">
                    ₹{item.isSubscription ? item.totalPrice : item.price.toFixed(2)}
                    {!item.isSubscription && ' each'}
                  </p>
                </div>

                {/* Quantity & Actions */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>

                  {!item.isSubscription && (
                    <div className="flex items-center gap-2 bg-neutral-bg rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}

                  <p className="font-poppins font-bold text-lg text-dark-text">
                    ₹{item.isSubscription ? item.totalPrice : (item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
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

            <div className="space-y-4 mb-6">
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
              <div className="border-t-2 border-gray-200 pt-4 flex justify-between">
                <span className="font-poppins font-bold text-dark-text">Total</span>
                <span className="font-poppins font-bold text-2xl text-primary">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>

            <Link to="/checkout" className="w-full block">
              <Button variant="primary" size="lg" className="w-full mb-3">
                Proceed to Checkout
              </Button>
            </Link>

            <Link to="/menu" className="w-full block">
              <Button variant="outline" size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
