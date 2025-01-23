import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo">Newton</div>
        <div className="nav-right">
          <button className="login-btn">LOG IN</button>
          <button className="signup-btn">SIGN UP</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 