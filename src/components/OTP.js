import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing.");
    }
  }, [userId]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value.match(/[0-9]/) || value === "") {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (!otpValue || !userId) {
      setError("Please enter OTP and ensure user ID is available.");
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      id: String(userId),
      value: otpValue,
    };

    try {
      const response = await axios.post("https://auth.zeenopay.com/users/verify-otp/", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("OTP Verified Successfully!");
        navigate("/login");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "An error occurred. Please try again.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <div className="container">
        <img src="https://i.ibb.co/HdffZky/zeenopay-logo-removebg-preview.png" alt="Logo" className="logo" />
        <h2>OTP Verification</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleOtpSubmit} className="form">
          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                maxLength="1"
                className="input"
                autoFocus={index === 0}
              />
            ))}
          </div>
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
      <style jsx>{`
/* General Styles */
.screen {
  background-color: #f7f9fc;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}

.container {
  padding: 30px;
  max-width: 400px;
  margin: auto;
  text-align: center;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.logo {
  width: 180px;
  height: auto;
  margin-bottom: 10px;
}

.error {
  color: red;
  margin-bottom: 10px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.otp-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}

.input {
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px;
  outline: none;
  transition: border-color 0.3s;
}

.button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #028248;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Media Queries for Mobile Responsiveness */
@media (max-width: 768px) {
  .screen {
    padding: 0 10px;
  }

  .container {
    padding: 20px;
    margin: 20px 0;
    width: 100%;
  }

  .input {
    width: 40px;
    height: 40px;
  }

  .button {
    padding: 12px 25px;
    font-size: 14px;
  }

  .otp-container {
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .input {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }

  .button {
    padding: 15px 30px;
    font-size: 15px;
  }

  .container {
    padding: 15px;
    margin: 15px 0;
  }
}

/* Additional Media Query for Small Screens below 400px */
@media (max-width: 400px) {
  .input {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }

  .button {
    padding: 10px 25px;
    font-size: 14px;
  }

  .container {
    padding: 10px;
    margin: 10px 0;
  }

  .logo {
    width: 150px;
  }

  .otp-container {
    gap: 8px;
  }
}
`}</style>

    </div>
  );
};

export default OtpVerification;
