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
  const { search, options, handleSearchChange, isLoading } =
    useSearchProducts();
  const { isMobile } = useResponsive();

  return (
    <FormControl fullWidth>
      <Autocomplete
        size={isMobile ? "small" : "medium"}
        inputValue={search}
        onInputChange={(_, value) => handleSearchChange(value)}
        onChange={(_, value) => {
          if (!value) {
            return;
          }
          navigate({
            to: "/$category/$productId",
            params: { category: value.category, productId: value.id },
          });
        }}
        options={options}
        getOptionLabel={(option) => option.title}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.id}>
            <Typography variant="body2">{option.title}</Typography>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search products"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  <InputAdornment position="end">
                    <SlMagnifier />
                  </InputAdornment>
                </>
              ),
            }}
          />
        )}
        loading={isLoading}
        noOptionsText={
          search.length < 2
            ? "Enter at least 2 characters"
            : "No products found"
        }
      />
    </FormControl>
  );
}
