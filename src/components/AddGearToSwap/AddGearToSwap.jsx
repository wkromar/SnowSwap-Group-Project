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
    dispatch({ type: "FETCH_SELECTED_SWAP", payload: id});
  }, []);

  const addGear = (piece) => {
    dispatch({
      type: 'ADD_SELECTED_TO_SWAP',
      payload: { piece_id: piece.id, id },
    });
  };

  return (
    <>
      <p className="title"> Add your items to: <br/> {selectedSwap[0].name} </p>
      <div className="container">
        {gear?.map((piece) => (
          <div className="item">
            <img className="image" src={piece.image[0]} />
            <p className="name">{piece.title}</p>
            <p className="mygear-price">${piece.price}</p>
            <button onClick={() => addGear(piece)} className="add-button">
              Add
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
