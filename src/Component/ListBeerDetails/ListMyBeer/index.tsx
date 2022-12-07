import React from "react";
import BeerCardView from "../BeerCardView";
import { myBeerList } from "../../../Mock/myBeerList";

const ListMyBeers = () => {
  const emptyBeerList: any = [];

  return (
    <>
      {/* empty view */}
      <BeerCardView beerData={emptyBeerList} />
      <BeerCardView beerData={myBeerList} />
    </>
  );
};

export default ListMyBeers;
