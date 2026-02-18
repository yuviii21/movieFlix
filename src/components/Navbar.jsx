// Netflix-style responsive navbar component
import React from 'react';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">MovieFlix</div>
      <ul className="navbar__links">
        <li>Home</li>
        <li>Trending</li>
        <li>Popular</li>
        <li>Latest</li>
      </ul>
      <div className="navbar__search">
        <input
          type="text"
          placeholder="Search movies..."
          onChange={e => onSearch(e.target.value)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
