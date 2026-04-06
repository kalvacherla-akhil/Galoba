import client from './client';

// Meals
export const getMeals = () => client.get('/meals/');
export const getMealById = (id) => client.get(`/meals/${id}/`);

// Plans
export const getPlans = () => client.get('/plans/');
export const getPlanById = (id) => client.get(`/plans/${id}/`);

// Reviews
export const getReviews = () => client.get('/reviews/');
export const createReview = (data) => client.post('/reviews/', data);

// Orders
export const createOrder = (data) => client.post('/orders/', data);
export const getOrders = () => client.get('/orders/');
export const getOrderById = (id) => client.get(`/orders/${id}/`);

// Contact
export const submitContactForm = (data) => client.post('/contact/', data);
