import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <img src="./logo_GSI.png" alt="Logo" />
        <span>GSI</span>
      </div>
      <div className="navbar_profil">
        <img src="./imgProfil.png" alt="Profil" />
      </div>
    </nav>
  );
};

export default Navbar;
