import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [icon, setIcon] = React.useState("fa-moon");
  const [menuOpen, setMenuOpen] = React.useState(false);
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
        <div className="nav-header">
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            <div className="div-logo">
              <img src="./logo-TT.png" alt="Logo" className="img-logo" />
              <h3 className="title-logo">Trendy Tide</h3>
            </div>
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((previous) => !previous)}
          >
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
        <div className={`div-links ${menuOpen ? "is-open" : ""}`}>
          <ul className="nav-links">
            <Link className="links" to="/" onClick={() => setMenuOpen(false)}>
              <li>Home</li>
            </Link>
            <Link
              className="links"
              to="/Shop"
              onClick={() => setMenuOpen(false)}
            >
              <li>Shop</li>
            </Link>
            <Link
              className="links"
              to="/Login"
              onClick={() => setMenuOpen(false)}
            >
              <li>Login</li>
            </Link>
            <Link
              className="links"
              to="/About"
              onClick={() => setMenuOpen(false)}
            >
              <li>About</li>
            </Link>
            
            <Link
              className="links"
              to="/Order"
              onClick={() => setMenuOpen(false)}
            >
              <li>My-orders</li>
            </Link>
          </ul>
        </div>
        <div className="cart-div">
          <Link className="links" to="/Cart" onClick={() => setMenuOpen(false)}>
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
