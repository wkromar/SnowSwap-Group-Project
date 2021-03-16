import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AllSwaps.css';

export default function AllSwaps() {
  const dispatch = useDispatch();
  const allSwaps = useSelector((state) => state.allSwaps);
  const joinedSwaps = useSelector((state) => state.joinedSwaps);
  const history = useHistory();
  console.log(allSwaps);

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_SWAPS' });
  }, []);

  const handleClick = (swap) => {
    dispatch({ type: 'SET_SELECTED_SWAP', payload: swap });
    localStorage.setItem('swap-object', JSON.stringify(swap));
    history.push('/swapItems');
  };

  const handleClickAll = (swap) => {
    if (swap.is_private) {
      
    } else {
      dispatch({ type: 'SET_SELECTED_SWAP', payload: swap });
      localStorage.setItem('swap-object', JSON.stringify(swap));
      history.push('/swapItems');
    }
  };

  return (
    <div>
      <div>My Swaps:</div>
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
      <div>All Swaps:</div>
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
    </div>
  );
}
