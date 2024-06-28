import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import logo from '../images/login-cover.svg';
import backIcon from '../images/back.svg'; 
import logocover from '../images/logo.png';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Signed in successfully!");
      setError(null);
      console.log("Signed in successfully!");
      // Optionally, redirect or handle successful sign-in
    } catch (error) {
      console.error("Error signing in:", error.message);
      setError(error.message);
      setSuccess(null);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="left-section" style={{ flex: 1, backgroundColor: '#f0f0f0', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <button onClick={goBack} style={{ position: 'absolute', top: '20px', left: '20px', padding: '0', border: 'none', background: 'none', cursor: 'pointer', zIndex: '999' }}>
          <img src={backIcon} alt="Back" style={{ width: '30px', height: '30px' }} />
        </button>
        <img src={logo} alt="Background" style={{ maxWidth: '100%', height: 'auto', marginBottom: '5px' }} />
        <h3>Train and Analyze the Models Performance For Your Next Project</h3>
        <img src={logocover} alt="Background" style={{ position: 'absolute', bottom: '20px', left: '20px', maxWidth: '100%', height: '30px' }} />
      </div>
      <div className="right-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn} style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
          />
          <button type="button" onClick={togglePasswordVisibility} style={{ marginBottom: '10px', padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>
            {showPassword ? 'Hide' : 'Show'} Password
          </button>
          <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>Sign In</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
        <p style={{ marginTop: '10px', fontSize: '14px' }}>Forgot your password? <span onClick={() => navigate('/ResetPassword')} style={{ color: '#007bff', textDecoration: 'none', cursor: 'pointer' }}>Reset it here</span></p>
        <p style={{ fontSize: '14px' }}>Don't have an account? <span onClick={() => navigate('/SignUp')} style={{ color: '#007bff', textDecoration: 'none', cursor: 'pointer' }}>Sign Up</span></p>
      </div>
    </div>
  );
};

export default SignIn;
