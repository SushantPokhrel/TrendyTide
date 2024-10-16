import React from "react";
import { DetailsContext } from "../Contexts/ProductDetails";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
export default function CartComponent() {
  const { cartId, total, setTotal } = React.useContext(DetailsContext);
  const [cartItem, setCartItem] = React.useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  React.useEffect(() => {
    if (cartId) {
      fetch(`https://fakestoreapi.com/products/${cartId}`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          json.basePrice = json.price;
          json.quantity = 1;
          setCartItem((prev) => {
            // const prevItems = Array.isArray(prev) ? prev : [];
            const itemExists = prev.find((item) => item.id === json.id);
            if (!itemExists) {
              return [...prev, json];
            }
            return prev;
          });
        })
        .catch((error) => console.error("Error fetching product", error));
    }
  }, [cartId]);

  React.useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
    setTotal(() => {
      return cartItem.reduce((accumulator, currentValue) => {
        return currentValue.price + accumulator;
      }, 0);
    });
  }, [cartItem]);
  console.log(total);
  return (
    <div className="cart-wrapper-main">
      <div className="cart-container">
        {cartItem.length ? <h2>Your Cart Items</h2> : null}
        <CartItems cartItem={cartItem} setCartItem={setCartItem} />
      </div>
      <CartSummary cartItem={cartItem} total={total}/>
    </div>
  );
}
