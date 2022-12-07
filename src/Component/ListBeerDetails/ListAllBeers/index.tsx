import React, { useEffect, useState } from "react";
import BeerCardView from "../BeerCardView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getAllBeerList } from "../../../API";
import Error from "../../../Utils/Error";
import Loading from "../../../Utils/Loading";

const ListAllBeers = () => {
  const [allBeerList, setAllBeerList] = useState<any>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchBeerDetails();
  }, []);

  const fetchBeerDetails = async () => {
    setIsLoading(true);
    try {
      const data = await getAllBeerList();
      setAllBeerList(data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

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
