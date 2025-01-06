import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      companyName,
      username,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = formData;

    if (
      !companyName ||
      !username ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    alert(`Account created for ${username}`);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img
          className="signup-logo"
          src="https://i.ibb.co/h8f3Mkt/Screenshot-2024-12-25-140415-removebg-preview.png"
          alt="Logo"
        />
        <h2>Create Your Account</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter your company name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group password-container">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-group password-container">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
        <div className="login-container">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <style jsx>{`
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          padding: 0 20px;
          background: linear-gradient(to right, #6a11cb, #2575fc);
        }

        .signup-logo {
          display: block;
          margin: 0 auto 20px;
          width: 100%;
          max-width: 180px;
          height: auto;
        }

        .signup-box {
          background-color: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          font-size: 1.8em;
          color: #333;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          font-size: 0.9em;
          color: #555;
          margin-bottom: 8px;
          display: block;
        }

        input {
          width: 100%;
          padding: 12px;
          font-size: 1em;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-sizing: border-box;
        }

        .password-input-container {
          position: relative;
        }

        .show-password-btn {
          background: none;
          border: none;
          color: #2575fc;
          font-size: 1.2em;
          cursor: pointer;
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }

        .btn {
          width: 100%;
          padding: 12px;
          font-size: 1em;
          background-color: #2575fc;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .error {
          color: red;
          font-size: 0.9em;
          text-align: center;
          margin-bottom: 15px;
        }

        .login-container {
          text-align: center;
          margin-top: 20px;
        }

        .login-container a {
          color: #2575fc;
          text-decoration: none;
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .signup-box {
            padding: 20px;
          }

          h2 {
            font-size: 1.5em;
          }

          .btn {
            font-size: 0.9em;
          }

          input {
            padding: 10px;
          }

          .show-password-btn {
            font-size: 1em;
          }
        }
      `}</style>
    </div>
  );
};

export default SignupPage;
