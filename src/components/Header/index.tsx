import { Box, Divider } from "@mui/material";
import { useRouteContext } from "@tanstack/react-router";
import CustomAutocomplete from "../Autocomplete";
import CustomDrawer from "../CustomDrawer";
import Navbar from "./Navbar";

const Header = () => {
  const { categories } = useRouteContext({ from: "__root__" });

  return (
    <Box
      role="banner"
      className="header"
      sx={{
        position: "sticky",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "85% auto",
        gridTemplateRows: "auto auto auto",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "85% auto",
          gridColumn: "span 2",
          gridRow: 2,
          py: 1,
        }}
      >
        <CustomAutocomplete />
        {categories && <CustomDrawer />}
      </Box>
      <Divider sx={{ gridRow: 3, gridColumn: "span 2", my: 1 }} />
    </Box>
  );
};

export default Header;
