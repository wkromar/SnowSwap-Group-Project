import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import AllSwaps from "../AllSwaps/AllSwaps";

export default function SwapCodeModal() {
  const selectedSwap = useSelector((state) => state?.selectedSwap);
  const user = useSelector((state) => state?.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.modal);
  const [passcode, setPasscode] = useState("");
  const swapUserJoin = { id: user.id, swapId: selectedSwap.id };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passcode.toLowerCase() === selectedSwap.access_code) {
      dispatch({ type: "PRIVATE_TO_PUBLIC", payload: swapUserJoin });
    }
  };

  return (
    <div>
      <button onClick={() => dispatch({ type: "SWAP_CODE_CLOSE" })}>
        <img src="images/cancel.svg" alt="" />
      </button>
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
