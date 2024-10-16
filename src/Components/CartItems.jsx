import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

export default function CartItems({ cartItem, setCartItem }) {
  function handleRemove(id) {
    setCartItem((prev) => prev.filter((item) => item.id !== id));
  }
  React.useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
  }, [cartItem]);
  return (
    <div>
      {cartItem.length > 0 ? (
        cartItem.map((item) => {
          return (
            <CartItem
              key={item.id}
              item={item}
              handleRemove={handleRemove}
              cartItem={cartItem}
              setCartItem={setCartItem}
            />
          );
        })
      ) : (
        <div className="div-empty-cart">
          <h2 style={{ textAlign: "center" }}>Empty cart</h2>
          <Link to="/Shop">Add Items</Link>
        </div>
      )}
    </div>
  );
}
