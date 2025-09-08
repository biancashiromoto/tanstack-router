import { Box } from "@mui/material";
import Header from "../Header";

const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 2 }}>
      <Header />
      {children}
    </Box>
  );
};

export default AppLayout;
