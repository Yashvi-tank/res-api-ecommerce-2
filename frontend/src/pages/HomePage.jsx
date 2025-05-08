import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <h1 className="mb-4">Products</h1>
      <div className="row g-3">
        {products.map(p => (
          <div className="col-md-4" key={p._id}>
            <div className="card h-100">
              <img
                src={p.imageUrl || 'https://via.placeholder.com/400x200'}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text text-truncate">{p.description}</p>
                <div className="mt-auto">
                  <Link to={`/product/${p._id}`} className="btn btn-primary w-100">
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
