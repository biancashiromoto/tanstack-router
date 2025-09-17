import Breadcrumbs from "@mui/material/Breadcrumbs";
import BreadcrumbItem from "./BreadcrumbItem";
import useBreadcrumb from "./hooks/useBreadcrumb";
import { routesWithNoBreadcrumb } from "./Breadcrumb.constants";
import { Box } from "@mui/material";

export default function Breadcrumb() {
  const { location, items } = useBreadcrumb();

  if (routesWithNoBreadcrumb.includes(location.pathname) || items.length === 0)
    return null;

  return (
    <Box role="banner" className="breadcrumb">
      <Breadcrumbs aria-label="breadcrumb">
        {items.map((item) => (
          <BreadcrumbItem label={item.label} key={item.to} to={item.to} />
        ))}
      </Breadcrumbs>
    </Box>
  );
}
