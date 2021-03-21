import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

export default function SwapAdmin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const ownedSwaps = useSelector((state) => state?.ownedSwaps);

  useEffect(() => {
    dispatch({ type: 'FETCH_OWNED_SWAPS' });
  }, []);

  const handleClick = (swap) => {
    history.push(`/createEvent/edit/${swap.id}`);
  };

  return (
    <div className="swap-admin-container">
      <p className="modal-header white-text">Swap Admin</p>
      <ul className="swap-list">
        {ownedSwaps?.map((swap) => {
          return (
            <li className="li-with-button" key={swap.id}>
              <div>{swap.name}</div>
              <div>
                {new Date(swap.stop_date) > new Date() ? (
                  <button
                    className="no-style-button"
                    onClick={() => handleClick(swap)}
                  >
                    <div className="blue-circle">
                      <img src="images/pencil.svg" alt="" />
                    </div>
                  </button>
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
