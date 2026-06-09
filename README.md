# Pace Store — Product Catalog

A modern product catalog application built with React + Vite + TypeScript + Tailwind CSS, fetching data from [Fake Store API](https://fakestoreapi.com).

## Getting Started

bash
# 1. Clone / extract the project
cd product-catalog

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev


App will run at **http://localhost:5173**

### Production Build
bash
npm run build
npm run preview


---

## Features

### Core Features (Rubric)
| Feature | Description |
|---|---|
| **GET Request with Axios** | Fetches 20+ products from `/products` using a dedicated Axios instance |
| **Skeleton Screen** | Animated skeleton cards (`animate-pulse`) for 20 items while loading |
| **Error Handling** | `try/catch/finally`, Axios interceptors, specific errors (network / 4xx / 5xx), "Try Again" button |
| **Category Filter** | Categories fetched dynamically from `/products/categories`, filter works accurately |
| **Real-time Search** | Product title search with **300ms debouncing** for optimal performance |
| **Product Detail Modal** | Click any product → full modal (image, description, category, rating, price, shipping info) |
| **Responsive Grid** | `grid-cols-1` (mobile) → `md:grid-cols-2` (tablet) → `lg:grid-cols-4` (desktop) |

### Bonus Features (3 features — highest score criteria)
| Feature | Description |
|---|---|
| **Sorting** | Sort by price (low to high / high to low) and top rated |
| **Add to Cart** | React Context API + Reducer, cart drawer, item count badge in navbar |
| **Rating Filter** | Filter products by minimum star rating (1+, 2+, 3+, 4+) |
| **Toast Notification** | Animated pop-up every time a product is added to cart |

### Additional UI Features
| Feature | Description |
|---|---|
| **Mobile Menu** | Hamburger drawer (slide-in from left) with full navigation, category filter, and support links |
| **Checkout Flow** | 3-step checkout modal: Shipping Address → Payment Method → Order Confirmation |
| **Info Modals** | All navbar and footer links are functional (About, FAQs, Customer Support, Delivery Details, Terms, Privacy Policy, Career, etc.) |
| **Cart Drawer** | Slide-in panel with item management, quantity display, and checkout trigger |

---

## Folder Structure


src/
├── components/
│   ├── CartDrawer.tsx      # Slide-in cart panel with checkout button
│   ├── CheckoutModal.tsx   # 3-step checkout flow (address, payment, confirmation)
│   ├── ErrorState.tsx      # Error UI with retry button
│   ├── FilterBar.tsx       # Search, category, sort, and rating filter bar
│   ├── InfoModal.tsx       # Generic modal for all footer and navbar info pages
│   ├── MobileMenu.tsx      # Hamburger drawer with navigation and category links
│   ├── Navbar.tsx          # Sticky header with cart badge and nav links
│   ├── ProductCard.tsx     # Product grid card with add-to-cart button
│   ├── ProductModal.tsx    # Product detail modal
│   ├── SkeletonCard.tsx    # Loading skeleton with animate-pulse
│   ├── StarRating.tsx      # Partial-fill star rating display
│   └── ToastContainer.tsx  # Cart toast notifications
├── context/
│   └── CartContext.tsx     # Cart state via Context API + useReducer
├── hooks/
│   ├── useDebounce.ts      # Generic debounce hook (300ms default)
│   └── useProducts.ts      # Data fetching custom hook (products + categories)
├── lib/
│   └── api.ts              # Axios instance with request/response interceptors
├── types/
│   └── index.ts            # TypeScript interfaces (Product, Cart, Toast, etc.)
├── App.tsx                 # Root component, layout, and all modal state
├── main.tsx                # App entry point
└── index.css               # Tailwind directives + custom scrollbar


---

## Tech Stack

- **React 18** + **TypeScript** (strict mode)
- **Vite 5** — dev server & bundler
- **Tailwind CSS 3** — utility-first styling with custom design tokens
- **Axios** — HTTP client with interceptors
- **Lucide React** — SVG icon library (no emojis in UI)
- **Google Fonts** — DM Sans + Playfair Display

---

## API Endpoints Used

| Endpoint | Method | Description |
|---|---|---|
| `/products` | GET | Fetch all products (20 items) |
| `/products/categories` | GET | Fetch all product categories |
