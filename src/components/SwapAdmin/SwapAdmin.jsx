import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SwapAdmin() {
  const dispatch = useDispatch();
  const ownedSwaps = useSelector((state) => state?.ownedSwaps);

  console.log('ownedSwaps', ownedSwaps);
  console.log('Date.now', new Date());

  useEffect(() => {
    dispatch({ type: 'FETCH_OWNED_SWAPS' });
  }, []);

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
                  <button>Edit Swap</button>
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
