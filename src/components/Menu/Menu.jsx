import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "../Menu/Menu.css";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    if (isOpen) {
      return "menu-open";
    } else {
      return "menu-closed";
    }
  };

  return (
    <div>
      <img
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        src="images/menu_icon.svg"
      />
      <div onClick={() => setIsOpen(!isOpen)} className={handleMenuClick()}>
        <div className="menuItems">
          <Link to="/profile" className="menuItem">
            Profile
          </Link>
          <Link to="/createEvent" className="menuItem">
            Create Event
          </Link>
          <Link to="myGear" className="menuItem">
            My Gear
          </Link>
          <Link to="savedItems" className="menuItem">
            Saved Items
          </Link>
          <LogOutButton />
        </div>
      </div>
    </div>
  );
}
