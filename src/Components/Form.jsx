import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessMessage from "./SuccessMessage";
import { CURRENT_USER_KEY, getStoredUser, USER_KEY } from "../utils/auth";

export default function Form() {
  const [showPass, setShowPass] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [signIn, setSignIn] = React.useState(false);
  const [values, setValues] = React.useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (localStorage.getItem(CURRENT_USER_KEY)) setIsSubmitted(true);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (signIn) {
      localStorage.setItem(USER_KEY, JSON.stringify(values));
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(values));
      alert("Sign Up Successful!");
    } else {
      const storedUser = getStoredUser();
      if (
        !storedUser ||
        storedUser.email !== values.email ||
        storedUser.password !== values.password
      ) {
        alert("Invalid credentials. Please try again.");
        return;
      }
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(storedUser));
      alert("Login Successful!");
    }
    setIsSubmitted(true);
    setValues({ email: "", password: "" });
    navigate(location.state?.from?.pathname || "/");
  }

  function handleChange(event) {
    setValues((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  return isSubmitted ? (
    <SuccessMessage setIsSubmitted={setIsSubmitted} />
  ) : (
    <div className="login">
      <h1>{signIn ? "Customer Sign Up" : "Customer Log In"}</h1>
      <form onSubmit={handleSubmit} className="form-login">
        <div className="input-div">
          <label htmlFor="email" className="label-text">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={values.email}
            required
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="input-div input-pass">
          <label htmlFor="password" className="label-text">
            Password:
          </label>
          <input
            type={showPass ? "text" : "password"}
            value={values.password}
            required
            onChange={handleChange}
            name="password"
            minLength={8}
          />
          <i
            className={`fa-solid ${showPass ? "fa-eye-slash" : "fa-eye"} password-i`}
            onClick={() => setShowPass((previous) => !previous)}
          ></i>
        </div>
        <button type="submit" className="btn-primary">
          {signIn ? "Sign Up" : "Login"}
        </button>
      </form>
      <p>
        {signIn ? "Already have an account ? " : "Don't have an account ? "}
        <button
          className="btn-secondary"
          onClick={() => setSignIn((previous) => !previous)}
        >
          {signIn ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
