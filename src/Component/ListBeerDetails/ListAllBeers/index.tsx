import React from "react";
import BeerCardView from "../BeerCardView";
import { allBeerList } from "../../../Mock/allBeerList";

const ListAllBeers = () => {
  return (
    <>
      <BeerCardView beerData={allBeerList} />
    </>
  );
};

export default ListAllBeers;
