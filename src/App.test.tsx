import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

jest.mock("./Component/ListBeerDetails", () => {
  return function ListBeerDetails() {
    return <div data-testid="list-beers">ListBeerDetails Component</div>;
  };
});

describe("App Component", () => {
  it("renders the app with the correct title", () => {
    const { getByText } = render(<App />);
    const titleElement = getByText("My Beer App");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the ListBeerDetails component", () => {
    const { getByText } = render(<App />);
    const listBeerDetailsElement = getByText("ListBeerDetails Component");
    expect(listBeerDetailsElement).toBeInTheDocument();
  });
});
