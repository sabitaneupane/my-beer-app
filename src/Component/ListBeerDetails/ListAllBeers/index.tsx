import React, { useEffect, useState } from "react";
import BeerCardView from "../BeerCardView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getAllBeerList } from "../../../API";
import Error from "../../../Utils/Error";
import Loading from "../../../Utils/Loading";
import { Beers } from "../../../Types/beers";
import EmptyState from "../../../Utils/EmptyState";

const ListAllBeers = () => {
  const [allBeerList, setAllBeerList] = useState<Beers[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  const perPageValue = 10;

  useEffect(() => {
    setIsLoading(true);
    fetchData(pageNum, false);
  }, []);

  const queryBuilder = (pageNo: number) => ({
    page: pageNo,
    perPage: perPageValue,
  });

  const fetchData = async (pageNo: number, isFetchingMore: boolean) => {
    try {
      const data = await getAllBeerList(queryBuilder(pageNo));
      setHasMoreData(data.length >= perPageValue);
      setAllBeerList((prevData) =>
        isFetchingMore ? [...prevData, ...data] : data
      );
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsLoadMoreLoading(false);
    }
  };

  const loadMoreDetails = () => {
    const nextPageNum = pageNum + 1;
    setPageNum(nextPageNum);
    setIsLoadMoreLoading(true);
    fetchData(nextPageNum, true);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  if (allBeerList.length === 0) {
    return <EmptyState isMyBeers={false} />;
  }

  return (
    <>
      <BeerCardView beerData={allBeerList} />
      {hasMoreData ? (
        isLoadMoreLoading ? (
          <p className="text-align-center load-more-button mt-4">Loading ...</p>
        ) : (
          <p className="load-more-button" onClick={loadMoreDetails}>
            <span> Load More </span>
            <FontAwesomeIcon icon={faChevronDown} />
          </p>
        )
      ) : null}
      <div className="space-container"></div>
    </>
  );
};

export default ListAllBeers;
