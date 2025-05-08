import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark px-4">
      <Link className="navbar-brand" to="/">
        E-commerce
      </Link>
      <div className="ms-auto">
        {!user ? (
          <>
            <Link className="btn btn-outline-light me-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-success" to="/signup">
              Sign up
            </Link>
          </>
        ) : (
          <>
            <span className="text-light me-3">Hello, {user.firstName}</span>
            <Link className="btn btn-outline-light me-2" to="/create-product">
              Add Product
            </Link>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
