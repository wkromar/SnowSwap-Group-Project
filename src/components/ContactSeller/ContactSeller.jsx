import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
function ContactSeller() {
  const modalStatus = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalStatus.enlargeView}
      styles={customStyles}
      contentLabel="Contact Seller"
    ></Modal>
  );
}
export default ContactSeller;
