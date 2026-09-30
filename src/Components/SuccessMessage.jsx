import { Link } from "react-router-dom";
import { CURRENT_USER_KEY } from "../utils/auth";
const SuccessMessage = (props) => {
  return (
    <div className="login-info-ui">
      <div className="message-box">
        <h2 className="heading-message-box">Successfully Logged In!</h2>
        <p className="p-message-box">Welcome! You are now logged in.</p>
        <p>
          <a
            href="#"
            onClick={() => {
              localStorage.removeItem(CURRENT_USER_KEY);
              props.setIsSubmitted((prev) => !prev);
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
