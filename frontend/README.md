# VelvetBeauty Frontend

This is the frontend application for the VelvetBeauty e‑commerce platform, built with React and Vite.

## Table of Contents

* [Features](#features)
* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)
* [Available Scripts](#available-scripts)
* [Environment Variables](#environment-variables)
* [Project Structure](#project-structure)
* [Styling](#styling)
* [Deployment](#deployment)
* [Learn More](#learn-more)

## Features

* **Product Listing**: Fetch and display products from the API
* **Product Details**: View individual product pages
* **Cart Management**: Add/remove items in the shopping cart
* **User Authentication**: Signup & login pages with JWT integration
* **Responsive Design**: Mobile-friendly layout

## Prerequisites

* **Node.js** v16+ (comes with npm)
* **npm** v8+

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Yashvi-tank/res-api-ecommerce-2/tree/frontend
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example env file and adjust:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your API endpoint:

   ```ini
   VITE_API_BASE_URL=https://api.example.com
   ```

4. **Run in development mode**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view in your browser.

## Available Scripts

In the project directory, you can run:

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint checks        |

## Environment Variables

Rename `.env.example` to `.env` and set:

```ini
# Base URL of the backend API
VITE_API_BASE_URL=http://localhost:3000/api
```

> **Note:** Variables must start with `VITE_` to be exposed to the client.

## Project Structure

```
public/               # Static assets (favicon, index.html)
src/
 ├── components/      # Reusable UI components
 ├── context/         # React context providers (Auth, Cart, Theme)
 ├── pages/           # Route-level components (Home, Login, SignUp, ProductDetail)
 ├── services/        # API client setup (axios instance)
 ├── styles/          # CSS modules and global styles
 ├── App.jsx          # Root component with routing
 ├── main.jsx         # Entry point
 └── index.css        # Global styles
vite.config.js        # Vite configuration
package.json          # npm scripts & dependencies
```

## Styling

This project uses plain CSS imported into each component. You can find style sheets under `src/styles/`:

* `Auth.css` — Login & Signup pages
* `HomePage.css` — Home page layout & product grid
* `CreateProduct.css` — Add Product form

Feel free to integrate Tailwind, SASS, or CSS‑in‑JS if desired.

## Deployment

1. Build the app:

   ```bash
   npm run build
   ```

2. Serve the `dist/` folder with any static hosting (Netlify, Vercel, Surge, render etc.).

For example, with [Render](https://render.com):



## Learn More

* **React**: [https://reactjs.org/](https://reactjs.org/)
* **Vite**: [https://vitejs.dev/](https://vitejs.dev/)
* **React Router**: [https://reactrouter.com/](https://reactrouter.com/)
* **Axios**: [https://axios-http.com/](https://axios-http.com/)

---

© 2025 VelvetBeauty. All rights reserved.
By - Yashvi TANK
