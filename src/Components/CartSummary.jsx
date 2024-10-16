import { Link } from "react-router-dom";

export default function CartSummary({total,cartItem}) {
  return (
    <div className="div-summary">
      <h3>Cart Summary</h3>
      <div className="total-summary">
        <p>Total amount: $ </p>
        <span className="total-sum"> {total.toFixed(2)} </span>
      </div>
      <div className="total-summary">
        <p>Discount: </p>
        <span className="total-sum"> N/A </span>
      </div>
      <div className="total-summary">
        <p>Total items: </p>
        <span className="total-sum"> {cartItem.length} </span>
      </div>
      <Link to="/Login" className="btn-purchase">
        Proceed to Purchase
      </Link>
    </div>
  );
}
