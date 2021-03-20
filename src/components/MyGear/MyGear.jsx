import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FilterDrawer from '../FilterDrawer/FilterDrawer';
import '../MyGear/MyGear.css';

export default function MyGear() {
  const dispatch = useDispatch();
  const history = useHistory();

  const filterObject = useSelector((state) => state?.filterObject);

  useEffect(() => {
    dispatch({ type: 'FETCH_GEAR' });
  }, []);

  const gear = useSelector((state) => state.gear);
  const gearDetails = useSelector((state) => state?.gearDetails);

  const handleAddGear = () => {
    console.log('Clicked Add Gear');
    history.push('/addGear');
  };

  // "SELECTED_PIECE";
  const gearClicked = (piece) => {
    dispatch({ type: 'EDIT_GEAR', payload: piece });
    history.push(`/editGear`);
  };

  let filteredGear = gear.filter((item) => {
    for (let key in filterObject) {
      if (item[key] !== filterObject[key]) {
        console.log(`it's a match`);
        return false;
      }
    }
    return true;
  });

  return (
    <>
      <div className="swap-header">
        My Gear
        <div className="add-filter">
          <button className="no-style-button" onClick={handleAddGear}>
            <img src="images/plus.svg" alt="A plus symbol in a circle" />
          </button>
          <FilterDrawer />
        </div>
      </div>

      <div className="container">
        {filteredGear
          ? filteredGear.map((piece) => (
              <div className="swap-card item-card">
                <img
                  onClick={() => gearClicked(piece)}
                  className="image"
                  src={piece.image[0]}
                />
                <div className="title-lock">${piece.price}</div>
                <div className="days-until">
                  <p className="name">{piece.title}</p>
                </div>
              </div>
            ))
          : gear.map((piece) => (
              <div className="item">
                <img
                  onClick={() => gearClicked(piece)}
                  className="image"
                  src={piece.image[0]}
                />
                <p className="name">{piece.title}</p>
                <p className="mygear-price">${piece.price}</p>
              </div>
            ))}
      </div>
    </>
  );
}
