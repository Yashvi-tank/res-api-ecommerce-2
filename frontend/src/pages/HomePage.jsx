import React, { useState, useEffect, useContext } from "react";
import api from "../services/api.js";
import ProductCard from "../components/ProductCard.jsx";
import { CartContext } from "../context/CartContext.jsx";
import "../styles/HomePage.css";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error("could not load products:", err);
        setProducts([]);
      });
  }, []);

  return (
    <div className="posy-home">
      {/* …your hero & categories sections… */}

      <section className="products">
        <h2>See What’s New</h2>
        <div className="grid">
          {products.map((p) => (
            <ProductCard
              key={p._id}
              name={p.name}
              description={p.description}
              price={p.price}
              imageUrl={p.imageUrl}
              onAdd={() => addToCart(p)}
            />
          ))}
        </div>
        <button className="btn-secondary">View All</button>
      </section>

      {/* …join list / about store… */}
    </div>
  );
}
