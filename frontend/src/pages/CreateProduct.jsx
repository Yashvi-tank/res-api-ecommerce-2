
import React, { useState } from "react";
import api from "../services/api.js";
import "../styles/CreateProduct.css";

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: "", description: "", price: "", imageUrl: ""
  });

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => {
    e.preventDefault();
    api.post("/products", form)
       .then(() => alert("Created!"))
       .catch(err => alert(err.response.data.message));
  };

  return (
    <div className="add-page">
      <h2>Add New Product</h2>
      <form onSubmit={submit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handle}/>
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handle}/>
        <label>Price</label>
        <input name="price" value={form.price} onChange={handle}/>
        <label>Image URL</label>
        <input name="imageUrl" value={form.imageUrl} onChange={handle}/>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
