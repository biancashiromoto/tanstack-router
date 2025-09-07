import type { Product } from "@/types";
import { Box } from "@mui/material";
import CustomAutocomplete from "../Autocomplete";

type SearchBarTypes = {
  search: string;
  handleSearchChange: (value: string) => void;
  options: Product[];
};

const SearchBar = ({ search, handleSearchChange, options }: SearchBarTypes) => {
  return (
    <Box sx={{ width: "100%", px: 2 }}>
      <CustomAutocomplete
        handleChange={handleSearchChange}
        search={search}
        options={options}
      />
    </Box>
  );
};

export default SearchBar;
