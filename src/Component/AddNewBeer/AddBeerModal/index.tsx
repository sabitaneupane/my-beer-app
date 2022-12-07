import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import beerImg from "../../../Images/beer-img.png";

interface IProps {
  showAddBeerModal: boolean;
  handleAddNewBeerButton: any;
}

const AddBeerModal = (props: IProps) => {
  const { showAddBeerModal, handleAddNewBeerButton } = props;

  const handleClose = () => {
    handleAddNewBeerButton(false);
  };

  const addNewBeerFormContent = () => {
    return (
      <Form>
        <Card.Img variant="bottom" src={beerImg} className="form-beers-img"/>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Beer Name*" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Genre*" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control as="textarea" placeholder="Description*" rows={3} />
        </Form.Group>
      </Form>
    );
  };

  return (
    <Modal show={showAddBeerModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Add a New Beer</Modal.Title>
      </Modal.Header>
      <Modal.Body>{addNewBeerFormContent()}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBeerModal;
