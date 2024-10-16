import React from "react";
import { DetailsContext } from "../Contexts/ProductDetails";
import { Link } from "react-router-dom";

export default function Products() {
  const { setId } = React.useContext(DetailsContext);
  const [category, setCategory] = React.useState("All");
  const [data, setData] = React.useState([]);
  const [priceRange, setPriceRange] = React.useState(null); // New state to track price range

  React.useEffect(() => {
    // Fetch data based on category and apply price filter afterward
    // the price filteration is based on current category of products
    const fetchData = async () => {
      let url = `https://fakestoreapi.com/products`;

      if (category !== "All") {
        url = `https://fakestoreapi.com/products/category/${category}`;
      }

      const response = await fetch(url);
      const json = await response.json();

      if (priceRange) {
        // Apply price filtering on fetched data
        const filteredData = json.filter((item) =>
          priceRange === "low" ? item.price < 100 : item.price >= 100
        );
        if (filteredData.length > 0) {
          setData(filteredData);
        } else alert("No products available in that range "); //runs when data filtered is empty
      } else {
        setData(json); // If no price filter is applied, set fetched data directly
      }
    };

    fetchData();
  }, [category, priceRange]);

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
