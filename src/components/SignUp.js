import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import logo from '../images/login-cover.svg';
import backIcon from '../images/back.svg'; 
import logocover from '../images/logo.png';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });
      console.log("User created successfully!");
      setSuccess("User created successfully!");
      setError(null);
     
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(error.message);
      setSuccess(null);
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp} style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} />
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} />
          <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>Sign Up</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
        <p style={{ marginTop: '10px', fontSize: '14px' }}>Already have an account? <span onClick={() => navigate('/SignIn')} style={{ color: '#007bff', textDecoration: 'none', cursor: 'pointer' }}>Sign In</span></p>
      </div>
    </div>
  );
};

export default SignUp;
