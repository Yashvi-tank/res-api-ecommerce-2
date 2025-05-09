import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import { CartContext } from "../context/CartContext.jsx";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(console.error);
  }, [id]);

  if (!product) return <p>Loading…</p>;

  const inCart = cart.some(item => item.id === product.id);

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      {/* image, title, price, description… */}
      <button
        className={inCart ? "btn btn-danger" : "btn btn-primary"}
        onClick={() =>
          inCart ? removeFromCart(product.id) : addToCart(product)
        }
      >
        {inCart ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
}

// ← Make sure this line is present:
export default ProductDetail;
