import React from 'react';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';

function Navbar() {
  const count = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  return (
    <header className="navbar">
      <Link to="/" className="brand">🌿 Paradise Nursery</Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/plants">Plants</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/cart" className="cart-link">Cart <span className="cart-count">{count}</span></NavLink>
      </nav>
    </header>
  );
}

function LandingPage() {
  const navigate = useNavigate();
  return (
    <main className="hero">
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow">BRING NATURE HOME</p>
        <h1>Grow a little<br /><em>happiness.</em></h1>
        <p className="hero-copy">Find the perfect plants to make your space greener, calmer, and more beautiful.</p>
        <button className="primary-button" onClick={() => navigate('/plants')}>Get Started <span aria-hidden="true">→</span></button>
        <p className="hero-note">Thoughtfully chosen plants for everyday living.</p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <footer className="footer">© {new Date().getFullYear()} Paradise Nursery · Grow something good.</footer>
    </div>
  );
}