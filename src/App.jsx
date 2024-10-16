import "./App.css";
import Nav from "./Components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Shop from "./Routes/Shop";
import Login from "./Routes/Login";
import DetailsProvider from "./Contexts/ProductDetails";
import ProductDetail from "./Routes/ProductDetail";
import Cart from "./Routes/Cart";
import Footer from "./Components/Footer";
import About from "./Routes/About";
import ScrollToTopButton from "./Components/ScrollTop";
import BillingForm from "./Components/Billing";
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
            <Route path="/Cart" element={<Cart />} />
            <Route path="/About" element={<About />} />
            <Route path="/Billing" element={<BillingForm />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        <ScrollToTopButton />
      </div>
    </DetailsProvider>
  );
}

export default App;
