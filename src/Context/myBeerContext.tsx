import React, { useState, useEffect, createContext } from "react";

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
    const data =
      document.cookie
        .match("(^|;)\\s*" + "custom-my-beers" + "\\s*=\\s*([^;]+)")
        ?.pop() || "";
    if (data) {
      setBeerData(JSON.parse(data));
    }
  };

  const addCustomBeerDetails = (customData: any) => {
    let newData: any = [];
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
