import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddNewBeerDetails from "./index";

jest.mock("./AddBeerModal", () => {
  return function AddBeerModal() {
    return <div data-testid="add-beers">AddBeerModal Component</div>;
  };
});

describe("AddNewBeerDetails component", () => {
  const { getByText } = render(<AddNewBeerDetails />);

  test("opens modal when the button is clicked", () => {
    const addButton = getByText("Add a new beer");
    fireEvent.click(addButton);

    const modalTitleAfterClick = getByText("AddBeerModal Component");
    expect(modalTitleAfterClick).toBeInTheDocument();
  });
});
