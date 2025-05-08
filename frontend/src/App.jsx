import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import HomePage      from "./pages/HomePage.jsx";
import LogInPage     from "./pages/LogInPage.jsx";
import SignUpPage    from "./pages/SignUpPage.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import NotFoundPage  from "./pages/NotFoundPage.jsx";

// Components
import NavBar     from "./components/NavBar.jsx";
import FooterComp from "./components/FooterComp.jsx";

// Auth
import { AuthContext } from "./context/AuthContext.jsx";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Router>
      <NavBar />

      <main className="container py-4">
        <Routes>
          <Route path="/"        element={<HomePage />} />
          <Route path="/login"   element={<LogInPage />} />
          <Route path="/signup"  element={<SignUpPage />} />

          <Route
            path="/create-product"
            element={
              <PrivateRoute>
                <CreateProduct />
              </PrivateRoute>
            }
          />

          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <FooterComp />
    </Router>
  );
}
