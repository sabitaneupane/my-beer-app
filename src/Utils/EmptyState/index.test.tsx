import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import EmptyState from ".";

describe("EmptyState renders correctly", () => {
  test("when isMyBeers is false", () => {
    const { getByText } = render(<EmptyState isMyBeers={false} />);

    const emptyStateText = getByText("Nothing to see yet");
    expect(emptyStateText).toBeInTheDocument();
  });

  test("when isMyBeers is true renders click here button", () => {
    const { getByText } = render(<EmptyState isMyBeers={true} />);

    const emptyStateText = getByText("Nothing to see yet");
    const clickHereText = getByText("Click here");

    expect(emptyStateText).toBeInTheDocument();
    expect(clickHereText).toBeInTheDocument();
  });
});

describe("'Click here' button works properly", () => {
  test("when clicking 'Click here' button it shows AddBeerModal", () => {
    const { getByText, getByTestId } = render(<EmptyState isMyBeers={true} />);

    const clickHereText = getByText("Click here");
    fireEvent.click(clickHereText);

    waitFor(() => {
      const addBeerModal = getByTestId("add-beer-modal");
      expect(addBeerModal).toBeInTheDocument();
    });
  });
});
