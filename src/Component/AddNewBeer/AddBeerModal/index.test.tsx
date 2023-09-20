import React from "react";
import {
  render,
  fireEvent,
} from "@testing-library/react";
import AddBeerModal from ".";
import { MyBeerProvider } from "../../../Context/myBeerContext";

describe("AddBeerModal Component", () => {
  it("renders the modal with form elements", () => {
    const renderModal = (showAddBeerModal: boolean) => {
      return render(
        <AddBeerModal
          showAddBeerModal={showAddBeerModal}
          handleAddNewBeerButton={jest.fn()}
        />
      );
    };

    const { getByPlaceholderText, getByText } = renderModal(true);
    expect(getByText("Add a New Beer")).toBeInTheDocument();
    expect(getByPlaceholderText("Beer Name*")).toBeInTheDocument();
    expect(getByPlaceholderText("Genre*")).toBeInTheDocument();
    expect(getByPlaceholderText("Description*")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Save")).toBeInTheDocument();
  });

  it("handles form submission correctly", () => {
    const mockSetShowAddBeerModal = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <MyBeerProvider>
        <AddBeerModal
          showAddBeerModal={true}
          handleAddNewBeerButton={mockSetShowAddBeerModal}
        />
      </MyBeerProvider>
    );

    fireEvent.change(getByPlaceholderText("Beer Name*"), {
      target: { value: "Test Beer" },
    });
    fireEvent.change(getByPlaceholderText("Genre*"), {
      target: { value: "Test Genre" },
    });
    fireEvent.change(getByPlaceholderText("Description*"), {
      target: { value: "Test Description" },
    });

    fireEvent.click(getByText("Save"));
    expect(mockSetShowAddBeerModal).toHaveBeenCalledWith(false);
    expect(getByText("Beer data saved successfully.")).toBeInTheDocument();
  });
});

describe("Handles form validation", () => {
  it("renders all field are empty", () => {
    const mockSetShowAddBeerModal = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <MyBeerProvider>
        <AddBeerModal
          showAddBeerModal={true}
          handleAddNewBeerButton={mockSetShowAddBeerModal}
        />
      </MyBeerProvider>
    );

    fireEvent.click(getByText("Save"));
    expect(getByText("All field are required.")).toBeInTheDocument();
  });

  it("renders name field is empty", () => {
    const mockSetShowAddBeerModal = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <MyBeerProvider>
        <AddBeerModal
          showAddBeerModal={true}
          handleAddNewBeerButton={mockSetShowAddBeerModal}
        />
      </MyBeerProvider>
    );

    fireEvent.change(getByPlaceholderText("Beer Name*"), {
      target: { value: "Test Beer" },
    });

    fireEvent.click(getByText("Save"));
    expect(getByText("All field are required.")).toBeInTheDocument();
  });

  it("renders genre field is empty", () => {
    const mockSetShowAddBeerModal = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <MyBeerProvider>
        <AddBeerModal
          showAddBeerModal={true}
          handleAddNewBeerButton={mockSetShowAddBeerModal}
        />
      </MyBeerProvider>
    );

    fireEvent.change(getByPlaceholderText("Genre*"), {
      target: { value: "Test Genre" },
    });

    fireEvent.click(getByText("Save"));
    expect(getByText("All field are required.")).toBeInTheDocument();
  });

  it("renders description field is empty", () => {
    const mockSetShowAddBeerModal = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <MyBeerProvider>
        <AddBeerModal
          showAddBeerModal={true}
          handleAddNewBeerButton={mockSetShowAddBeerModal}
        />
      </MyBeerProvider>
    );

    fireEvent.change(getByPlaceholderText("Description*"), {
      target: { value: "Test Description" },
    });

    fireEvent.click(getByText("Save"));
    expect(getByText("All field are required.")).toBeInTheDocument();
  });
});
