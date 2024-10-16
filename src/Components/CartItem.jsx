import React from "react";
export default function CartItem({
  item,
  handleRemove,
  cartItem,
  setCartItem,
}) {
  function handleInr(id, e) {
    e.preventDefault();
    setCartItem((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          let updatedQuantity = item.quantity + 1;
          return {
            ...item,
            quantity: parseInt(updatedQuantity),
            price: updatedQuantity * parseFloat(item.basePrice),
          };
        }
        return item;
      });
    });
  }
  function handleDcr(id, e) {
    e.preventDefault();
    setCartItem((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          let updatedQuantity = Math.max(item.quantity - 1, 1);
          return {
            ...item,
            quantity: parseInt(updatedQuantity),
            price: updatedQuantity * parseFloat(item.basePrice),
          };
        }
        return item;
      });
    });
  }
  return (
    <div className="cart-item">
      <div className="item-content">
        <div className="first-main">
          <img src={item.image} className="img-cart-item" alt={item.title} />
          <div className="details">
            <div className="title-price">
              <h3>{item.title}</h3>
              <div className="price">$ {item.price}</div>
            </div>
            <div className="sec-description">{item.description}</div>
            <div className="div-operations">
              <div>
                <a
                  href="#"
                  className="rmv-item"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="inr"
                  onClick={(e) => handleInr(item.id, e)}
                >
                  +1
                </a>
                <a
                  href="#"
                  className="dcr"
                  onClick={(e) => handleDcr(item.id, e)}
                >
                  -1
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
