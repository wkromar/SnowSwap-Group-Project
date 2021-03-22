import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function SwapCodeModal() {
  const selectedSwap = useSelector((state) => state?.selectedSwap);
  const history = useHistory();
  const dispatch = useDispatch();
  const [passcode, setPasscode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passcode.toLowerCase() === selectedSwap.access_code) {
      dispatch({ type: 'PRIVATE_TO_PUBLIC', payload: selectedSwap.id });
      dispatch({ type: 'SWAP_CODE_CLOSE' });
      history.push(`/swapItems/${selectedSwap.id}`);
    }
  };

  return (
    <>
      <div className="modal-header justify-end">
        <button
          className="no-style-button"
          onClick={() => dispatch({ type: 'SWAP_CODE_CLOSE' })}
        >
          <img src="images/cancel.svg" alt="" />
        </button>
      </div>
      <div className="code-modal-container">
        <h3>
          {selectedSwap?.name} is private and requires a passcode to access.
        </h3>
        <br />
        <p>Swap Description:</p>
        <p>{selectedSwap?.swap_description}</p>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(event) => setPasscode(event.target.value)}
            value={passcode}
            type="text"
          />
          <div>
            <button type="submit">Join Swap</button>
            <a href={`mailto:${selectedSwap.email}`}>
              <button type="button">Request Access</button>
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
