import { Link } from "@mui/material";
import { Link as RouterLink, useLocation } from "@tanstack/react-router";

export interface BreadcrumbItemProps {
  to: string;
  label: string;
}

const BreadcrumbItem = ({ to, label }: BreadcrumbItemProps) => {
  const location = useLocation();

  return (
    <Link
      component={RouterLink}
      to={to}
      underline={location.pathname === to ? "none" : "hover"}
      color="inherit"
    >
      {label}
    </Link>
  );
};

export default BreadcrumbItem;
