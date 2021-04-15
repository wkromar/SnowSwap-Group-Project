import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function PublicSwapJoinModal() {
  const selectedSwap = useSelector((state) => state?.selectedSwap);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    // add this swap the the user's joined swaps, then close the modal
    dispatch({ type: "PRIVATE_TO_PUBLIC", payload: selectedSwap.id });
    dispatch({ type: "SWAP_CODE_CLOSE" });
    history.push(`/swapItems/${selectedSwap.id}`);
  };

  // a modal to prompt the user to join a public swap.
  return (
    <>
      <div className="modal-header justify-end">
        <button
          className="no-style-button"
          onClick={() => dispatch({ type: "SWAP_CODE_CLOSE" })}
        >
          <img src="images/cancel-white.svg" alt="" />
        </button>
      </div>
      <div className="code-modal-container">
        <h3>
          Before you continue, {selectedSwap?.name} requests that you join the
          swap.
        </h3>
        <br />
        <p>Swap Description:</p>
        <p>{selectedSwap?.swap_description}</p>
        <form onSubmit={handleSubmit}>
          <div className="button-container">
            <button className="ss-btn" type="submit">
              Join Swap
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
