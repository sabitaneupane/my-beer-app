import React from "react";
import { render, waitFor } from "@testing-library/react";
import ListAllBeers from "./index";
import * as actionApi from "../../../API";

jest.mock("../../../API", () => ({
  getAllBeerList: jest.fn(),
}));

const beerData = [
  { id: 1, name: "Beer 1" },
  { id: 2, name: "Beer 2" },
];

describe("ListAllBeers Component", () => {
  test("renders loading state", () => {
    (actionApi.getAllBeerList as jest.Mock).mockResolvedValueOnce([]);
    const { getByText } = render(<ListAllBeers />);
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", async () => {
    (actionApi.getAllBeerList as jest.Mock).mockRejectedValueOnce(
      new Error("API Error")
    );
    const { getByText } = render(<ListAllBeers />);
    await waitFor(() => {
      expect(
        getByText("Something went wrong. Please try again later.")
      ).toBeInTheDocument();
    });
  });

  test("renders empty state", async () => {
    (actionApi.getAllBeerList as jest.Mock).mockResolvedValueOnce([]);
    const { getByText } = render(<ListAllBeers />);
    await waitFor(() => {
      expect(getByText("Nothing to see yet")).toBeInTheDocument();
    });
  });

  test("renders beer data", async () => {
    (actionApi.getAllBeerList as jest.Mock).mockResolvedValueOnce(beerData);
    const { getByText } = render(<ListAllBeers />);
    await waitFor(() => {
      expect(getByText("Beer 1")).toBeInTheDocument();
      expect(getByText("Beer 2")).toBeInTheDocument();
    });
  });
});
