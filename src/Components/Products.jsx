import React from "react";
import { DetailsContext } from "../Contexts/ProductDetails";
import { Link } from "react-router-dom";

export default function Products() {
  const { setId, newproducts } = React.useContext(DetailsContext);
  const [category, setCategory] = React.useState("All");
  const [data, setData] = React.useState([]);
  const [priceRange, setPriceRange] = React.useState(null); // New state to track price range

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Unable to load products");
        const apiProducts = await response.json();
        setData(filterProducts([...apiProducts, ...newproducts]));
      } catch (error) {
        console.error("Error fetching products", error);
        setData(filterProducts(newproducts));
      }
    };

    fetchData();

    function filterProducts(products) {
      return products.filter((item) => {
        const matchesCategory =
          category === "All" || item.category === category;
        const matchesPrice =
          !priceRange ||
          (priceRange === "low" ? item.price < 100 : item.price >= 100);
        return matchesCategory && matchesPrice;
      });
    }
  }, [category, priceRange, newproducts]);

  function handleCategoryClick(category) {
    setCategory(category);
    setPriceRange(null); // Reset price filter when changing category
  }

  function handlePriceClick(priceRange) {
    setPriceRange(priceRange); // Set the price range (either 'low' or 'high')
  }

  function handleCardClick(id) {
    setId(id);
  }

  return (
    <section className="shop">
      <div className="category-selection">
        <div>
          <h1 className="h1-shop">Our Popular Items</h1>
        </div>
        <ul className="ul-category">
          <li onClick={() => handleCategoryClick("men's clothing")}>Men</li>
          <li onClick={() => handleCategoryClick("women's clothing")}>Women</li>
          <li onClick={() => handleCategoryClick("electronics")}>
            Electronics
          </li>
          <li onClick={() => handleCategoryClick("jewelery")}>Jewellery</li>
          <li onClick={() => handleCategoryClick("All")}>All</li>
          <li onClick={() => handlePriceClick("low")}>{"< $100"}</li>
          <li onClick={() => handlePriceClick("high")}>{">= $100"}</li>
        </ul>
      </div>
      <div className="display-products">
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <Link
                className="link-card"
                to="/Shop/ProductDetail"
                key={item.id}
              >
                <div className="card" onClick={() => handleCardClick(item.id)}>
                  <div>
                    <img src={item.image} alt="" className="img-card" />
                  </div>
                  <h3>{item.title}</h3>
                  <span>$ {item.price}</span>
                  <button href="#" className="add-cart-btn">
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="loader"></div>
        )}
      </div>
    </section>
  );
}
