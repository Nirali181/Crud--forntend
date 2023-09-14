import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({ message,showModal,hideModal,id,ConfirmationModalData}) => {
 
    const handleDelete = (id)=>{
        ConfirmationModalData(id)
    }
  return (
    <div>
      {" "}
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleDelete(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
