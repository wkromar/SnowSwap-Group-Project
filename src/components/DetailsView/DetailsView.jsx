import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../DetailsView/DetailsView.css";
import "../Favorites/Favorites.css";
import ContactPublicJoinModal from "../ContactPublicJoinModal/ContactPublicJoinModal";

// component to render modal with details about one item
export default function DetailsView() {
  const gearDetails = useSelector((state) => state?.gearDetails);
  const selectedSwap = useSelector((state) => state?.selectedSwap);
  const modalStatus = useSelector((state) => state.modal);
  const joinedSwaps = useSelector((state) => state.joinedSwaps);
  const user = useSelector((state) => state?.user);
  const [canContact, setCanContact] = useState(false);
  const [emailBody, setEmailBody] = useState("");
  const userEmail = `mailto:${gearDetails.email}?subject=Requesting more information on your Snowswaps Item: ${gearDetails.title}`;
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_SELECTED_SWAP", payload: id });
  }, []);
  // sets item as favorite
  const favoriteItem = (piece) => {
    if (piece.favorites_id) {
      setFavStatus(false);
      dispatch({ type: "UNFAVORITE_ITEM", payload: [piece, id] });
    } else {
      setFavStatus(true);
      dispatch({ type: "FAVORITE_ITEM", payload: [piece, id] });
    }
  };
  // before a seller can be contacted, the user must join the swap.
  const joinSwap = () => {
    let publicOpen = !!joinedSwaps.find(
      (swap) => swap.id === selectedSwap[0].id
    );
    if (publicOpen === false) {
      dispatch({ type: "OPEN_CONTACT_JOIN" });
      setCanContact(true);
    } else if (publicOpen === true) {
      setCanContact(true);
    }
  };

  // image carousel, state and function to run on click
  const [imageCounter, setImageCounter] = useState(0);
  // carousel functionality without using carousel library
  const handleNextPicture = (direction) => {
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

  return (
    <>
      <div className="modal-header">
        <h3 className="header-title">
          ${gearDetails.price} - {gearDetails?.title}
        </h3>
        <div onClick={() => favoriteItem(gearDetails)}>
          {gearDetails.favorites_id ? (
            <img className="favorite-icon" src="images/favorite.svg" />
          ) : (
            <img className="favorite-icon" src="images/unfavorite.svg" />
          )}
        </div>
      </div>
      <div className="detail-view-container">
        <div className="item-user-img-container">
          <div className="modalImages">
            <div
              onClick={() => handleNextPicture("back")}
              className="left-arrow"
            >
              <img className="right-arrow-icon" src="images/left_arrow.svg" />
            </div>
            <img
              onClick={() => dispatch({ type: "ENLARGE_IMAGE_OPEN" })}
              src={gearDetails?.image[imageCounter]}
            />
            <div
              onClick={() => handleNextPicture("next")}
              className="right-arrow"
            >
              <img className="right-arrow-icon" src="images/right_arrow.svg" />
            </div>
          </div>
          <div className="seller-price">
            <div className="round-frame">
              <img
                className="profile-img"
                src={gearDetails.user_image}
                alt=""
              />
            </div>
            <p className="seller">Seller: {gearDetails.username}</p>
          </div>
        </div>
        <div>
          <div className="description-tags">
            <br />
            <h4>Description</h4>
            <p>{gearDetails.description}</p>
            <div className="chip-container">
              {gearDetails?.display_name && (
                <div className="chip">
                  Category: {gearDetails?.display_name}
                </div>
              )}
              {gearDetails?.gender && (
                <div className="chip">Gender: {gearDetails?.gender}</div>
              )}
              {gearDetails?.brand && (
                <div className="chip">Brand: {gearDetails?.brand}</div>
              )}
              {gearDetails?.condition && (
                <div className="chip">Condition: {gearDetails?.condition}</div>
              )}
              {gearDetails?.shape && (
                <div className="chip">Shape: {gearDetails?.shape}</div>
              )}
              {gearDetails?.size && (
                <div className="chip">Size: {gearDetails?.size}</div>
              )}
              {gearDetails?.lacing_system && (
                <div className="chip">
                  Lacing System: {gearDetails?.lacing_system}
                </div>
              )}
              {gearDetails?.profile && (
                <div className="chip">Profile: {gearDetails?.profile}</div>
              )}
              {gearDetails?.flex && (
                <div className="chip">Flex: {gearDetails?.flex}</div>
              )}
            </div>
          </div>
        </div>
        <br />
        {gearDetails.swap_open && (
          <>
            <h4>Seller Details</h4>
            <div>
              <p>Preferred Payment: {gearDetails.preferred_payment}</p>
              <p>Username: {gearDetails.payment_username}</p>
            </div>
            {canContact === true ? (
              <div>
                <p>Contact Seller</p>
                <form action={userEmail} method="get">
                  <div>
                    <label for="name">
                      Name:
                      <input type="text" name="name" id="name" />
                    </label>
                  </div>
                  <div>
                    <label for="subject">
                      Subject:
                      <input type="text" name="subject" id="subject" />
                    </label>
                  </div>
                  <div>
                    <label>Body:</label>
                    <br />
                    <textarea name="body" rows="12" cols="35">
                      Inquire about the item.
                    </textarea>
                  </div>

                  <div>
                    <button type="submit" name="submit">
                      Submit
                    </button>
                    <button type="reset" name="reset" value="Clear Form">
                      Clear Form
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <button className="chip" onClick={joinSwap}>
                  Contact Seller
                </button>
              </div>
            )}
          </>
        )}
        <div className="modal-button-container">
          <button
            className="ss-btn"
            onClick={() => dispatch({ type: "CLOSE_DETAIL_VIEW" })}
          >
            Close
          </button>
        </div>
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={modalStatus.enlargeView}
        onRequestClose={() => dispatch({ type: "ENLARGE_IMAGE_CLOSE" })}
        className="img-modal"
        contentLabel="Detail View"
      >
        <img
          onClick={() => dispatch({ type: "ENLARGE_IMAGE_CLOSE" })}
          className="cancel-button"
          src="images/cancel.svg"
        />
        <img src={gearDetails?.image[imageCounter]} />
      </Modal>
      <Modal
        ariaHideApp={false}
        isOpen={modalStatus.ContactPublicJoinView}
        onRequestClose={() => dispatch({ type: "CLOSE_PUBLIC_JOIN" })}
        // styles={customStyles}
        contentLabel="Public Join View"
        className="access-modal"
      >
        <ContactPublicJoinModal />
      </Modal>
    </>
  );
}
