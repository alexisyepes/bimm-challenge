import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CarCard from "@/components/CarCard";
import type { Car } from "@/types";

const mockCar: Car = {
  id: "1",
  make: "Toyota",
  model: "Camry",
  year: 2024,
  color: "Silver",
  mobile: "https://placehold.co/640x360?text=Toyota+Camry+Mobile",
  tablet: "https://placehold.co/1023x576?text=Toyota+Camry+Tablet",
  desktop: "https://placehold.co/1440x810?text=Toyota+Camry+Desktop",
};

describe("CarCard Component", () => {
  it("renders mobile image on small screens", () => {
    window.innerWidth = 500;
    render(<CarCard car={mockCar} />);
    const mobileImage = screen.getByAltText("Toyota Camry Mobile");
    expect(mobileImage).toBeVisible();
  });

  it("renders tablet image on medium screens", () => {
    window.innerWidth = 800;
    render(<CarCard car={mockCar} />);
    const tabletImage = screen.getByAltText("Toyota Camry Tablet");
    expect(tabletImage).toBeVisible();
  });

  it("renders desktop image on large screens", () => {
    window.innerWidth = 1200;
    render(<CarCard car={mockCar} />);
    const desktopImage = screen.getByAltText("Toyota Camry Desktop");
    expect(desktopImage).toBeVisible();
  });
});