import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap/";
import ListAllBeers from "./ListAllBeers";
import ListAllBeers2 from "./ListAllBeers/index2";
import ListMyBeers from "./ListMyBeer";
import AddNewBeerDetails from "../AddNewBeer";
import { byDefaultActiveTabKey } from "../../Constant";

const ListBeerDetails = () => {
  const [selectedTab, setSelectedTab] = useState<string>(byDefaultActiveTabKey);

  const handleTabClick = (keyValue: any) => {
    setSelectedTab(keyValue);
  };

  return (
    <>
      <div className="tab-container">
        <Tabs
          defaultActiveKey={byDefaultActiveTabKey}
          id="uncontrolled-tab-example"
          className="mb-3"
          onSelect={(k) => handleTabClick(k)}
        >
          <Tab eventKey="all-beers" title="All Beers">
            {/* Fetching only required data and fetching other required data on 'load more' click  */}
            <ListAllBeers />

            {/* Fetching all data at once and using slice to display only few data and show remaining on 'load more' click */}
            {/* <ListAllBeers2 />  */}
          </Tab>
          <Tab eventKey="my-beers" title="My Beers">
            <ListMyBeers />
          </Tab>
        </Tabs>

        {selectedTab === "my-beers" && <AddNewBeerDetails />}
      </div>
    </>
  );
};

export default ListBeerDetails;
