import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../MyGear/MyGear.css";

export default function MyGear() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_GEAR" });
  }, []);

  const gear = useSelector((state) => state.gear);
  const gearDetails = useSelector((state) => state?.gearDetails);

  const handleAddGear = () => {
    console.log("Clicked Add Gear");
    history.push("/addGear");
  };
  // "SELECTED_PIECE";
  const gearClicked = (piece) => {
    dispatch({ type: "EDIT_GEAR", payload: piece });
    history.push(`/editGear`);
  };

  return (
    <>
      <div className="container">
        <button className="add-gear-button" onClick={handleAddGear}>
          Add Gear
        </button>
      </div>
      <p className="title"> Inventory </p>
      <div className="container">
        {gear.map((piece) => (
          <div className="item">
            <img
              onClick={() => gearClicked(piece)}
              className="image"
              src={piece.image[0]}
            />
            <p className="name">
              {" "}
              {piece.title} | ${piece.price}{" "}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
