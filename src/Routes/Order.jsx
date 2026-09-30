import { Link, useLocation } from "react-router-dom";

export default function Order() {
  const location = useLocation();
  let storedOrders = [];
  try {
    storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
  } catch {
    storedOrders = [];
  }
  const currentOrder = location.state?.order;
  const orders =
    currentOrder && !storedOrders.some((order) => order.id === currentOrder.id)
      ? [...storedOrders, currentOrder]
      : storedOrders;

  if (!orders.length) {
    return (
      <div className="order-page">
        <h1>No orders found</h1>
        <Link to="/Shop">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="order-page">
      <h1>My Orders</h1>
      {orders.map((order) => {
        const items = order.items || (order.item ? [order.item] : []);
        const total = items.reduce((sum, item) => sum + Number(item.price), 0);

        return (
          <section className="order-items" key={order.id}>
            <h2>Order #{order.id}</h2>
            <p>Placed by {order.customerName}</p>
            {items.map((item) => (
              <div className="order-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <strong>${Number(item.price).toFixed(2)}</strong>
                </div>
              </div>
            ))}
            <p className="order-total">Total paid: ${total.toFixed(2)}</p>
          </section>
        );
      })}
      <Link className="btn-purchase" to="/Shop">
        Continue shopping
      </Link>
    </div>
  );
}
