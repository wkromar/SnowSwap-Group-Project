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
    <div>
      <ul>
        {ownedSwaps?.map((swap) => {
          return (
            <li key={swap.id}>
              <div>{swap.swap_name}</div>
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
