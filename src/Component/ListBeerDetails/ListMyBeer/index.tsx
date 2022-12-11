import React, { useContext } from "react";
import BeerCardView from "../BeerCardView";
import MyBeerContext from "../../../Context/myBeerContext";
import EmptyState from "../../../Utils/EmptyState";

const ListMyBeers = () => {
  const { data } = useContext(MyBeerContext);

  if (!data || data.length === 0) {
    return <EmptyState isMyBeers={true}/>;
  }

  return (
    <>
      <BeerCardView beerData={[...data].reverse()} />
    </>
  );
};

export default ListMyBeers;
