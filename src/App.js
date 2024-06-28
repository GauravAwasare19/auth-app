import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>      
    </div>
  );
}

export default App;
