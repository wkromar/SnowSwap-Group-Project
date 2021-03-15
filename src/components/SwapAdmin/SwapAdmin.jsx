import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

export default function SwapAdmin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const ownedSwaps = useSelector((state) => state?.ownedSwaps);

  console.log('ownedSwaps', ownedSwaps);
  console.log('Date.now', new Date());

  useEffect(() => {
    dispatch({ type: 'FETCH_OWNED_SWAPS' });
  }, []);

  const handleClick = (swap) => {
    dispatch({ type: 'SET_SELECTED_SWAP', payload: swap });
    history.push('/createEvent/edit')
  };

  return (
    <div className="top-margin">
      <p>SWAP ADMIN:</p>
      <ul>
        {ownedSwaps?.map((swap) => {
          return (
            <li className="li-with-button" key={swap.id}>
              <div>{swap.name}</div>
              <div>
                {new Date(swap.stop_date) > new Date() ? (
                    <button onClick={() => handleClick(swap)}>Edit Swap</button>
                ) : (
                  <p>Swap Has Ended</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
