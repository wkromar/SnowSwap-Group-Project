import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import '../SwapItems/SwapItems.css';
import DetailsView from '../DetailsView/DetailsView';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

export default function SwapItems() {
  const dispatch = useDispatch();

  const selectedSwap = useSelector((state) => state?.selectedSwap);

  const swapItems = useSelector((state) => state?.swapItems);
  const gear = useSelector((state) => state.gear);
  const modalStatus = useSelector((state) => state.modal);
  const gearDetails = useSelector((state) => state?.gearDetails);
  const handleAddGearToSwap = () => {
    return console.log('Clicked Add Gear To This Swap');
  };

  const favoriteItem = (piece) => {
    if (piece.favorites_id) {
      dispatch({ type: 'UNFAVORITE_ITEM', payload: [piece, selectedSwap]})
    } else {
      dispatch({ type: 'FAVORITE_ITEM', payload: [piece, selectedSwap] });
    }
  };

  const gearClicked = (piece) => {
    dispatch({ type: 'SELECTED_PIECE', payload: piece });
    dispatch({ type: 'OPEN_DETAIL_VIEW' });
  };

  console.log('swapItems:', swapItems);

  useEffect(() => {
    const swapDetails = localStorage.getItem('swap-object');
      dispatch({ type: 'FETCH_SWAP_ITEMS', payload: JSON.parse(swapDetails) });
  }, []);

  return (
    <>
      <div className="container">
        <button className="add-gear-button" onClick={handleAddGearToSwap}>
          Add Gear To This Swap
        </button>
      </div>

      <p className="title">{selectedSwap.name}</p>

      <div className="container">
        {swapItems &&
          swapItems?.map((piece) => (
            <div className="item">
              <img
                onClick={() => gearClicked(piece)}
                className="image"
                src={piece.image[0]}
              />
              <div
              onClick={() => favoriteItem(piece)}
              >
                {piece.favorites_id ? <img
                className="favorite-icon"
                src="images/favorite.svg"
              /> : <img
              className="favorite-icon"
              src="images/unfavorite.svg"
            />}
                </div>
              <p className="name">
                {' '}
                {piece.title} | ${piece.price}{' '}
              </p>
            </div>
          ))}
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={modalStatus.detailView}
        onRequestClose={() => dispatch({ type: 'CLOSE_DETAIL_VIEW' })}
        styles={customStyles}
        contentLabel="Detail View"
      >
        <DetailsView />
      </Modal>
    </>
  );
}
