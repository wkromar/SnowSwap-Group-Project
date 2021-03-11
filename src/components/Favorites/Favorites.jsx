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
    dispatch({type: "FETCH_FAVORITES"});
  }, []);

  const favorites = useSelector((state) => state?.favorites);
  const modalStatus = useSelector((state) => state.modal);
  const gearDetails = useSelector((state) => state?.gearDetails);
  console.log(gearDetails)

  
  const gearClicked = (piece) => {
    dispatch({type: "SELECTED_PIECE", payload: piece});
    dispatch({type: "OPEN_DETAIL_VIEW" });
  };

  const unFavorite = (piece) => {
    dispatch({type: "UNFAVORITE_ITEM", payload: piece})
  }

  return (
    <>
      <div className="container">
      <p className="title"> Favorites </p>
      </div>
      <div className="container">
        {favorites.map((piece) => (
          <div className="item">
            <img onClick={() => gearClicked(piece)} className="image" src={piece.image[0]} />
            <img onClick={() => unFavorite(piece)} className="favorite-icon" src="images/unfavorite.svg" />
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
      </Modal>
    </>
  );
}
