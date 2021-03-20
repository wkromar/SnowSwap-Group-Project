import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SwapCodeModal from '../SwapCodeModal/SwapCodeModal';

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

export default function AllSwaps() {
  const dispatch = useDispatch();
  const allSwaps = useSelector((state) => state.allSwaps);
  const joinedSwaps = useSelector((state) => state.joinedSwaps);
  const modalStatus = useSelector((state) => state.modal);
  const history = useHistory();
  console.log(allSwaps);

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_SWAPS' });
  }, []);

  const handleClick = (swap) => {
    history.push(`/swapItems/${swap.id}`);
  };

  const handleClickAll = (swap) => {
    if (swap.is_private) {
      dispatch({ type: 'SWAP_CODE_OPEN' });
      dispatch({ type: 'SET_SELECTED_SWAP', payload: swap });
    } else {
      history.push(`/swapItems/${swap.id}`);
    }
  };

  return (
    <div>
      <div className="swap-header">Joined Swaps</div>
      <div className="card-container">
        {joinedSwaps.map((swap) => {
          return (
            <div onClick={() => handleClick(swap)}>
              {new Date(swap.stop_date) > new Date() && (
                <div className="swap-card">                  
                    <img src={swap.swap_img} alt="" />
                  <div className="title-lock">
                    <p>{swap.name}</p>
                  </div>
                  <div className="days-until">
                    {swap.swap_open ? (
                      <p>
                        Days Remaing:{' '}
                        {Math.round(
                          (new Date(swap.stop_date) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        ).toString()}
                      </p>
                    ) : (
                      <p>
                        Days until swap:{' '}
                        {Math.round(
                          (new Date(swap.sell_date) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        ).toString()}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="swap-header">All Swaps</div>
      <div className="card-container">
        {allSwaps.map((swap) => {
          return (
            <div onClick={() => handleClickAll(swap)}>
              {new Date(swap.stop_date) > new Date() && (
                <div className="swap-card">
                  <img src={swap.swap_img} alt="" />
                  <div className="title-lock">
                    <p>{swap.name}</p>
                    {swap.is_private && <img src="images/lock.svg" />}
                  </div>
                  <div className="days-until">
                    {swap.swap_open ? (
                      <p>
                        Days Remaing:{' '}
                        {Math.round(
                          (new Date() - new Date(swap.stop_date)) /
                            (1000 * 60 * 60 * 24)
                        ).toString()}
                      </p>
                    ) : (
                      <p>
                        Days until swap:{' '}
                        {Math.round(
                          (new Date(swap.sell_date) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        ).toString()}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={modalStatus.swapCodeView}
        onRequestClose={() => dispatch({ type: 'SWAP_CODE_CLOSE' })}
        styles={customStyles}
        contentLabel="Detail View"
      >
        <SwapCodeModal />
      </Modal>
    </div>
  );
}
