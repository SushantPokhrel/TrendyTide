import React from "react";
import { Link } from "react-router-dom";
const SuccessMessage = (props) => {
  return (
    <div className="login-info-ui">
      <div className="message-box">
        <h2 className="heading-message-box">Successfully Logged In!</h2>
        <p className="p-message-box">Welcome ! You're now logged in.</p>
        <p>
          <a
            href="#"
            onClick={() => {
              // sessionStorage.clear("userDetails");
              props.setIsSubmitted((prev) => !prev);
              sessionStorage.setItem("isSubmitted", JSON.stringify(false));
            }}
            className="btn-logOut"
          >
            Logout{" "}
          </a>
        </p>
        <div>
          Have items in cart? <Link to="/Billing">Place an order</Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
