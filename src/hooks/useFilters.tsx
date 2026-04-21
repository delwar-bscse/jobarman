/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useDebounce } from "use-debounce";

type FiltersType = {
  preSearchTerm: string;
  searchTerm: string;
  preLocation: string;
  location: string;
  category: Set<string>;
  job_type: Set<string>;
  experience_level: Set<string>;
  date_posted: string;
  tags: Set<string>;
  minPrice: number;
  maxPrice: number;
};

type FiltersContextType = {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  resetFilters: () => void;
  handleSingleFilter: (key: keyof FiltersType, value: any) => void;
  handleRadioFilter: (key: keyof FiltersType, value: any) => void;
  handleSelectFilter: (key: keyof FiltersType, value: string) => void;
};

const initialFilters: FiltersType = {
  preSearchTerm: "",
  searchTerm: "",
  preLocation: "",
  location: "",
  category: new Set(),
  job_type: new Set(),
  experience_level: new Set(),
  date_posted: "",
  tags: new Set(),
  minPrice: 1,
  maxPrice: 500000,
};

// ---------------------------------- Create the filters context ---------------------------------- //
const FiltersContext = createContext<FiltersContextType | null>(null);

// ---------- Filters Provider component to wrap the app and provide the filters context ---------- //
export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [filters, setFilters] = useState<FiltersType>(initialFilters);
  const [debouncedSearchTerm] = useDebounce(filters.preSearchTerm, 500);
  const [debouncedLocation] = useDebounce(filters.preLocation, 500);

  const goPageOne = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }

  const handleSingleFilter = (key: keyof FiltersType, value: any) => {
    // console.log(key, value);
    setFilters((prev) => ({ ...prev, [key]: value }));
    goPageOne();
  };

  const handleRadioFilter = (key: keyof FiltersType, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    goPageOne();
  };

  const handleSelectFilter = (key: any, value: string) => {
    setFilters((prev) => {
      const set = new Set(prev[key]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...prev, [key]: set };
    });
    goPageOne();
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    goPageOne();
  };

  useEffect(() => {
    handleSingleFilter("searchTerm", debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    handleSingleFilter("location", debouncedLocation);
  }, [debouncedLocation]);

  return (
    <FiltersContext.Provider value={{ filters, setFilters, handleSingleFilter, handleRadioFilter, handleSelectFilter, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

// ----------------------------- Custom hook to use the FiltersContext ----------------------------- //
export const useFilters = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error("useFilters must be used within FiltersProvider");
  }

  return context;
};