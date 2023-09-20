import React from "react";
import { render, screen } from "@testing-library/react";
import ListMyBeers from ".";
import MyBeerContext, { MyBeerProvider } from "../../../Context/myBeerContext";
import { Beers } from "../../../Types/beers";

jest.mock("../../../Utils/EmptyState", () => {
  return function EmptyState(props: any) {
    return <div data-testid="empty-state">EmptyState Component</div>;
  };
});

jest.mock("../BeerCardView", () => {
  return function BeerCardView(props: any) {
    return <div data-testid="beer-card-view">BeerCardView Component</div>;
  };
});

const beerData: Beers[] = [
  {
    name: "Beer 1",
    description: "A great beer",
  },
];

const MockMyBeerProvider = ({ children }: any) => {
  return (
    <MyBeerProvider>
      <MyBeerContext.Provider value={{ data: beerData }}>
        {children}
      </MyBeerContext.Provider>
    </MyBeerProvider>
  );
};

describe("ListMyBeers Component", () => {
  it("should render EmptyState when there are no beers", () => {
    render(
      <MyBeerProvider>
        <ListMyBeers />
      </MyBeerProvider>
    );

    const emptyStateElement = screen.getByTestId("empty-state");
    expect(emptyStateElement).toBeInTheDocument();
  });

  it("should render BeerCardView when there are beers", () => {
    render(
      <MockMyBeerProvider>
        <ListMyBeers />
      </MockMyBeerProvider>
    );

    const beerCardViewElement = screen.getByTestId("beer-card-view");
    expect(beerCardViewElement).toBeInTheDocument();
  });
});
