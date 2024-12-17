
import { useUser } from '../Usercontext'; 
import React, { useState } from 'react';
import axios from 'axios';
import OTPVerification from './Verifyotp';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [error, setError] = useState('');
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const { user, updateAuthenticationStatus } = useUser();

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  // Validation function
  const validateInput = () => {
    if (emailRegex.test(phoneOrEmail)) {
      return 'email';
    } else if (phoneRegex.test(phoneOrEmail)) {
      return 'phone';
    }
    return null;
  };

  // Function to send OTP
  const sendOtp = async () => {
    const validInputType = validateInput();
    if (validInputType) {
      setError('');
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/request-otp/`, {
          email_or_phone: phoneOrEmail,
          is_resend: false,
        }, {
          withCredentials: true, // Ensure cookies are included in the request
        });

        console.log(response.data.message);
        setIsOtpSent(true);
        alert(`OTP sent to your ${validInputType}! Check your messages.`);
      } catch (error) {
        // Access error details if available from the response
        const errorMessage = error.response?.data?.message || 'Error sending OTP. Please try again.';
        setError(errorMessage);
      }
    } else {
      setError('Please enter a valid email or mobile number.');
    }
  };

  // Function to handle OTP verification
  const verifyOtp = async (otp) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/verify-otp/`, {
        email_or_phone: phoneOrEmail,
        otp,
      }, {
        withCredentials: true, // Ensure cookies are included in the request
      });

      console.log(response.data.message);

      // Check if the response contains success
      if (response.status === 200) {
        alert('OTP Verified! Login successful.');
        updateAuthenticationStatus(true); 
        navigate('/home');
      }
    } catch (error) {
      // Access error details if available from the response
      const errorMessage = error.response?.data?.message || 'Invalid OTP. Please try again.';
      setAuthError(errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-msg">
        <img src="./scanimg/logos.png" alt="Welcome..!" />
      </div>
      <div className="heading">
        <h3>Get Started</h3>
      </div>

      {!isOtpSent ? (
        <div className="login-form">
          <div className="inputfield">
            <input
              type="text"
              placeholder="Enter email or Mobile number"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          <div className="glow">
            <button onClick={sendOtp}>Send OTP</button>
          </div>
        </div>
      ) : (
        <OTPVerification verifyOtp={verifyOtp} phoneOrEmail={phoneOrEmail} />
      )}

      {authError && <div className="error-message">{authError}</div>}

      <div className="partition-login">
        <div className="partition-line"></div>
        <div className="partition-text">or</div>
        <div className="partition-line"></div>
      </div>

      <div className="alternate-login">
        <div className="google-login">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
            {/* Google Icon SVG Paths */}
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <span>Login with Google</span>
        </div>
      </div>
      <div className="footer-links">
        <p>By continuing, you agree to SmartBites' terms & Conditions and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default Login;
