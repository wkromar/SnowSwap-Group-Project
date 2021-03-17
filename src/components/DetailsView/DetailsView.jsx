import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import "../DetailsView/DetailsView.css";
import "../Favorites/Favorites.css";

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

export default function DetailsView() {
  const gearDetails = useSelector((state) => state?.gearDetails);
  const modalStatus = useSelector((state) => state.modal);
  const user = useSelector((state) => state?.user);
  const userEmail = `mailto:${gearDetails.email}?subject=Requesting more information on your Snowswaps Item`;
  const dispatch = useDispatch();
  // const itemOfInterest = detailsView.id;
  const [imageCounter, setImageCounter] = useState(0);
  console.log(user);
  const handleNextPicture = (direction) => {
    console.log(direction);
    console.log(gearDetails.image.length - 1);
    if (direction === "next" && imageCounter < gearDetails.image.length - 1) {
      setImageCounter(imageCounter + 1);
    } else if (
      direction === "next" &&
      imageCounter === gearDetails.image.length - 1
    ) {
      setImageCounter(0);
    } else if (direction === "back" && imageCounter > 0) {
      setImageCounter(imageCounter - 1);
    } else if (direction === "back" && imageCounter === 0) {
      setImageCounter(gearDetails.image.length - 1);
    }
  };

  console.log("imageCounter:", imageCounter);

  return (
    <>
      <div className="modalImages">
        <div onClick={() => handleNextPicture("back")} className="left-arrow">
          <img className="right-arrow-icon" src="images/left_arrow.svg" />
        </div>
        <img
          onClick={() => dispatch({ type: "ENLARGE_IMAGE_OPEN" })}
          src={gearDetails?.image[imageCounter]}
        />
        <div onClick={() => handleNextPicture("next")} className="right-arrow">
          <img className="right-arrow-icon" src="images/right_arrow.svg" />
        </div>
      </div>
      <div className="seller-price">
        <p className="seller">Seller: {gearDetails.username}</p>
        <p className="price">Price: ${gearDetails.price}</p>
      </div>

      <div>
        <div className="description-tags">
          <h4>Description</h4>
          <p>{gearDetails.description}</p>
          <div className="container">
            {gearDetails?.category_name && (
              <div className="chip">{gearDetails?.display_name}</div>
            )}
            {gearDetails?.gender && (
              <div className="chip">{gearDetails?.gender}</div>
            )}
            {gearDetails?.brand && (
              <div className="chip">{gearDetails?.brand}</div>
            )}
            {gearDetails?.condition && (
              <div className="chip">{gearDetails?.condition}</div>
            )}
            {gearDetails?.shape && (
              <div className="chip">{gearDetails?.shape}</div>
            )}
            {gearDetails?.size && (
              <div className="chip">{gearDetails?.size}</div>
            )}
            {gearDetails?.lacing_system && (
              <div className="chip">{gearDetails?.lacing_system}</div>
            )}
            {gearDetails?.profile && (
              <div className="chip">{gearDetails?.profile}</div>
            )}
            {gearDetails?.flex && (
              <div className="chip">{gearDetails?.flex}</div>
            )}
          </div>
        </div>
      </div>
      <h4>Seller Details</h4>
      <div>
        <p>Preferred Payment</p>
        <p>{user.preferred_payment}</p>
        <p>Username: {user.payment_username}</p>
      </div>
      <div>
        <p>Contact Seller</p>
        <a href={userEmail}>{gearDetails.email}</a>
      </div>

      <button
        className="close-button"
        onClick={() => dispatch({ type: "CLOSE_DETAIL_VIEW" })}
      >
        Close
      </button>
      <Modal
        ariaHideApp={false}
        isOpen={modalStatus.enlargeView}
        onRequestClose={() => dispatch({ type: "ENLARGE_IMAGE_CLOSE" })}
        styles={customStyles}
        contentLabel="Detail View"
      >
        <img
          onClick={() => dispatch({ type: "ENLARGE_IMAGE_CLOSE" })}
          className="cancel-button"
          src="images/cancel.svg"
        />
        <img src={gearDetails?.image[imageCounter]} />
      </Modal>
    </>
  );
}
