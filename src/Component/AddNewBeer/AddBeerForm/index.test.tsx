import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddBeerForm from ".";

describe("AddBeerForm Component", () => {
  it("handles form input correctly", () => {
    const mockHandleFormData = jest.fn();

    const { getByPlaceholderText } = render(
      <AddBeerForm handleFormData={mockHandleFormData} />
    );

    fireEvent.change(getByPlaceholderText("Beer Name*"), {
      target: { value: "Sample Beer" },
    });
    fireEvent.change(getByPlaceholderText("Genre*"), {
      target: { value: "Sample Genre" },
    });
    fireEvent.change(getByPlaceholderText("Description*"), {
      target: { value: "Sample Description" },
    });

    expect(mockHandleFormData).toHaveBeenCalledWith({
      name: "Sample Beer",
      genre: "Sample Genre",
      description: "Sample Description",
    });
  });

  it("handles form input correctly with partial updates", () => {
    const mockHandleFormData = jest.fn();

    const { getByPlaceholderText } = render(
      <AddBeerForm handleFormData={mockHandleFormData} />
    );

    fireEvent.change(getByPlaceholderText("Beer Name*"), {
      target: { value: "Sample Beer" },
    });

    expect(mockHandleFormData).toHaveBeenCalledWith({
      name: "Sample Beer",
      genre: "",
      description: "",
    });
  });
});
