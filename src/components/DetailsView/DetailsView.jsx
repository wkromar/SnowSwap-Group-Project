import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import "../DetailsView/DetailsView.css";

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

  const dispatch = useDispatch();

  const [imageCounter, setImageCounter] = useState(0);

  const handleNextPicture = (direction) => {
      console.log(direction)
      console.log(gearDetails.image.length-1)
      if (direction === 'next' && imageCounter < gearDetails.image.length-1){
          setImageCounter(imageCounter + 1);
      }
      else if (direction === 'next' && imageCounter === gearDetails.image.length-1) {
        setImageCounter(0);
      }
      else if (direction === 'back' && imageCounter > 0) {
          setImageCounter(imageCounter -1);
      }
      else if (direction === 'back' && imageCounter === 0) {
        setImageCounter(gearDetails.image.length-1);
      }
  };

  console.log('imageCounter:', imageCounter);

  return (
    <>
      <div className="modalImages">
        <div onClick = {() => handleNextPicture('back')} className="left-arrow"></div>
        <img onClick = {() => dispatch({type: 'ENLARGE_IMAGE_OPEN'})} src={gearDetails?.image[imageCounter]} />
        <div onClick = {() => handleNextPicture('next')} className="right-arrow"></div>
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
        <img src={gearDetails?.image[imageCounter]} />
      </Modal>
    </>
  );
}
