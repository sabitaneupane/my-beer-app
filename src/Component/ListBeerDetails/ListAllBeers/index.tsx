import React, { useEffect, useState } from "react";
import BeerCardView from "../BeerCardView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getAllBeerList } from "../../../API";
import Error from "../../../Utils/Error";
import Loading from "../../../Utils/Loading";
import { Beers } from "../../../Types/beers";
import { BeersQuery } from "../../../Types";
import EmptyState from "../../../Utils/EmptyState";

const ListAllBeers = () => {
  const [allBeerList, setAllBeerList] = useState<Beers[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState<boolean>(false);

  const perPageValue = 10;
  useEffect(() => {
    fetchBeerDetails(pageNum);
  }, []);

  const queryBuilder = (pageNo: number) => {
    const query: BeersQuery = {
      page: pageNo,
      perPage: perPageValue,
    };

    return query;
  };

  const fetchBeerDetails = async (pageNo: number) => {
    setIsLoading(true);

    try {
      const data = await getAllBeerList(queryBuilder(pageNo));
      setAllBeerList(data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  const loadMoreDetails = () => {
    const nextPageNum = pageNum + 1;
    setPageNum(nextPageNum);
    fetchMoreBeerDetails(nextPageNum);
  };

  const fetchMoreBeerDetails = async (pageNo: number) => {
    setIsLoadMoreLoading(true);
    let newData: any = [];
    newData = newData.concat(allBeerList);

    try {
      const data = await getAllBeerList(queryBuilder(pageNo));
      setAllBeerList(newData.concat(data));
    } catch (error) {
      console.log("error:", error);
    }

    setIsLoadMoreLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  if (allBeerList.length === 0 ){
    return <EmptyState isMyBeers={false} />
  }

  return (
    <>
      <BeerCardView beerData={allBeerList} />
      {isLoadMoreLoading ? (
        <p className="text-align-center load-more-button mt-4"> Loading ... </p>
      ) : (
        <p className="load-more-button" onClick={() => loadMoreDetails()}>
          <span> Load More </span>
          <FontAwesomeIcon icon={faChevronDown} />
        </p>
      )}
      <div className="space-container"></div>
    </>
  );
};

export default ListAllBeers;
