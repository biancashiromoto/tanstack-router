import useResponsive from "@/hooks/useResponsive";
import useSearchProducts from "@/hooks/useSearchProducts";
import { FormControl, InputAdornment, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "@tanstack/react-router";
import { SlMagnifier } from "react-icons/sl";

export default function CustomAutocomplete() {
  const navigate = useNavigate();
  const { search, options, handleSearchChange } = useSearchProducts();
  const { isMobile } = useResponsive();

  const filteredProducts = options.filter((option) =>
    option.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FormControl fullWidth>
      <Autocomplete
        size={isMobile ? "small" : "medium"}
        inputValue={search}
        onInputChange={(_, value) => handleSearchChange(value)}
        clearOnEscape
        onChange={(_, value) => {
          if (!value) {
            navigate({ to: "/" });
            return;
          }
          navigate({
            to: "/$category/$productId",
            params: { category: value.category, productId: String(value.id) },
          });
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
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SlMagnifier />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
    </FormControl>
  );
}
