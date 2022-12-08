import React, { useEffect, useState } from "react";
import BeerCardView from "../BeerCardView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getAllBeerList } from "../../../API";
import Error from "../../../Utils/Error";
import Loading from "../../../Utils/Loading";

const ListAllBeers2 = () => {
  const [allBeerList, setAllBeerList] = useState<any>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState<boolean>(true);
  const [slicedBeerList, setSlicedAllBeerList] = useState<any>([]);
  const [noOfElement, setNoOfElement] = useState<number>(3);

  const maxNumberOfDataToLoad = 80; // as per API
  const incrementCounter = 10;

  useEffect(() => {
    fetchBeerDetails();
  }, []);

  const fetchBeerDetails = async () => {
    setIsLoading(true);
    const query: any = {
      page: 1,
      perPage: maxNumberOfDataToLoad,
    };
    try {
      const data = await getAllBeerList(query);
      setAllBeerList(data);
      setSlicedAllBeerList(data.slice(0, noOfElement));
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const loadMoreDetails = () => {
    if (noOfElement <= maxNumberOfDataToLoad) {
      const incrementNoOfElement = noOfElement + incrementCounter;
      setNoOfElement(incrementNoOfElement);
      setSlicedAllBeerList(allBeerList.slice(0, incrementNoOfElement));
    }
    setShowLoadMoreButton(
      noOfElement >= maxNumberOfDataToLoad - incrementCounter ? false : true
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <BeerCardView beerData={slicedBeerList} />
      {showLoadMoreButton && (
        <p className="load-more-button" onClick={() => loadMoreDetails()}>
          <span> Load More </span>
          <FontAwesomeIcon icon={faChevronDown} />
        </p>
      )}

      <div className="space-container"></div>
    </>
  );
};

export default ListAllBeers2;
