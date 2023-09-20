import React from "react";
import { render } from "@testing-library/react";
import Error from ".";

test("Error component renders correctly", () => {
  const { getByText } = render(<Error />);
  
  const errorText = getByText("Something went wrong. Please try again later.");
  expect(errorText).toBeInTheDocument();
});
