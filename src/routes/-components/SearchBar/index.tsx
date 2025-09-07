import { Box, Divider } from "@mui/material";
import CustomAutocomplete from "../Autocomplete";
import type { Product } from "@/types";

type SearchBarTypes = {
  search: string;
  handleSearchChange: (value: string) => void;
  options: Product[];
};

const SearchBar = ({ search, handleSearchChange, options }: SearchBarTypes) => {
  return (
    <>
      <Divider sx={{ mb: 2 }} />
      <Box
        component="div"
        sx={{
          display: "grid",
          gridTemplateColumns: "85% auto",
          gap: 2,
        }}
      >
        <CustomAutocomplete
          handleChange={handleSearchChange}
          search={search}
          options={options}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
    </>
  );
};

export default SearchBar;
