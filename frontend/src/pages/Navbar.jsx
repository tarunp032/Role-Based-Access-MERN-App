import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/add-product">Add Product</Link></li>
        <Link to="/view-products">View Products</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
