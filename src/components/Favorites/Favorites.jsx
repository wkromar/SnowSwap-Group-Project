import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import '../Favorites/Favorites.css';
import DetailsView from '../DetailsView/DetailsView';
import Swal from 'sweetalert2';
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

export default function Favorites() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITES' });
  }, []);

  const favorites = useSelector((state) => state?.favorites);
  const modalStatus = useSelector((state) => state.modal);
  const gearDetails = useSelector((state) => state?.gearDetails);

  console.log(gearDetails);

  const gearClicked = (piece) => {
    dispatch({ type: 'SELECTED_PIECE', payload: piece });
    dispatch({ type: 'OPEN_DETAIL_VIEW' });
  };

  const unFavorite = (piece) => {
    Swal.fire({
      title: `Remove ${piece.title} from favorites?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Removed from favorites!', '', 'success');
        dispatch({ type: 'UNFAVORITE_FROM_FAVORITES', payload: piece });
      }
    });
  };

  const filterObject = useSelector((state) => state?.filterObject);

  let filteredFavorites = favorites.filter((item) => {
    for (let key in filterObject) {
      if (item[key] !== filterObject[key]) {
        console.log(`it's a match`);
        return false;
      }
    }
    return true;
  });

  return (
    <>
      <div className="swap-header">
        Favorites
        <div className="add-filter">
          <FilterDrawer />
        </div>
      </div>
      <div className="container">
        {filteredFavorites
          ? filteredFavorites.map((piece) => (
              <div className="swap-card item-card">
                <img
                  onClick={() => gearClicked(piece)}
                  className="image"
                  src={piece.image[0]}
                />
                <div className="title-lock">${piece.price}
                <img
                  onClick={() => unFavorite(piece)}
                  className="favorite-icon card-cancel"
                  src="images/favorite.svg"
                />
                
                </div>
                <div className="days-until">
                  <p className="name">{piece.title}</p>
                </div>
              </div>
            ))
          : favorites.map((piece) => (
              <div className="item">
                <img
                  onClick={() => gearClicked(piece)}
                  className="image"
                  src={piece.image[0]}
                />
                <img
                  onClick={() => unFavorite(piece)}
                  className="favorite-icon"
                  src="images/favorite.svg"
                />
                <p className="name">{piece.title}</p>
                <p className="mygear-price">${piece.price}</p>
              </div>
            ))}
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={modalStatus.detailView}
        onRequestClose={() => dispatch({ type: 'CLOSE_DETAIL_VIEW' })}
        styles={customStyles}
        className="details-modal"
        contentLabel="Detail View"
      >
        <DetailsView />
      </Modal>
    </>
  );
}
