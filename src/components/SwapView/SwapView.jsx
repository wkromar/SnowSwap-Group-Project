import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import "../SwapView/SwapView.css";
import DetailsView from "../DetailsView/DetailsView";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

export default function SwapView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_GEAR" });
  }, []);

  const gear = useSelector((state) => state.gear);
  const modalStatus = useSelector((state) => state.modal);
  const gearDetails = useSelector((state) => state?.gearDetails);

  const handleAddGear = () => {
    return console.log("Clicked Add Gear");
  };

  
  const gearClicked = (piece) => {
    dispatch({type: "SELECTED_PIECE", payload: piece});
    dispatch({ type: "OPEN_DETAIL_VIEW" });
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
            <img onClick={() => gearClicked(piece)} className="image" src={piece.image[0]} />
            <img className="favorite-icon" src="images/favorite.svg" />
            <p className="name">
              {" "}
              {piece.title} | ${piece.price}{" "}
            </p>
          </div>
        ))}
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={modalStatus.detailView}
        onRequestClose={() => dispatch({ type: "CLOSE_DETAIL_VIEW" })}
        styles={customStyles}
        contentLabel="Detail View"
      >
        <DetailsView />
        <div className="seller-price">
        <p className="seller">Seller: {gearDetails.user_id}</p>
        <p className="price">Price: ${gearDetails.price}</p>
        </div>
      </Modal>
    </>
  );
}
