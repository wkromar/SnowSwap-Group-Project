import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Modal from "react-modal";
import "../SwapItems/SwapItems.css";
import DetailsView from "../DetailsView/DetailsView";
import AddGearToSwap from "../AddGearToSwap/AddGearToSwap";
import FilterDrawer from '../FilterDrawer/FilterDrawer'

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


  useEffect(() => {
    dispatch({ type: 'FETCH_SWAP_ITEMS', payload: selectedSwap });
  }, []);

  const handleAddGearToSwap = () => {
    dispatch({ type: "OPEN_ADD_VIEW" });
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
    dispatch({ type: "REMOVE_FROM_SWAP", payload: {swap_item_id: swapItemId, swap_id: id} });
  };

  console.log('swapItems - filterObject:', filterObject);

  // const filterObject = useSelector((state) => state?.filterObject);
  
  let filteredSwapItems = swapItems.filter(item => {
    
    for (let key in filterObject) {
      if (item[key] !== filterObject[key]) {
        console.log(`it's a match`);
        return false;
      }
    } 
    return true;
    
  });

  console.log("swapItems:", swapItems);

  useEffect(() => {
    // const swapDetails = localStorage.getItem("swap-object");
    // dispatch({ type: "FETCH_SWAP_ITEMS", payload: JSON.parse(swapDetails) });
    dispatch({ type: 'FETCH_SWAP_ITEMS', payload: id });
  }, []);


  return (
    <>
      <div className="container">
        <button className="add-gear-button" onClick={handleAddGearToSwap}>
          Add Gear To This Swap
        </button>
        <button>
          <FilterDrawer />
        </button>
      </div>

      <p className="title">{selectedSwap.name}</p>

      <div className="container">
        {filteredSwapItems ? 
        filteredSwapItems?.map((piece) => (

          <div className="item">
            <img
              onClick={() => gearClicked(piece)}
              className="image"
              src={piece.image[0]}
            />
            <div onClick={() => favoriteItem(piece)}>
              {piece.favorites_id ? (
                <img className="favorite-icon" src="images/favorite.svg" />
              ) : (
                <img className="favorite-icon" src="images/unfavorite.svg" />
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
        )) : swapItems?.map((piece) => (

          <div className="item">
            <img
              onClick={() => gearClicked(piece)}
              className="image"
              src={piece.image[0]}
            />
            <div onClick={() => favoriteItem(piece)}>
              {piece.favorites_id ? (
                <img className="favorite-icon" src="images/favorite.svg" />
              ) : (
                <img className="favorite-icon" src="images/unfavorite.svg" />
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
        contentLabel="Detail View"
      >
        <DetailsView />
      </Modal>
      <Modal
        ariaHideApp={false}
        isOpen={modalStatus.addGearView}
        onRequestClose={() => dispatch({ type: "CLOSE_ADD_VIEW" })}
        styles={customStyles}
        contentLabel="Add View"
      >
        <AddGearToSwap selectedSwap={selectedSwap} />
      </Modal>
    </>
  );
}
