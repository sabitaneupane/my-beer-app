import React, { useState, Suspense } from "react";
import { Tab, Tabs } from "react-bootstrap/";
import ListAllBeers from "./ListAllBeers";
import AddNewBeerDetails from "../AddNewBeer";
import { byDefaultActiveTabKey } from "../../Constant";
import Loading from "../../Utils/Loading";
const ListMyBeers = React.lazy(() => import("./ListMyBeer"));

const ListBeerDetails = () => {
  const [selectedTab, setSelectedTab] = useState<string | null>(byDefaultActiveTabKey);

  const handleTabClick = (keyValue: string | null) => {
    setSelectedTab(keyValue);
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </>
  );
};

export default ListBeerDetails;
