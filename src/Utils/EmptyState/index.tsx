import React, { useState } from "react";
import AddBeerModal from "../../Component/AddNewBeer/AddBeerModal";

interface IProps {
  isMyBeers: boolean;
}

const EmptyState = (props: IProps) => {
  const { isMyBeers } = props;
  const [showAddBeerModal, setShowAddBeerModal] = useState(false);

  const handleAddNewBeerButton = (value: boolean) => {
    setShowAddBeerModal(value);
  };
  return (
    <>
      <div className="empty-state-container">
        <div> Nothing to see yet </div>
        {isMyBeers && (
          <div>
            {" "}
            <span
              className="click-here-text"
              onClick={() => handleAddNewBeerButton(true)}
            >
              Click here{" "}
            </span>{" "}
            to add your first beer!{" "}
          </div>
        )}
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

export default EmptyState;
