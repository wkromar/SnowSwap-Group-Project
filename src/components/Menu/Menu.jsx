import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from '../LogOutButton/LogOutButton';
import "../Menu/Menu.css"

export default function Menu() {

    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = () => {
        if (isOpen) {
            return 'menu-open'
        } else {
            return 'menu-closed'
        }
    }

    return (
        <div>
            <img className="hamburger" onClick={() => setIsOpen(!isOpen)} src="images/menu_icon.svg"/>
            <div onClick={() => setIsOpen(!isOpen)} className={handleMenuClick()}>
                <div>
                    <Link className = "menuItem">Profile</Link>
                    <Link className = "menuItem">Create Event</Link>
                    <Link className = "menuItem">My Gear</Link>
                    <Link className = "menuItem">Saved Items</Link>
                    <LogOutButton/>
                </div>
            </div>
        </div>
    )
}
