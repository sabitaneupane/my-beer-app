import React, { useState, createContext } from "react";

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

  const addCustomBeerDetails = (customData: any) => {
    let newData: any = [];
    newData = newData.concat(beerData);
    newData.push(customData);
    setBeerData(newData);
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
