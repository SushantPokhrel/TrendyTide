import React from "react";
import { DetailsContext } from "../Contexts/ProductDetails";
import { Link } from "react-router-dom";

export default function ProductDetail() {
  const { id, setCartId, setCartProduct, newproducts } =
    React.useContext(DetailsContext);
  const [singleProduct, setSingleProduct] = React.useState(null);
  React.useEffect(() => {
    const newProduct = newproducts.find((product) => product.id === id);
    if (newProduct) {
      setSingleProduct(newProduct);
      return;
    }

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setSingleProduct(json))
      .catch((error) => console.error(error));
  }, [id, newproducts]);
  function handleSubmit(product) {
    if (product.id.toString().startsWith("newproduct-")) {
      setCartId(null);
      setCartProduct(product);
    } else {
      setCartProduct(null);
      setCartId(product.id);
    }
  }
  if (!singleProduct) {
    return (
      <div className="details-error">
        <div className="loader"></div>
        <h2>An unexpected error has occured :(</h2>
        <Link to="/Shop">Return to Shop</Link>
      </div>
    );
  }
  return (
    <div className="product-details">
      <div className="product-details-img-wrapper">
        <img
          src={singleProduct.image}
          alt={singleProduct.title}
          className="product-details-img"
        />
      </div>
      <div className="product-details-info">
        <h2>{singleProduct.title}</h2>
        <p>{singleProduct.description || "No description available."}</p>
        <span className="product-details-price">$ {singleProduct.price}</span>
        <div className="fake-rating">
          <span className="star">⭐</span> <span>4.5/5</span>
        </div>
        <Link
          className="add-to-cart-btn"
          onClick={() => handleSubmit(singleProduct)}
          to="/Cart"
        >
          Add to Cart
        </Link>
        <Link className="back-button" to="/Shop">
          Back to Products
        </Link>
      </div>
    </div>
  );
}
