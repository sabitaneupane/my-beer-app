import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import ListBeerDetails from ".";
import { act } from "react-dom/test-utils";

jest.mock("./ListAllBeers", () => {
  return function ListAllBeers() {
    return <div data-testid="list-all-beers">ListAllBeers Component</div>;
  };
});

jest.mock("./ListMyBeers", () => {
  return function ListMyBeers() {
    return <div data-testid="list-my-beers">ListMyBeers Component</div>;
  };
});

describe("ListBeerDetails Component", () => {
  test("renders ListBeerDetails component with default tab", async () => {
    const { getByText } = render(
      <React.Suspense fallback={<div>Loading...</div>}>
        <ListBeerDetails />
      </React.Suspense>
    );

    await waitFor(() => {
      const allBeersTab = getByText("All Beers");
      expect(allBeersTab).toBeInTheDocument();
      expect(allBeersTab).toHaveClass("active");

      const listAllBeersElement = getByText("ListAllBeers Component");
      expect(listAllBeersElement).toBeInTheDocument();
    });
  });

  test("renders ListBeerDetails component with MyBeers tab", async () => {
    const { getByText } = render(
      <React.Suspense fallback={<div>Loading...</div>}>
        <ListBeerDetails />
      </React.Suspense>
    );

    await waitFor(() => {
      const myBeersTab = getByText("My Beers");
      expect(myBeersTab).toBeInTheDocument();

      fireEvent.click(myBeersTab);
      expect(myBeersTab).toHaveClass("active");

      const listMyBeersElement = getByText("ListMyBeers Component");
      expect(listMyBeersElement).toBeInTheDocument();
    });
  });
});
