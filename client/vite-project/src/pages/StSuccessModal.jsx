import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";


function StSuccessModal(props) {
  // Remove the 'history' import and the 'handleViewPageClick' function

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        {/* Use the Link component to navigate to "/stall-template" */}
        <Link to="/stallownerdash">
          <Button>View Page</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default StSuccessModal;
