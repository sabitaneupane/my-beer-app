import React from "react";
import { Button } from "react-bootstrap";

const AddNewBeerDetails = () => {
  return (
    <div className="add-beer-button-container">
      <Button variant="primary" size="sm">
        Add a new beer
      </Button>
    </div>
  );
};

export default AddNewBeerDetails;
