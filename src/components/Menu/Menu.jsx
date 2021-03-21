import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import '../Menu/Menu.css';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    if (isOpen) {
      return 'menu-open';
    } else {
      return 'menu-closed';
    }
  };

  return (
    <div>
      <img
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        src="images/menu_icon.svg"
      />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`menu-container ${handleMenuClick()}`}
      >
        <div className="menuItems">
          <div className="triangle"></div>
          <Link to="/profile" className="menuItem">
            <div className="img-link-container">
              <img src="images/profile.svg" alt="" />
              Profile
            </div>
          </Link>
          <Link to="/createEvent/" className="menuItem">
            <div className="img-link-container">
              <img src="images/swap.svg" alt="" />
              Create Swap
            </div>
          </Link>
          <Link to="/myGear" className="menuItem">
            <div className="img-link-container">
              <img src="images/mygear.svg" alt="" />
              My Gear
            </div>
          </Link>
          <Link to="/favorites/" className="menuItem">
            <div className="img-link-container">
              <img src="images/favorite-blue.svg" alt="" />
              Favorites
            </div>
          </Link>
          <LogOutButton />
        </div>
      </div>
    </div>
  );
}
