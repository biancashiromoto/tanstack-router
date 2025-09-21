import { Box } from "@mui/material";
import Breadcrumb from "@/components/Breadcrumb";
import Header from "@/components/Header";
import SimpleBottomNavigation from "@/components/BottomNavigation";
import useResponsive from "@/hooks/useResponsive";

const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  const { isDesktop } = useResponsive();

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        p: 2,
        minHeight: "100vh",
        pb: isDesktop ? 2 : "72px",
      }}
    >
      <Header />
      <Breadcrumb />
      {children}
      {!isDesktop && <SimpleBottomNavigation />}
    </Box>
  );
};

export default AppLayout;
