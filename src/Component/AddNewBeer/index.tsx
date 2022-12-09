import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddBeerModal from "./AddBeerModal";

const AddNewBeerDetails = () => {
  const [showAddBeerModal, setShowAddBeerModal] = useState(false);

  const handleAddNewBeerButton = (value: boolean) => {
    setShowAddBeerModal(value);
  };

  return (
    <>
      <div className="add-beer-button-container">
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleAddNewBeerButton(true)}
        >
          +
        </Button>
      </div>

      {showAddBeerModal && (
        <AddBeerModal
          showAddBeerModal={showAddBeerModal}
          handleAddNewBeerButton={handleAddNewBeerButton}
        />
      )}
    </>
  );
};

export default AddNewBeerDetails;
