import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap/";
import ListAllBeers from "./ListAllBeers";
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
            <ListAllBeers />
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
