import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { describe, it, expect } from "vitest";
import AddCarForm from "@/components/AddCarForm";
import { ADD_CAR } from "@/graphql/operations";

const mocks = [
  {
    request: {
      query: ADD_CAR,
      variables: {
        make: "Test Make",
        model: "Test Model",
        year: 2022,
        color: "Test Color",
      },
    },
    result: {
      data: {
        addCar: {
          id: "6",
          make: "Test Make",
          model: "Test Model",
          year: 2022,
          color: "Test Color",
          mobile: "https://placehold.co/640x360?text=Test+Make+Test+Model+Mobile",
          tablet: "https://placehold.co/1023x576?text=Test+Make+Test+Model+Tablet",
          desktop: "https://placehold.co/1440x810?text=Test+Make+Test+Model+Desktop",
        },
      },
    },
  },
];

describe("AddCarForm Component", () => {
  it("opens the dialog when 'Add New Car' button is clicked", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddCarForm />
      </MockedProvider>
    );

    const addButton = screen.getByText("Add New Car");
    fireEvent.click(addButton);

    expect(screen.getByText("Add a New Car")).toBeInTheDocument();
  });

  it("submits the form and executes the mutation", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddCarForm />
      </MockedProvider>
    );

    const addButton = screen.getByText("Add New Car");
    fireEvent.click(addButton);

    fireEvent.change(screen.getByLabelText("Make"), { target: { value: "Test Make" } });
    fireEvent.change(screen.getByLabelText("Model"), { target: { value: "Test Model" } });
    fireEvent.change(screen.getByLabelText("Year"), { target: { value: 2022 } });
    fireEvent.change(screen.getByLabelText("Color"), { target: { value: "Test Color" } });

    const submitButton = screen.getByText("Add Car");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText("Add a New Car")).not.toBeInTheDocument();
    });
  });
});