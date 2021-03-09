import { useState } from "react";
import "../MyGear/MyGear.css";

export default function MyGear() {
  let boxes = [1, 2, 3, 4, 5, 6, 7];

  const handleAddGear = () => {
    return console.log('Clicked Add Gear')
  }

  const handleShowDetails = () => {
    
  }

  return (
    <>
      <div className="container">
        <button className="add-gear-button" onClick={handleAddGear}>Add Gear</button>
      </div>
      <p className="title"> Inventory </p>
      <div className="container">
        {boxes.map((box) => (
          <div className="item">
            <img className="image" src="images/menu_icon.svg" />
            <img className="favorite-icon" src="images/favorite.svg" />
            <p className="name"> Name | $ </p>
          </div>
        ))}
      </div>
    </>
  );
}
