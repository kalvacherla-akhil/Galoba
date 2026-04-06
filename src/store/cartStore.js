import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (meal) => set((state) => {
    const existingItem = state.items.find(item => item.id === meal.id);
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { items: [...state.items, { ...meal, quantity: 1 }] };
  }),
  removeItem: (mealId) => set((state) => ({
    items: state.items.filter(item => item.id !== mealId),
  })),
  updateQuantity: (mealId, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === mealId ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0),
  })),
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => {
    const state = useCartStore.getState();
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
}));

export default useCartStore;
