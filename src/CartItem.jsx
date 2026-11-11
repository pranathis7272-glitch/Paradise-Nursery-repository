import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, updateQuantity, clearCart } from './CartSlice.jsx';

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="page cart-page">
      <p className="eyebrow">YOUR SELECTION</p>
      <h1>Shopping Cart</h1>
      {items.length === 0 ? (
        <section className="empty-cart">
          <div className="empty-icon">🪴</div><h2>Your cart is waiting to grow</h2>
          <p>You have not added any plants yet. Find one that feels like home.</p>
          <Link className="primary-link" to="/plants">Continue Shopping</Link>
        </section>
      ) : (
        <>
          <div className="cart-layout">
            <section className="cart-items">
              {items.map((item) => (
                <article className="cart-row" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-product">
                    <h2>{item.name}</h2><p>${item.price.toFixed(2)} each</p>
                    <button className="text-button remove-button" onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                  </div>
                  <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                    <button aria-label="Decrease quantity" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                    <span>{item.quantity}</span>
                    <button aria-label="Increase quantity" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                  </div>
                  <strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong>
                </article>
              ))}
            </section>
            <aside className="order-summary">
              <h2>Order summary</h2><div className="summary-line"><span>Items</span><span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span></div>
              <div className="summary-line total-line"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
              <button className="primary-button checkout-button" onClick={() => window.alert('Thank you for visiting Paradise Nursery! Checkout is coming soon.')}>Checkout</button>
              <Link className="continue-link" to="/plants">Continue Shopping</Link>
              <button className="text-button clear-button" onClick={() => dispatch(clearCart())}>Clear cart</button>
            </aside>
          </div>
        </>
      )}
    </main>
  );
}