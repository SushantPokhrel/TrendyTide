import React, { useState } from "react";

const BillingForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Billing information submitted!");
    console.log(formValues);
  };

  return (
    <div className="billing-form-container">
      <h2 className="billing-form-title">Billing Information</h2>
      <form className="billing-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Credit Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formValues.cardNumber}
            onChange={handleChange}
            required
            placeholder="Enter your card number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          />
        </div>
        <button type="submit" className="billing-submit-btn">
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default BillingForm;
