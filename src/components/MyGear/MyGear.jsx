import { useState } from "react";
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
      transform             : 'translate(-50%, -50%)'
    }
  };

export default function MyGear() {
  let boxes = [1, 2, 3, 4, 5, 6, 7];

  const dispatch = useDispatch();

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
        {boxes.map((box) => (
          <div className="item">
            <img onClick={() => dispatch({type: 'OPEN_DETAIL_VIEW'})} className="image" src="images/menu_icon.svg" />
            <img className="favorite-icon" src="images/favorite.svg" />
            <p className="name"> Name | $ </p>
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
          hello
          <button onClick={() => dispatch({type: 'CLOSE_DETAIL_VIEW'})}>Close</button>
      </Modal>
    </>
  );
}
