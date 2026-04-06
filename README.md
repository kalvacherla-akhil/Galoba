# DBOX Frontend - Fuel Your Gains

A modern, animated React.js frontend for the DBOX diet food delivery startup.

## Features

- 🎨 Premium UI with TailwindCSS and Framer Motion animations
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🛒 Shopping cart with Zustand state management
- 🔍 Advanced meal filtering and search
- 💳 Checkout flow with order management
- ⭐ Customer reviews system
- 📊 Subscription plans comparison
- 🎯 Smooth page transitions and hover effects

## Tech Stack

- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Zustand** - State management
- **Axios** - HTTP client
- **Lucide React** - Icon library

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your API URL:
```
REACT_APP_API_URL=http://localhost:8000/api
```

## Running the Application

Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Button.jsx
│   ├── MealCard.jsx
│   ├── PlanCard.jsx
│   └── ReviewCard.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Menu.jsx
│   ├── Plans.jsx
│   ├── About.jsx
│   ├── Reviews.jsx
│   ├── Contact.jsx
│   ├── Cart.jsx
│   └── Checkout.jsx
├── store/              # Zustand stores
│   └── cartStore.js
├── api/                # API integration
│   ├── client.js
│   └── services.js
├── App.jsx
├── index.js
└── index.css
```

## Pages

1. **Home** - Hero section, features, popular meals, plans, reviews
2. **Menu** - Browse all meals with search and filters
3. **Plans** - Subscription plans with comparison table
4. **About** - Company story, mission, vision, team
5. **Reviews** - Customer reviews with add review modal
6. **Contact** - Contact form and business information
7. **Cart** - Shopping cart management
8. **Checkout** - Order placement with delivery details

## Environment Variables

- `REACT_APP_API_URL` - Django backend API URL (default: http://localhost:8000/api)

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
vercel --prod
```

### Custom Domain

1. Go to Vercel project settings
2. Add custom domain
3. Update DNS records with Vercel nameservers

## API Integration

The app connects to Django REST API endpoints:

- `GET /api/meals/` - Get all meals
- `GET /api/plans/` - Get subscription plans
- `GET /api/reviews/` - Get customer reviews
- `POST /api/reviews/` - Create new review
- `POST /api/orders/` - Create order
- `POST /api/contact/` - Submit contact form

## State Management

Cart state is managed with Zustand:

```javascript
import useCartStore from './store/cartStore';

const { items, addItem, removeItem, updateQuantity, clearCart } = useCartStore();
```

## Styling

- Primary Color: `#2ECC71`
- Primary Dark: `#27AE60`
- Accent: `#F39C12`
- Neutral BG: `#F0F0F0`
- Dark Text: `#2C3E50`

All components use TailwindCSS with custom configuration in `tailwind.config.js`

## Performance

- Code splitting with React Router
- Lazy loading of images
- Optimized animations with Framer Motion
- Responsive images with placeholder support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
