import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Carousel from "react-elastic-carousel";
function ContactSeller() {
  const gearDetails = useSelector((state) => state?.gearDetails);
  const modalStatus = useSelector((state) => state.modal);
  const dispatch = useDispatch();

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
  const breakPoints = [
    { width: 100, itemsToShow: 1 },
    // // { width: 50, itemsToShow: 2 },
    // // { width: 678, itemsToShow: 3 },
    // // { width: 1200, itemsToShow: 4 },
  ];
  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalStatus.enlargeView}
      styles={customStyles}
      contentLabel="Contact Seller"
    >
      <Carousel className="carousel" breakPoints={breakPoints}>
        {gearDetails.image.map((images) => {
          return (
            <div className="modalImages">
              <img src={images}></img>
            </div>
          );
        })}
      </Carousel>
      <div className="seller-price">
        <p className="seller">Seller: {gearDetails.username}</p>
        <p className="price">Price: ${gearDetails.price}</p>
      </div>
      <button>View details</button>
      <input></input>
      <button>Send</button>
      <button>Close</button>
    </Modal>
  );
}
export default ContactSeller;
