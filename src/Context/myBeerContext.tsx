import React, { useState, useEffect, createContext } from "react";
import { Beers } from "../Types/beers";

const defaultContext = {
  data: [
    {
      name: "",
      genre: "",
      description: "",
    },
  ],
};

const MyBeerContext = createContext<any>(defaultContext);

export const MyBeerProvider = ({ children }: any) => {
  const [beerData, setBeerData] = useState<any>([]);

  useEffect(() => {
    getCustomMyBeers();
  }, []);

  const getCustomMyBeers = () => {
    const cookieData = new RegExp(`(^|;)\\s*${"custom-my-beers"}\\s*=\\s*([^;]+)`);
    const data = document.cookie.match(cookieData)?.pop() || "";
  
    if (data) {
      setBeerData(JSON.parse(data));
    }
  };
  
  const addCustomBeerDetails = (customData: Beers) => {
    let newData: Beers[] = [];
    newData = newData.concat(beerData);
    newData.push(customData);
    setBeerData(newData);
    document.cookie =
      "custom-my-beers=" + JSON.stringify(newData).replace(/(?:\\[rn])+/g, "");
  };

  return (
    <MyBeerContext.Provider
      value={{
        data: beerData,
        addCustomBeerDetails,
      }}
    >
      {children}
    </MyBeerContext.Provider>
  );
};

export default MyBeerContext;
