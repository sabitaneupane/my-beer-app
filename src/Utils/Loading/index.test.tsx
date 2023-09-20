import React from "react";
import { render } from "@testing-library/react";
import Loading from ".";

test("Loading component renders correctly", () => {
  const { getByText } = render(<Loading />);

  const loadingText = getByText("Loading...");
  expect(loadingText).toBeInTheDocument();
});
