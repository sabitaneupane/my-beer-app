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
  const [perPageValue, setPerPageValue] = useState<number>(3);
  const [totalClickCounter, setTotalClickCounter] = useState<number>(0);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState<boolean>(false);
  const [isLoadMoreError, setIsLoadMoreError] = useState<boolean>(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState<boolean>(true);

  const maxNumberOfDataToLoad = 80; // as per API
  const incrementCounter = 10;

  useEffect(() => {
    setIsLoading(true);
    fetchBeerDetails(perPageValue, false);
    setIsLoading(false);
  }, []);

  const fetchBeerDetails = async (
    perPageValue: any,
    isLoadMoreFetch: boolean
  ) => {
    const query: any = {
      page: 1,
      perPage: perPageValue,
    };
    try {
      const data = await getAllBeerList(query);
      setAllBeerList(data);
    } catch (error) {
      if (isLoadMoreFetch) {
        setIsLoadMoreError(true);
      } else {
        setIsError(true);
      }
    }
  };

  const loadMoreDetails = () => {
    setIsLoadMoreLoading(true);

    let newPerPageValue;
    if (perPageValue + incrementCounter <= maxNumberOfDataToLoad) {
      newPerPageValue = perPageValue + incrementCounter;
    } else {
      newPerPageValue = maxNumberOfDataToLoad;
    }

    fetchBeerDetails(newPerPageValue, true);

    if (!isLoadMoreError) {
      setPerPageValue(newPerPageValue);
      setTotalClickCounter(totalClickCounter + 1);
      setShowLoadMoreButton(
        perPageValue + incrementCounter <= maxNumberOfDataToLoad
      );
    }
    setIsLoadMoreLoading(false);
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
      {isLoadMoreLoading ? (
        <p className="text-align-center load-more-button mt-4"> Loading ... </p>
      ) : (
        showLoadMoreButton && (
          <p className="load-more-button" onClick={() => loadMoreDetails()}>
            <span> Load More </span>
            <FontAwesomeIcon icon={faChevronDown} />
          </p>
        )
      )}
      <div className="space-container"></div>
    </>
  );
};

export default ListAllBeers;
