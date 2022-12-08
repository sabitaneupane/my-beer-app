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

  useEffect(() => {
    fetchBeerDetails();
  }, [perPageValue]);

  const fetchBeerDetails = async () => {
    setIsLoading(true);
    const query: any = {
      page: 1,
      perPage: perPageValue,
    };
    try {
      const data = await getAllBeerList(query);
      setAllBeerList(data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const loadMoreDetails = () => {
    setPerPageValue(perPageValue + 10);
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
      <p className="load-more-button" onClick={() => loadMoreDetails()}>
        <span> Load More </span>
        <FontAwesomeIcon icon={faChevronDown} />
      </p>
    </>
  );
};

export default ListAllBeers;
