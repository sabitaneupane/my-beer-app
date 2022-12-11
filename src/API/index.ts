import axios from "axios";
import { BeersQuery } from "../Types";

export const apiUrl = "https://api.punkapi.com/v2";

export const getAllBeerList = async (query: BeersQuery) => {
  const { page, perPage } = query;
  const response = await axios.get(
    `${apiUrl}/beers?page=${page}&per_page=${perPage}`
  );
  return response.data;
};
