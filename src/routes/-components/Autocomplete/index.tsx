import type { Product } from "@/types";
import { FormControl, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "@tanstack/react-router";

export type AutocompleteProps = {
  handleChange: (value: string) => void;
  search: string;
  options: Product[];
};

export default function CustomAutocomplete({
  handleChange,
  search,
  options,
}: AutocompleteProps) {
  const navigate = useNavigate();

  const filteredProducts = options.filter((option) =>
    option.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FormControl fullWidth>
      <Autocomplete
        size="medium"
        inputValue={search}
        onInputChange={(_, value) => handleChange(value)}
        clearOnEscape
        onChange={(_, value) => {
          if (!value) {
            navigate({ to: "/" });
            return;
          }
          navigate({ to: `/${value.category}/${value.id}` });
        }}
        options={options}
        autoHighlight
        getOptionLabel={(option) => option.title}
        getOptionKey={(option) => option.id}
        filterOptions={() => filteredProducts}
        renderOption={(props, option) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { key, ...optionProps } = props;
          return (
            <Box
              key={option.id}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
              <Typography variant="body2">{option.title}</Typography>
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search products"
            autoFocus
            slotProps={{
              htmlInput: {
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              },
            }}
          />
        )}
      />
    </FormControl>
  );
}
