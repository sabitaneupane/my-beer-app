import React from "react";
import { render } from "@testing-library/react";
import BeerCardView from ".";

const mockBeerData = [
  {
    id: 1,
    name: "Sample Beer 1",
    tagline: "Tagline 1",
    description: "Description 1",
    ingredients: {
      malt: [{ name: "Malt 1" }, { name: "Malt 2" }],
      hops: [{ name: "Hop 1" }],
    },
    image_url: "Sample",
  },
  {
    id: 2,
    name: "Sample Beer 2",
    tagline: "Tagline 2",
    description: "Description 2",
    ingredients: {
      malt: [{ name: "Malt 1" }, { name: "Malt 2" }],
      hops: [{ name: "Hop 1" }],
    },
    image_url: "Sample",
  },
];

describe("BeerCardView component", () => {
  const { getByText } = render(<BeerCardView beerData={mockBeerData} />);

  test("renders beer card properly", () => {
    const beerName1 = getByText("Sample Beer 1");
    expect(beerName1).toBeInTheDocument();

    const beerName2 = getByText("Sample Beer 2");
    expect(beerName2).toBeInTheDocument();
  });
});
