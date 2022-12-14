import React, { useState, useContext } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import AddBeerForm from "../AddBeerForm";
import MyBeerContext from "../../../Context/myBeerContext";
import { Beers } from "../../../Types/beers";
import { IAlert } from "../../../Types";

interface IProps {
  showAddBeerModal: boolean;
  handleAddNewBeerButton: any;
}

const AddBeerModal = (props: IProps) => {
  const { showAddBeerModal, handleAddNewBeerButton } = props;
  const { addCustomBeerDetails } = useContext(MyBeerContext);

  const [beerFormData, setBeerFormData] = useState<Beers>({
    name: "",
    genre: "",
    description: "",
  });
  const [alertObj, setAlertObj] = useState<IAlert>({
    isShown: false,
    variant: "",
    message: "",
  });

  const handleClose = () => {
    handleAddNewBeerButton(false);
  };

  const beerDataValidate = () => {
    if (
      beerFormData &&
      (beerFormData.name === "" ||
        beerFormData.genre === "" ||
        beerFormData.description === "")
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSaveBeerData = () => {
    const isValid = beerDataValidate();

    if (!isValid) {
      setAlertObj({
        isShown: true,
        variant: "danger",
        message: "All field are required.",
      });
      return;
    }

    addCustomBeerDetails(beerFormData);
    setAlertObj({
      isShown: true,
      variant: "success",
      message: "Beer data saved successfully.",
    });

    handleClose();
  };

  const handleFormData = (formData: Beers) => {
    setBeerFormData(formData);
  };

  const alertContent = () => {
    return (
      alertObj &&
      alertObj.isShown && (
        <Alert key={alertObj.variant} variant={alertObj.variant}>
          {alertObj.message}
        </Alert>
      )
    );
  };

  return (
    <Modal show={showAddBeerModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Add a New Beer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertContent()}
        <AddBeerForm handleFormData={handleFormData} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleSaveBeerData()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBeerModal;
