import React from "react";
import "../styles/ProductCard.css";

export default function ProductCard({
  name = "Untitled",
  description = "",
  price = 0,
  imageUrl = "",
  onAdd = () => {},
}) {
  // fall back if imageUrl is falsy
  const src = imageUrl || "https://via.placeholder.com/300?text=No+Image";

  return (
    <div className="prod-card">
      <div className="prod-img-wrapper">
        <img src={src} alt={name} />
      </div>

      <div className="prod-info">
        <h3>{name}</h3>
        <p className="prod-desc">{description}</p>
        <div className="prod-footer">
          <span className="prod-price">${Number(price).toFixed(2)}</span>
          <button className="btn-cart" onClick={onAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
