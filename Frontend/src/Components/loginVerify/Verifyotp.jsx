import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../css/otpverification.css';

const OTPVerification = ({ verifyOtp, phoneOrEmail }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [countdown, setCountdown] = useState(30);  // 30-second timer for resend OTP
  const [resendEnabled, setResendEnabled] = useState(false);
  const inputRefs = useRef([]);

  // Countdown logic for the resend OTP button
  useEffect(() => {
    if (countdown === 0) return; // Avoid running the interval when countdown is 0
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          setResendEnabled(true);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]); // Dependency on countdown to restart timer when it is reset

  // Resend OTP handler
  const handleResend = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/request-otp/`, {
        email_or_phone: phoneOrEmail,
        is_resend: true,
      });
      setCountdown(30); // Reset countdown timer
      setResendEnabled(false); // Disable resend button until timer completes
      setOtp(new Array(6).fill('')); // Clear OTP input boxes
      inputRefs.current[0].focus(); // Focus on the first input box
      alert('OTP has been resent to your device!');
    } catch (error) {
      alert('Error resending OTP. Please try again later.');
    }
  };

  // Handle input change and move to the next box
  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/, ''); // Allow only numeric input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Handle OTP submit
  const handleSubmit = () => {
    verifyOtp(otp.join(''));
  };

  return (
    <div className="otp-verification-wrapper">
      <h2 className="verify-otp-head">Verify OTP</h2>
      <div className="otp-inputs">
        {otp.map((_, index) => (
          <input
            type="text"
            key={index}
            maxLength="1"
            value={otp[index]}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      <div className="resend">
        {countdown === 0 ? (
          <span onClick={handleResend} className={`resend-link ${resendEnabled ? 'active' : ''}`}>
            Didn’t get the code? <span className="resend-span">Resend</span>
          </span>
        ) : (
          <span>Resend available in {countdown} seconds</span>
        )}
      </div>
      <button onClick={handleSubmit} className="verify-button">Verify OTP</button>
    </div>
  );
};

export default OTPVerification;
