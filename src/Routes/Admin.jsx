import React from "react";
import { useNavigate } from "react-router-dom";
import { DetailsContext } from "../Contexts/ProductDetails";

export default function Admin() {
  const { addNewProduct } = React.useContext(DetailsContext);
  const navigate = useNavigate();
  const [productName, setProductName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("men's clothing");
  const [image, setImage] = React.useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    if (!productName.trim() || !price || !image) return;

    const reader = new FileReader();
    reader.onload = () => {
      addNewProduct({
        id: `newproduct-${Date.now()}`,
        title: productName.trim(),
        price: Number(price),
        category,
        image: reader.result,
        description: "Added from the admin product form.",
      });
      navigate("/Shop");
    };
    reader.readAsDataURL(image);
  }

  return (
    <main className="admin-page">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h1>Add Product</h1>
        <label>
          Product name
          <input
            type="text"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </label>
        <label>
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewellery</option>
          </select>
        </label>
        <label>
          Product image
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.files[0] || null)}
            required
          />
        </label>
        <button type="submit" className="add-to-cart-btn">
          Add Product
        </button>
      </form>
    </main>
  );
}
