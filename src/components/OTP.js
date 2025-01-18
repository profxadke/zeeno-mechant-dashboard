import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, otp_id, operation } = location.state || {}; 
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    // Check if all OTP fields are filled
    setIsSubmitDisabled(otp.includes('') || otp.length !== 6);
  }, [otp]);

  const handleChange = (value, index) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input field
      if (index < otp.length - 1 && value) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    } else if (!value) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleResend = async () => {
    try {
      // Use the appropriate ID based on operation type
      const payload = operation === 'signup' ? { id } : { otp_id };
      await axios.post('https://auth.zeenopay.com/users/resend-otp/', payload);
      toast.success('OTP resent successfully');
      setTimer(60);
      setIsResendDisabled(true);
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    try {
      // Use the appropriate ID based on operation type
      const payload = {
        otp: enteredOtp,
        ...(operation === 'signup' ? { id } : { otp_id }),
      };
      const response = await axios.post('https://auth.zeenopay.com/users/verify-otp/', payload);

      if (response.data.success) {
        toast.success('OTP verified successfully');
        navigate('/otp-verification'); 
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      toast.error('Failed to verify OTP');
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Verify OTP</h2>
        <p style={styles.subheading}>Please enter the 6-digit OTP sent to your email/phone.</p>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                style={styles.input}
              />
            ))}
          </div>
          <button
            type="submit"
            style={styles.submitButton}
            disabled={isSubmitDisabled}
          >
            Verify OTP
          </button>
        </form>
        <div style={styles.resendContainer}>
          {isResendDisabled ? (
            <p style={styles.resendText}>Resend OTP in {timer} seconds</p>
          ) : (
            <button onClick={handleResend} style={styles.resendButton}>
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f7fb',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '15px',
  },
  subheading: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    width: '50px',
    height: '50px',
    textAlign: 'center',
    fontSize: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#028248',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
    transition: 'background-color 0.3s',
  },
  resendContainer: {
    marginTop: '20px',
  },
  resendButton: {
    padding: '12px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  resendText: {
    fontSize: '14px',
    color: '#666',
  },
};

export default OTPVerification;
