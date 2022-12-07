import React from "react";
import BeerCardView from "../BeerCardView";
import { allBeerList } from "../../../Mock/allBeerList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ListAllBeers = () => {
  return (
    <>
      <BeerCardView beerData={allBeerList} />
      <p className="load-more-button">
        <span> Load More </span>
        <FontAwesomeIcon icon={faChevronDown} />
      </p>
    </>
  );
};

export default ListAllBeers;
