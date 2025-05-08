// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';

const ProductDetail = () => {
  const { id } = useParams();
  const [prod, setProd] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProd(res.data))
      .catch(console.error);
  }, [id]);

  if (!prod) return <p>Loading…</p>;

  return (
    <div>
      <h1>{prod.name}</h1>
      {prod.imageUrl && (
        <img src={prod.imageUrl} alt={prod.name} className="img-fluid mb-3"/>
      )}
      <p>{prod.description}</p>
      <p className="fw-bold">${prod.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductDetail;
