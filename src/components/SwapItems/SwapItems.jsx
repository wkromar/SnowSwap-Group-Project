import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import '../SwapItems/SwapItems.css';
import DetailsView from '../DetailsView/DetailsView';
import FilterDrawer from '../FilterDrawer/FilterDrawer';

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
  
  useEffect(() => {
    dispatch({ type: 'FETCH_SWAP_ITEMS', payload: selectedSwap });
  }, []);
  
  const handleAddGearToSwap = () => {
    return console.log('Clicked Add Gear To This Swap');
  };

  const favoriteItem = (piece) => {
    dispatch({ type: 'FAVORITE_ITEM', payload: piece });
  };

  const gearClicked = (piece) => {
    dispatch({ type: 'SELECTED_PIECE', payload: piece });
    dispatch({ type: 'OPEN_DETAIL_VIEW' });
  };

  console.log('swapItems:', swapItems);


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
      <p className="title"> Swap ID: {selectedSwap.id} (need access to swap name) </p>
      <div className="container">
        {swapItems &&
          swapItems?.map((piece) => (
            <div className="item">
              <img
                onClick={() => gearClicked(piece)}
                className="image"
                src={piece.image[0]}
              />
              <img
                onClick={() => favoriteItem(piece)}
                className="favorite-icon"
                src="images/favorite.svg"
              />
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
