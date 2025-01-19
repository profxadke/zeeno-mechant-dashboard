import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    role: "RT",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, mobile, password, role } = formData;

    if (!username || !email || !mobile || !password) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    const registerData = { username, email, mobile, password, role };

    try {
      const response = await fetch("https://auth.zeenopay.com/users/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong. Please try again.");
        return;
      }

      const responseData = await response.json();
      const { otp_id } = responseData;
      setSuccess("Account created successfully!");
      navigate("/otp-verification", { state: { userId: otp_id } });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img
          className="signup-logo"
          src="https://i.ibb.co/HdffZky/zeenopay-logo-removebg-preview.png"
          alt="Logo"
        />
        <h2>Create Your Account</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="mobile">Phone Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
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
          background: #f7f9fc;
          animation: fadeIn 1s ease-in-out;
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
          animation: scaleUp 0.5s ease-in-out;
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
          color: #028248;
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
          background-color: #028248;
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

        .success {
          color: green;
          font-size: 0.9em;
          text-align: center;
          margin-bottom: 15px;
        }

        .login-container {
          text-align: center;
          margin-top: 20px;
        }

        .login-container a {
          color: #028248;
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
