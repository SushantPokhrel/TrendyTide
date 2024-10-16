import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [icon, setIcon] = React.useState("fa-moon");
  function handleToggle() {
    setIcon(icon === "fa-moon" ? "fa-sun" : "fa-moon");
    // alert("toggled");
  }
  React.useEffect(() => {
    icon === "fa-sun"
      ? document.body.classList.add("active")
      : document.body.classList.remove("active");
  }, [icon]);
  return (
    <div>
      <nav>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="div-logo">
            <img src="./logo-TT.png" alt="Logo" className="img-logo" />
            <h3 className="title-logo">Trendy Tide</h3>
          </div>
        </Link>
        <div className="div-links">
          <ul className="nav-links">
            <Link className="links" to="/">
              <li>Home</li>
            </Link>
            <Link className="links" to="/Shop">
              <li>Shop</li>
            </Link>
            <Link className="links" to="/Login">
              <li>Login</li>
            </Link>
            <Link className="links" to="/About">
              <li>About</li>
            </Link>
          </ul>
        </div>
        <div className="cart-div">
          <Link className="links" to="/Cart">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
          <span className="span-theme">
            <i className={`fa-solid ${icon}`} onClick={handleToggle}></i>
          </span>
        </div>
      </nav>
    </div>
  );
}
