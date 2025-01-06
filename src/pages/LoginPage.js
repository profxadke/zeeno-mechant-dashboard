import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useToken } from "../context/TokenContext";
// import "../assets/login.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { token, updateToken } = useToken();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://api.zeenopay.com/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "password",
          username: formData.username,
          password: formData.password,
          scope: "",
          client_id: "string",
          client_secret: "string",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        updateToken(data.access_token);

        sessionStorage.setItem("username", formData.username);

        navigate("/");
      } else {
        setError(data.message || "Invalid login credentials");
      }
    } catch (error) {
      setError("An error occurred while logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          className="login-logo"
          src="https://i.ibb.co/h8f3Mkt/Screenshot-2024-12-25-140415-removebg-preview.png"
          alt="Logo"
        />
        <h2>Merchant Dashboard Login</h2>
        {error && <div className="error">{error}</div>}
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
          <div className="form-group remember-forget">
            <label className="remember-label">
              <input
                type="checkbox"
                name="rememberMe"
                className="remember-checkbox"
              />
              Remember Me
            </label>
            <Link to="/forget-password" className="forget-password">
              Forget Password?
            </Link>
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="signup-container">
          <p>
            New to the platform? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>

      <style jsx>{`.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 20px;
    background: linear-gradient(to right, #6a11cb, #2575fc);
  }

  .login-box {
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    transform: scale(0.95);
    animation: scaleUp 0.3s ease-out;
  }

  @keyframes scaleUp {
    0% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.8em;
    color: #333;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  input:focus {
    outline: none;
    border-color: #2575fc;
    box-shadow: 0 0 8px rgba(37, 117, 252, 0.6);
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
    right: -170px;
    top: 50%;
    transform: translateY(-50%);
  }

  .show-password-btn:focus {
    outline: none;
  }

  .remember-forget {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;
  }

  .remember-label {
    display: flex;
    align-items: center;
    gap: 5px;
    text-wrap: nowrap;
  }

  .forget-password {
    color: #2575fc;
    text-decoration: none;
    font-weight: 500;
  }

  .forget-password:hover {
    text-decoration: underline;
  }

  button {
    width: 100%;
    padding: 12px;
    font-size: 1em;
    background-color: #2575fc;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .error {
    color: red;
    font-size: 0.9em;
    text-align: center;
    margin-bottom: 15px;
    font-weight: 600;
  }

  .login-logo {
    display: block;
    margin: 0 auto 20px;
    width: 100%;
    max-width: 180px;
    height: auto;
  }

  .signup-container {
    text-align: center;
    margin-top: 20px;
  }

  .signup-container a {
    color: #2575fc;
    text-decoration: none;
    font-weight: 500;
  }

  .signup-container a:hover {
    text-decoration: underline;
  }

   
  @media (max-width: 768px) {
    .login-box {
      padding: 30px;
    }

    h2 {
      font-size: 1.5em;
    }

    .form-group input {
      padding: 10px;
    }

    button {
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    .login-box {
      padding: 20px;
    }

    h2 {
      font-size: 1.3em;
    }

    .login-logo {
      max-width: 120px;
    }

    .show-password-btn {
      font-size: 1em;
    }
  }`}</style>

    </div>
  );
};

export default LoginPage;
