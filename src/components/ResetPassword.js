import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import logo from '../images/login-cover.svg';
import backIcon from '../images/back.svg'; 
import logocover from '../images/logo.png';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent successfully. Please check your inbox.");
      setEmail('');
    } catch (error) {
      console.error("Error sending reset password email:", error.message);
      setError(error.message);
    }
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
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword} style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} />
          <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>Reset Password</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
        <p style={{ marginTop: '10px', fontSize: '14px' }}>Remember your password? <span onClick={() => navigate('/SignIn')} style={{ color: '#007bff', textDecoration: 'none', cursor: 'pointer' }}>Sign In</span></p>
      </div>
    </div>
  );
};

export default ResetPassword;
