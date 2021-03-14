import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";



function FilterDrawer() {

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState('');

    const handleMenuClick = () => {
      if (isOpen) {
        return "menu-open";
      } else {
        return "menu-closed";
      }
    };

    const whatToFilterFor = (event) => {
        setFilter(event)
        console.log(event);
    }

    const closeFilter = () => {
        setIsOpen(!isOpen)
    }
    

    return (
        <div>

            <img
                className="hamburger"
                onClick={() => setIsOpen(!isOpen)}
                src="images/filter.svg"
            />
            <div 
            onChange={(event) => whatToFilterFor(event.target.value)} 
            className={handleMenuClick()}>
                <div className="menuItems">
                    <select name="cat" id="">
                        <option value="snowboard">Snowboard</option>
                        <option value="ski">ski</option>
                        <option value="helmet">helmet</option>
                    </select>
                    
                </div>
                
                <div>
                    <button onClick={closeFilter}>Close</button>
                </div>
            </div>

        </div>
    )
}


export default FilterDrawer;