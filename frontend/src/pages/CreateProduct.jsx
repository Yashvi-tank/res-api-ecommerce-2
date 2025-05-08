import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/products', {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
      });
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Create failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        {['name','description','price','stock'].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              name={field}
              type={field === 'price' || field === 'stock' ? 'number' : 'text'}
              className="form-control"
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button className="btn btn-primary w-100">Save</button>
      </form>
    </div>
  );
}
