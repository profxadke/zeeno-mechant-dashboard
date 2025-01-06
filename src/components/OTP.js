import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function OTP() {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [resendTimer, setResendTimer] = useState(30);
  const navigate = useNavigate();

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleResend = () => {
    setResendTimer(30);
    toast.info('OTP has been resent!');
    // Logic to resend OTP can be added here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue === '123456') {
      toast.success('OTP Verified Successfully!');
      setTimeout(() => {
        navigate('/');
      }, 700);
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  return (
    <div className="otp-container">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="otp-box">
        <img
          className="otp-logo"
          src="https://i.ibb.co/h8f3Mkt/Screenshot-2024-12-25-140415-removebg-preview.png"
          alt="Logo"
        />
        <h1>OTP Verification</h1>
        <p className="otp-instructions">Please enter the 6-digit OTP sent to your registered email or phone number.</p>
        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                className="otp-box-input"
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                maxLength={1}
              />
            ))}
          </div>
          <button type="submit" className="submit-button" disabled={otp.some((digit) => digit === '')}>
            Verify
          </button>
        </form>
        <div className="resend-container">
          {resendTimer > 0 ? (
            <p className="resend-timer">You can resend OTP in {resendTimer} seconds</p>
          ) : (
            <button onClick={handleResend} className="resend-button">
              Resend OTP
            </button>
          )}
        </div>
      </div>
      <style>{`
        .otp-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(to right, #6a11cb, #2575fc);
          font-family: 'Poppins', sans-serif;
          padding: 16px;
        }

        .otp-logo {
          display: block;
          margin: 0 auto 20px;
          width: 100%;
          max-width: 180px;
          height: auto;
        }

        .otp-box {
          background: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 100%;
        }

        h1 {
          font-size: 24px;
          margin-bottom: 16px;
          color: #333;
        }

        .otp-instructions {
          font-size: 16px;
          margin-bottom: 24px;
          color: #555;
        }

        .otp-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .otp-inputs {
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .otp-box-input {
          width: 50px;
          height: 50px;
          font-size: 18px;
          text-align: center;
          border: 2px solid #ddd;
          border-radius: 8px;
          transition: border-color 0.3s ease;
        }

        .otp-box-input:focus {
          outline: none;
          border-color: #2575fc;
        }

        .submit-button {
          padding: 12px 24px;
          background-color: #2575fc;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .submit-button:hover:not(:disabled) {
          background-color: #45a049;
        }

        .resend-container {
          margin-top: 16px;
        }

        .resend-timer {
          font-size: 14px;
          color: #888;
        }

        .resend-button {
          background: none;
          border: none;
          color: #007bff;
          font-size: 14px;
          text-decoration: underline;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .resend-button:hover {
          color: #0056b3;
        }

        @media (max-width: 768px) {
          .otp-box {
            padding: 20px;
          }

          h1 {
            font-size: 20px;
          }

          .otp-instructions {
            font-size: 14px;
          }

          .otp-box-input {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }

          .submit-button {
            padding: 10px 20px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .otp-container {
            padding: 8px;
          }

          .otp-box {
            padding: 16px;
          }

          h1 {
            font-size: 18px;
          }

          .otp-box-input {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }

          .submit-button {
            padding: 8px 16px;
            font-size: 12px;
          }

          .resend-timer {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default OTP;
