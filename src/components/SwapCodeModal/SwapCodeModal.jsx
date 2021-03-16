import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function SwapCodeModal() {
  const selectedSwap = useSelector((state) => state?.selectedSwap);
  const [passcode, setPasscode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passcode.toLowerCase() === selectedSwap.access_code) {
      console.log('You did it');
    }
  };

  return (
    <div>
      <img src="images/cancel.svg" alt="" />
      <h3>This swap is private and requires a passcode to view.</h3>
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
  );
}
