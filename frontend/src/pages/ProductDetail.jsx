import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';

export default function ProductDetail() {
  const { id } = useParams();
  const [prod, setProd] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProd(res.data))
      .catch(console.error);
  }, [id]);

  if (!prod) return <p>Loading…</p>;

  return (
    <div className="card mb-4">
      <img
        src={prod.imageUrl || 'https://via.placeholder.com/800x300'}
        className="card-img-top"
        alt={prod.name}
      />
      <div className="card-body">
        <h2>{prod.name}</h2>
        <p>{prod.description}</p>
        <h4 className="text-primary">${prod.price.toFixed(2)}</h4>
      </div>
    </div>
  );
}
