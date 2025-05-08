import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="card h-100">
    {product.imageUrl && (
      <img src={product.imageUrl} className="card-img-top" alt={product.name} />
    )}
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text text-truncate">{product.description}</p>
      <div className="mt-auto">
        <p className="fw-bold">${product.price.toFixed(2)}</p>
        <Link to={`/product/${product._id}`} className="btn btn-sm btn-primary">
          View
        </Link>
      </div>
    </div>
  </div>
);

export default ProductCard;
