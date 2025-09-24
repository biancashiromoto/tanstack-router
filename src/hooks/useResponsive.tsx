import { useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";

const useResponsive = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return useMemo(
    () => ({
      isMobile,
      isTablet,
      isDesktop,
    }),
    [isMobile, isTablet, isDesktop]
  );
};

export default useResponsive;
