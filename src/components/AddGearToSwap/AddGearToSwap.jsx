import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import '../AddGearToSwap/AddGearToSwap.css';

export default function AddGearToSwap() {
  const dispatch = useDispatch();

  //grab id out of the url
  const { id } = useParams();

  const gear = useSelector((state) => state?.gear);
  const selectedSwap = useSelector((state) => state?.selectedSwap);
  const gearToAdd = useSelector((state) => state?.gearToAdd);
  const swapItems = useSelector((state) => state?.swapItems);
  const [availableItems, setAvailableItems] = useState([]);

  useEffect(() => {
    dispatch({ type: 'FETCH_GEAR_TO_ADD', payload: id });
  }, [swapItems]);

  useEffect(() => {
    dispatch({ type: 'FETCH_SELECTED_SWAP', payload: id });
  }, []);

  const addGear = (piece) => {
    dispatch({
      type: 'ADD_SELECTED_TO_SWAP',
      payload: { piece_id: piece.id, id },
    });
  };

  return (
    <>
      <div className="header-title modal-header">
        <p>Add your items to: {selectedSwap[0].name}</p>
        <img
          onClick={() => dispatch({ type: 'CLOSE_ADD_VIEW' })}
          src="images/cancel-white.svg"
          alt=""
        />
      </div>
      <div className="container">
        {gear?.map((piece) => (
          <div className="swap-card add-card">
            <div className="title-lock">
              ${piece.price}
              <button
                onClick={() => addGear(piece)}
                className="no-style-button"
              >
                <img className="add-button" src="images/plus.svg" alt="" />
              </button>
            </div>
            <img className="image" src={piece.image[0]} />
            <div className="days-until">
              <p className="name">{piece.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
