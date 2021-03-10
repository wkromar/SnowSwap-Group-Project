import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import "../Favorites/Favorites.css";
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

export default function Favorites() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch({ type: "FETCH_GEAR" });
    dispatch({type: "FETCH_FAVORITES"});
  }, []);

  const favorites = useSelector((state) => state?.favorites);
  const modalStatus = useSelector((state) => state.modal);
  const gearDetails = useSelector((state) => state?.gearDetails);
  console.log(gearDetails)

  
  const gearClicked = (piece) => {
    dispatch({type: "SELECTED_PIECE", payload: piece});
    dispatch({ type: "OPEN_DETAIL_VIEW" });
  };

  return (
    <>
      <div className="container">
      <p className="title"> Favorites </p>
      </div>
      <div className="container">
        {favorites.map((piece) => (
          <div className="item">
            <img onClick={() => gearClicked(piece)} className="image" src={piece.image[0]} />
            <img className="favorite-icon" src="images/unfavorite.svg" />
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
        <button className="contact-seller-button">Contact Seller</button>
        <div className="description-tags">
          <h4>Description</h4>
          <p>{gearDetails.description}</p>
          
        </div>
      </Modal>
    </>
  );
}
