import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddGear from "../AddGear/AddGear";
import "../AddGearToSwap/AddGearToSwap.css";

export default function AddGearToSwap() {
  const dispatch = useDispatch();

  
  const gear = useSelector((state) => state?.gear);
  const gearToAdd = useSelector((state) => state?.gearToAdd);

  useEffect(() => {
    dispatch({ type: "FETCH_GEAR" });
  }, []);

  const addGear = (piece) => {
    dispatch({ type: "ADD_GEAR_TO_SWAP", payload: piece });
  };

  const removeGear = (id) => {
    dispatch({ type: "REMOVE_GEAR_FROM_SWAP", payload: id });
  };

  const addSelectedToSwap = (gearToAdd) => {
      dispatch({type: "ADD_SELECTED_TO_SWAP", payload: gearToAdd})
  }

  return (
    <>
      <p className="title"> Add Items to Swap Here: </p>
      <div className="container">
        {gear.map((piece) => (
          <div className="item">
            <img className="image" src={piece.image[0]} />
            <p className="name">{piece.title}</p>
            <p className="mygear-price">${piece.price}</p>
           
              <button
                onClick={() => removeGear(piece.id)}
                className="remove-button"
              >
                Remove
              </button>
           
              <button onClick={() => addGear(piece)} className="add-button">
                Add
              </button>
            
          </div>
        ))}
      </div>
      <div>
          <button onClick={() => addSelectedToSwap(gearToAdd)} className="add-items-to-swap-button">
              Add Items To Swap
          </button>
      </div>
    </>
  );
}
