import React, { useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SwapCodeModal from "../SwapCodeModal/SwapCodeModal";

// component to render on landing page
// displays all swaps on the app that you have not joined
export default function AllSwaps() {
  const dispatch = useDispatch();
  const allSwaps = useSelector((state) => state.allSwaps);
  const joinedSwaps = useSelector((state) => state.joinedSwaps);
  const modalStatus = useSelector((state) => state.modal);
  const history = useHistory();

  // dispatch on page load to fetch data from allSwaps reducer
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_SWAPS" });
  }, []);

  //handleClick runs on click of swaps under the joined area
  const handleClick = (swap) => {
    history.push(`/swapItems/${swap.id}`);
  };

  //handleClickAll runs when swaps a user hasn't joined are clicked.
  //The if statement determines if a user has clicked on a private swap that they haven't yet joined.
  //If the user doesn't have access to the swap a modal asking for the access code will open.
  const handleClickAll = (swap) => {
    if (swap.is_private) {
      dispatch({ type: "SWAP_CODE_OPEN" });
      dispatch({ type: "SET_SELECTED_SWAP", payload: swap });
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
            <div key={swap.id} onClick={() => handleClick(swap)}>
              {new Date(swap.stop_date) > new Date() && (
                <div className="swap-card">
                  <img src={swap.swap_img} alt="" />
                  <div className="title-lock">
                    <p>{swap.name}</p>
                  </div>
                  <div className="days-until">
                    {swap.swap_open ? (
                      <p>
                        Days Remaing:{" "}
                        {Math.round(
                          (new Date(swap.stop_date) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        ).toString()}
                      </p>
                    ) : (
                      <p>
                        Days until swap:{" "}
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
            <div key={swap.id} onClick={() => handleClickAll(swap)}>
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
                        Days Remaing:{" "}
                        {Math.round(
                          (new Date(swap.stop_date) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        ).toString()}
                      </p>
                    ) : (
                      <p>
                        Days until swap:{" "}
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
        onRequestClose={() => dispatch({ type: "SWAP_CODE_CLOSE" })}
        // styles={customStyles}
        contentLabel="Detail View"
        className="access-modal"
      >
        <SwapCodeModal />
      </Modal>
    </div>
  );
}
