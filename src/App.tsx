import React from "react";
import ListBeerDetails from "./Component/ListBeerDetails";

const App = () => {
  return (
    <div className="container my-app-container">
      <h1 className="text-align-center mb-4"> My Beer App </h1>
      <div className="list-beer-container">
        <ListBeerDetails />
      </div>
    </div>
  );
};

export default App;
