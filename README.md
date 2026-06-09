# Pace Store — Product Catalog

A modern product catalog application built with React + Vite + TypeScript + Tailwind CSS, fetching data from [Fake Store API](https://fakestoreapi.com).

## Getting Started

Clone atau ekstrak proyek, lalu jalankan perintah berikut:

    cd product-catalog
    npm install
    npm run dev

App akan berjalan di **http://localhost:5173**

**Production Build:**

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
| **Real-time Search** | Product title search with 300ms debouncing for optimal performance |
| **Product Detail Modal** | Click any product to open a full modal with image, description, category, rating, price, and shipping info |
| **Responsive Grid** | 1 column on mobile, 2 columns on tablet, 4 columns on desktop |

### Bonus Features (3 features — highest score criteria)

| Feature | Description |
|---|---|
| **Sorting** | Sort by price low to high, high to low, or top rated |
| **Add to Cart** | React Context API + Reducer, cart drawer, item count badge in navbar |
| **Rating Filter** | Filter products by minimum star rating (1+, 2+, 3+, 4+) |
| **Toast Notification** | Animated pop-up every time a product is added to cart |

### Additional UI Features

| Feature | Description |
|---|---|
| **Mobile Menu** | Hamburger drawer (slide-in from left) with full navigation, category filter, and support links |
| **Checkout Flow** | 3-step checkout modal: Shipping Address → Payment Method → Order Confirmation |
| **Info Modals** | All navbar and footer links are functional (About, FAQs, Customer Support, Delivery Details, Terms, Privacy Policy, Career, and more) |
| **Cart Drawer** | Slide-in panel with item management, quantity display, and checkout trigger |

---

## Folder Structure

src/
├── components/
│   ├── CartDrawer.tsx
│   ├── CheckoutModal.tsx
│   ├── ErrorState.tsx
│   ├── FilterBar.tsx
│   ├── InfoModal.tsx
│   ├── MobileMenu.tsx
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── ProductModal.tsx
│   ├── SkeletonCard.tsx
│   ├── StarRating.tsx
│   └── ToastContainer.tsx
├── context/
│   └── CartContext.tsx
├── hooks/
│   ├── useDebounce.ts
│   └── useProducts.ts
├── lib/
│   └── api.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI library with strict typing |
| Vite 5 | Dev server and bundler |
| Tailwind CSS 3 | Utility-first styling with custom design tokens |
| Axios | HTTP client with request/response interceptors |
| Lucide React | SVG icon library |
| Google Fonts | DM Sans + Playfair Display |

---

## API Endpoints Used

| Endpoint | Method | Description |
|---|---|---|
| `/products` | GET | Fetch all products |
| `/products/categories` | GET | Fetch all product categories |