import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddGearToSwap from "../AddGearToSwap/AddGearToSwap";
import DetailsView from "../DetailsView/DetailsView";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import "../SwapItems/SwapItems.css";
import ItemPublicJoinModal from "../ItemPublicJoinModal/ItemPublicJoinModal";

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
  overlay: { zIndex: 1000 },
};

export default function SwapItems() {
  const dispatch = useDispatch();

  const filterObject = useSelector((state) => state?.filterObject);
  //grab id out of the url
  const { id } = useParams();

  const selectedSwap = useSelector((state) => state?.selectedSwap);
  const user = useSelector((state) => state?.user);
  const swapItems = useSelector((state) => state?.swapItems);
  const gear = useSelector((state) => state.gear);
  const modalStatus = useSelector((state) => state.modal);
  const gearDetails = useSelector((state) => state?.gearDetails);
  const joinedSwaps = useSelector((state) => state.joinedSwaps);
  const stateOfItem = useSelector((state) => state?.stateOfItem);
  const stateOfContact = useSelector((state) => state?.stateOfContact);

  const [descriptionShow, setDescriptionShow] = useState(false);
  useEffect(() => {
    dispatch({ type: "FETCH_SWAP_ITEMS", payload: selectedSwap });
    dispatch({ type: "FETCH_SELECTED_SWAP", payload: id });
    console.log(selectedSwap.id);
  }, []);

  const handleAddGearToSwap = () => {
    let publicOpen = !!joinedSwaps.find(
      (swap) => swap.id === selectedSwap[0].id
    );
    if (publicOpen === false) {
      dispatch({ type: "OPEN_ITEM_JOIN" });
    } else if (publicOpen === true) {
      dispatch({ type: "OPEN_ADD_VIEW" });
    }
  };

  const favoriteItem = (piece) => {
    if (piece.favorites_id) {
      dispatch({ type: "UNFAVORITE_ITEM", payload: [piece, id] });
    } else {
      dispatch({ type: "FAVORITE_ITEM", payload: [piece, id] });
    }
  };

  const gearClicked = (piece) => {
    dispatch({ type: "SELECTED_PIECE", payload: piece });
    dispatch({ type: "OPEN_DETAIL_VIEW" });
  };

  const removeGear = (swapItemId) => {
    dispatch({
      type: "REMOVE_FROM_SWAP",
      payload: { swap_item_id: swapItemId, swap_id: id },
    });
  };

  // const filterObject = useSelector((state) => state?.filterObject);

  let filteredSwapItems = swapItems.filter((item) => {
    for (let key in filterObject) {
      if (item[key] !== filterObject[key]) {
        return false;
      }
    }
    return true;
  });

  const showHideDescription = () => {
    setDescriptionShow(!descriptionShow);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_SWAP_ITEMS", payload: id });
  }, []);

  return (
    <>
      <div className="swap-header">
        {selectedSwap[0]?.name}
        <div className="add-filter">
          <button className="no-style-button" onClick={handleAddGearToSwap}>
            <img src="images/plus.svg" alt="A plus symbol in a circle" />
          </button>
          <FilterDrawer />
        </div>
      </div>
      <div className="description-button-container">
        <button onClick={showHideDescription} className="no-style-button">
          Swap Description
        </button>
        <img
          className={`arrow-${descriptionShow ? "down" : "right"}`}
          onClick={showHideDescription}
          src="images/arrow.svg"
          alt=""
        />
      </div>
      <div
        className={`swap-description-container${
          descriptionShow ? "-show" : "-hide"
        }`}
      >
        <p>{selectedSwap[0]?.swap_description}</p>
      </div>

      <div className="container">
        {filteredSwapItems
          ? filteredSwapItems?.map((piece) => (
              <div key={piece.id} className="swap-card item-card">
                <img
                  onClick={() => gearClicked(piece)}
                  className="image"
                  src={piece.image[0]}
                />
                <div className="title-lock">
                  ${piece.price}
                  <div onClick={() => favoriteItem(piece)}>
                    {piece.favorites_id ? (
                      <img
                        className="favorite-icon card-cancel"
                        src="images/favorite.svg"
                      />
                    ) : (
                      <img
                        className="favorite-icon card-cancel"
                        src="images/unfavorite.svg"
                      />
                    )}
                  </div>
                </div>
                <div className="days-until">
                  <p className="name">{piece.title}</p>
                  {user.id == piece.user_id && (
                    <button
                      onClick={() => removeGear(piece.swap_item_id)}
                      className="no-style-button"
                    >
                      <img
                        className="card-cancel"
                        src="images/cancel.svg"
                        alt=""
                      />
                    </button>
                  )}
                </div>
              </div>
            ))
          : swapItems?.map((piece) => (
              <div className="item">
                <img
                  onClick={() => gearClicked(piece)}
                  className="image"
                  src={piece.image[0]}
                />
                <div onClick={() => favoriteItem(piece)}>
                  {piece.favorites_id ? (
                    <img className="favorite-icon " src="images/favorite.svg" />
                  ) : (
                    <img
                      className="favorite-icon"
                      src="images/unfavorite.svg"
                    />
                  )}
                </div>
                <p className="name">
                  {" "}
                  {piece.title} | ${piece.price}{" "}
                </p>
                {user.id == piece.user_id && (
                  <button
                    onClick={() => removeGear(piece.swap_item_id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={modalStatus.detailView}
        onRequestClose={() => dispatch({ type: "CLOSE_DETAIL_VIEW" })}
        styles={customStyles}
        className="details-modal"
        contentLabel="Detail View"
      >
        <DetailsView />
      </Modal>
      <Modal
        ariaHideApp={false}
        isOpen={modalStatus.addGearView}
        onRequestClose={() => dispatch({ type: "CLOSE_ADD_VIEW" })}
        styles={customStyles}
        className="details-modal"
        contentLabel="Add View"
      >
        <AddGearToSwap />
      </Modal>
      <Modal
        ariaHideApp={false}
        isOpen={modalStatus.ItemPublicJoinView}
        onRequestClose={() => dispatch({ type: "CLOSE_PUBLIC_JOIN" })}
        // styles={customStyles}
        contentLabel="Item Public Join View"
        className="access-modal"
      >
        <ItemPublicJoinModal />
      </Modal>
    </>
  );
}
