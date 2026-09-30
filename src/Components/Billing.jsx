import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const initialValues = {
  fullName: "",
  email: "",
  cardNumber: "",
  phoneNumber: "",
};

export default function BillingForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const product = state?.product;

  function handleSubmit(event) {
    event.preventDefault();
    if (!product) return;
    const order = {
      id: Date.now(),
      customerName: formValues.fullName,
      item: product,
      items: [product],
      createdAt: new Date().toISOString(),
    };
    const previousOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...previousOrders, order]));
    localStorage.setItem("latestOrder", JSON.stringify(order));
    const remainingItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]",
    ).filter((item) => item.id !== product.id);
    localStorage.setItem("cartItems", JSON.stringify(remainingItems));
    navigate("/Order", { state: { order } });
  }

  if (!product) {
    return (
      <div className="billing-form-container">
        <h2 className="billing-form-title">Choose an item to purchase</h2>
        <Link className="btn-purchase" to="/Cart">
          Return to cart
        </Link>
      </div>
    );
  }

  return (
    <div className="billing-checkout">
      <div className="billing-form-container">
        <h2 className="billing-form-title">Billing Information</h2>
        <form className="billing-form" onSubmit={handleSubmit}>
          {[
            ["fullName", "Full Name", "text", "Enter your full name"],
            ["email", "Email", "email", "Enter your email"],
            [
              "cardNumber",
              "Credit Card Number",
              "text",
              "Enter your card number",
            ],
            ["phoneNumber", "Phone Number", "tel", "Enter your phone number"],
          ].map(([name, label, type, placeholder]) => (
            <div className="form-group" key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                type={type}
                id={name}
                name={name}
                value={formValues[name]}
                onChange={(event) =>
                  setFormValues({ ...formValues, [name]: event.target.value })
                }
                required
                placeholder={placeholder}
              />
            </div>
          ))}
          <button type="submit" className="billing-submit-btn">
            Submit Payment
          </button>
        </form>
      </div>
      <aside className="checkout-product">
        <img src={product.image} alt={product.title} />
        <h2>{product.title}</h2>
        <p>Quantity: {product.quantity}</p>
        <strong>${Number(product.price).toFixed(2)}</strong>
      </aside>
    </div>
  );
}
