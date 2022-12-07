import axios from "axios";

export const apiUrl = "https://api.punkapi.com/v2";

export const getAllBeerList = async () => {
  const response = await axios.get(`${apiUrl}/beers?page=1&per_page=5`);
  return response.data;
};
