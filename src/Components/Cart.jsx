import React, { useState } from "react";
import { Minus, Plus, Trash2, X, ShoppingCart } from "lucide-react";
import leek from "../../assets/leek.jpg";
import lime from "../../assets/lime.jpg";
import tomatos from "../../assets/tomatos.jpg";
import zuccini from "../../assets/zuccini.jpg";

// ✅ FIX: Moved initial product data into component state.
//         Previously "products" was a module-level array mutated with .splice().
//         Mutating a constant outside state breaks React's reactivity and causes
//         permanent data loss after the first remove (no way to restore on re-render).

const initialProducts = [
  { id: 1, name: "Leek", image: leek, price: 1.99 },
  { id: 2, name: "Lime", image: lime, price: 0.99 },
  { id: 3, name: "Tomatoes", image: tomatos, price: 2.49 },
  { id: 4, name: "Zucchini", image: zuccini, price: 1.75 },
];

const Cart = () => {
  // ✅ FIX: Both products AND quantities are now in state
  const [cartItems, setCartItems] = useState(
    initialProducts.map((p) => ({ ...p, quantity: 1 }))
  );

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // ✅ FIX: Remove by filtering state — no more .splice() on a const array
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "40px auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "relative",
        fontFamily: "sans-serif",
        background: "#fff",
      }}
    >
      {/* ✅ FIX: X button should close/hide the cart — wire up to parent state if needed */}
      <X
        style={{
          position: "absolute",
          right: "10px",
          top: "10px",
          cursor: "pointer",
        }}
        size={20}
      />

      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        <ShoppingCart size={24} style={{ verticalAlign: "middle" }} /> Cart
      </h2>

      {cartItems.length === 0 && (
        <p style={{ textAlign: "center", color: "#888" }}>Your cart is empty.</p>
      )}

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
              loading="lazy"
            />
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => updateQuantity(item.id, -1)}
                style={{
                  padding: "4px",
                  background: "#eee",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <Minus size={16} />
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                style={{
                  padding: "4px",
                  background: "#eee",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <Trash2
              onClick={() => removeItem(item.id)}
              size={18}
              style={{ cursor: "pointer", color: "#888" }}
            />
            <p
              style={{
                marginTop: "8px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}

      <hr />
      <div style={{ marginTop: "16px", fontSize: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Tax (8%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            marginTop: "6px",
          }}
        >
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          style={{
            padding: "8px 12px",
            background: "#f0f0f0",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          View Cart
        </button>
        <button
          style={{
            padding: "8px 12px",
            background: "black",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;