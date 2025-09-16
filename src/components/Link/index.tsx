import useResponsive from "@/hooks/useResponsive";
import { Link as MUILink, Typography } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";

export interface LinkProps {
  icon: React.ReactNode;
  to: string;
  label: string;
  handleClick?: () => void;
}
const Link = ({ icon, to, label, handleClick }: LinkProps) => {
  const { isMobile } = useResponsive();

  return (
    <MUILink
      to={to}
      component={RouterLink}
      style={{
        textDecoration: "none",
      }}
      onClick={handleClick}
    >
      <Typography
        variant="body2"
        component="span"
        sx={{
          ml: 0.75,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {icon}
        {isMobile ? "" : label}
      </Typography>
    </MUILink>
  );
};

export default Link;
