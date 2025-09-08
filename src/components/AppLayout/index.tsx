import { Box } from "@mui/material";
import BreadcrumbProducts from "@/components/BreadcrumbProducts";
import Header from "@/components/Header";

const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 2 }}>
      <Header />
      <BreadcrumbProducts />
      {children}
    </Box>
  );
};

export default AppLayout;
