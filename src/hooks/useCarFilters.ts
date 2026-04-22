import { useState, useMemo } from "react";
import type { Car } from "@/types";

interface UseCarFiltersProps {
  cars: Car[];
}

interface UseCarFiltersReturn {
  filteredCars: Car[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export function useCarFilters({ cars }: UseCarFiltersProps): UseCarFiltersReturn {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const filteredCars = useMemo(() => {
    let result = cars;

    if (searchTerm) {
      result = result.filter(car =>
        `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy) {
      result = [...result].sort((a, b) => {
        if (sortBy === "year") {
          return a.year - b.year;
        }
        const aValue = a[sortBy as keyof Car];
        const bValue = b[sortBy as keyof Car];
        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue);
        }
        return 0;
      });
    }

    return result;
  }, [cars, searchTerm, sortBy]);

  return {
    filteredCars,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
  };
}