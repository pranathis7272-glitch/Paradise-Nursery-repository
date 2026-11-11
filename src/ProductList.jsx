import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from './CartSlice.jsx';
import { plants } from './plants.js';

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const countFor = (id) => cartItems.find((item) => item.id === id)?.quantity ?? 0;
  const categories = [...new Set(plants.map((plant) => plant.category))];

  return (
    <main className="page products-page">
      <div className="page-heading">
        <div><p className="eyebrow">THE PLANT COLLECTION</p><h1>Find your green companion</h1></div>
        <Link className="outline-button" to="/cart">View cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</Link>
      </div>
      <p className="lead">A little greenery goes a long way. Choose a plant you love.</p>
      {categories.map((category) => (
        <section className="plant-category" key={category}>
          <h2>{category}</h2>
          <div className="plant-grid">
            {plants.filter((plant) => plant.category === category).map((plant) => {
              const quantity = countFor(plant.id);
              return (
                <article className="plant-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} loading="lazy" />
                  <div className="plant-info">
                    <p className="plant-category-label">{plant.category}</p>
                    <h3>{plant.name}</h3>
                    <p className="plant-description">{plant.description}</p>
                    <div className="plant-card-bottom"><strong>${plant.price.toFixed(2)}</strong>
                      <button className="small-button" onClick={() => dispatch(addItem(plant))}>{quantity ? `Add more (${quantity})` : 'Add to Cart'}</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}