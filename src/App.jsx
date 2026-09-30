import "./App.css";
import Nav from "./Components/Nav";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./Routes/Home";
import Order from "./Routes/Order";
import { isLoggedIn } from "./utils/auth";

function RequireAuth({ children }) {
  const location = useLocation();

  return isLoggedIn() ? (
    children
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
}
RequireAuth.propTypes = { children: () => null };

import Shop from "./Routes/Shop";
import Login from "./Routes/Login";
import DetailsProvider from "./Contexts/ProductDetails";
import ProductDetail from "./Routes/ProductDetail";
import Cart from "./Routes/Cart";
import Footer from "./Components/Footer";
import About from "./Routes/About";
import ScrollToTopButton from "./Components/ScrollTop";
import BillingForm from "./Components/Billing";
import Admin from "./Routes/Admin";
function App() {
  return (
    <DetailsProvider>
      <div className="div-main">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Shop/ProductDetail" element={<ProductDetail />} />
            <Route
              path="/Cart"
              element={
                <RequireAuth>
                  <Cart />
                </RequireAuth>
              }
            />
            <Route path="/About" element={<About />} />
            <Route
              path="/Billing"
              element={
                <RequireAuth>
                  <BillingForm />
                </RequireAuth>
              }
            />
            <Route
              path="/Order"
              element={
                <RequireAuth>
                  <Order />
                </RequireAuth>
              }
            />
            <Route path="/add-product" element={<Admin />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        <ScrollToTopButton />
      </div>
    </DetailsProvider>
  );
}

export default App;
