import type { Product } from "@/types";
import { Box } from "@mui/material";
import CustomAutocomplete from "../Autocomplete";
import { searchProducts } from "@/services/products";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<Product[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const results = await searchProducts(query);
      setOptions(results.products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    handleSearch(value);
  };

  return (
    <CustomAutocomplete
      handleChange={handleSearchChange}
      search={search}
      options={options}
    />
  );
};

export default SearchBar;
