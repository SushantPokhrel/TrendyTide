import React from "react";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "./SuccessMessage";

export default function Form() {
  const [showPass, setShowPass] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [signIn, setSignIn] = React.useState(false);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    // Check if the user has already submitted (logged in) and set isSubmitted accordingly
    const storedIsSubmitted = JSON.parse(sessionStorage.getItem("isSubmitted"));
    if (storedIsSubmitted) {
      setIsSubmitted(true);
    }
  }, []);

  function handleClick() {
    setShowPass((prev) => !prev);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (signIn) {
      // Sign In: Save user details in sessionStorage and navigate to the new page
      sessionStorage.setItem("userDetails", JSON.stringify(values));
      sessionStorage.setItem("isSubmitted", JSON.stringify(true)); // Set isSubmitted to true in sessionStorage
      alert("Sign In Successful!");
      setIsSubmitted(true);
      localStorage.getItem("cartItems") &&
      JSON.parse(localStorage.getItem("cartItems")).length
        ? navigate("/Billing")
        : navigate("/Login");
    } else {
      // Log In: Check if entered credentials match the stored ones
      const storedUser = JSON.parse(sessionStorage.getItem("userDetails"));
      if (
        storedUser &&
        storedUser.email === values.email &&
        storedUser.password === values.password
      ) {
        sessionStorage.setItem("isSubmitted", JSON.stringify(true)); // Ensure isSubmitted is true in sessionStorage
        alert("Login Successful!");
        setIsSubmitted(true);
        localStorage.getItem("cartItems") &&
        JSON.parse(localStorage.getItem("cartItems")).length
          ? navigate("/Billing")
          : navigate("/Login");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    }

    // Clear input fields after submission
    setValues({
      email: "",
      password: "",
    });
  }

  function handleForget() {
    alert("You are Cooked Bro!");
  }

  function handleChange(e) {
    e.preventDefault();
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSignIn() {
    setSignIn((prev) => !prev);
  }

  return (
    <>
      {isSubmitted ? (
        <SuccessMessage
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
        />
      ) : (
        <div className="login">
          <h1>{signIn ? "Customer Sign In" : "Customer Log In"}</h1>
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
                type={showPass ? "password" : "text"}
                value={values.password}
                required
                onChange={handleChange}
                name="password"
                minLength={8}
              ></input>
              <i
                className={
                  showPass
                    ? "fa-solid fa-eye-slash password-i"
                    : "fa-solid fa-eye password-i"
                }
                onClick={handleClick}
              ></i>
            </div>
            <div>
              <a
                style={{
                  color: "red",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={handleForget}
              >
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="btn-primary">
              {signIn ? "Sign In" : "Login"}
            </button>
          </form>
          {signIn ? (
            <p>
              Already have an account ?{" "}
              <button className="btn-secondary" onClick={handleSignIn}>
                Login{" "}
              </button>
            </p>
          ) : (
            <p>
              Don't have an account ?{" "}
              <button className="btn-secondary" onClick={handleSignIn}>
                Sign In{" "}
              </button>
            </p>
          )}
        </div>
      )}
    </>
  );
}
