import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import "../MyGear/MyGear.css";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      position              : 'relative'
    }
  };

export default function MyGear() {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_GEAR" });
    
  }, []);

 
  const gear = useSelector(state => state.gear)
  const modalStatus = useSelector(state => state.modal)

  const handleAddGear = () => {
    return console.log('Clicked Add Gear');
  }

  return (
    <>
      <div className="container">
        <button className="add-gear-button" onClick={handleAddGear}>Add Gear</button>
      </div>
      <p className="title"> Inventory </p>
      <div className="container">
        {gear.map((piece) => (
          <div className="item">
            <img onClick={() => dispatch({type: 'OPEN_DETAIL_VIEW'})} className="image" src="images/menu_icon.svg" />
            <img className="favorite-icon" src="images/favorite.svg" />
            <p className="name"> {piece.title} | ${piece.price} </p>
          </div>
        ))}
      </div>
      <Modal
      ariaHideApp={false}
      isOpen={modalStatus.detailView}
      onRequestClose={() => dispatch({type: 'CLOSE_DETAIL_VIEW'})}
      styles={customStyles}
      contentLabel="Detail View"
      >
          
          <button className="close-button" onClick={() => dispatch({type: 'CLOSE_DETAIL_VIEW'})}>Close</button>
      </Modal>
    </>
  );
}
