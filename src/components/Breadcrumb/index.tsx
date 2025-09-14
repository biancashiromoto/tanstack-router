import { formatCategoryName } from "@/helpers";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import {
  Link as RouterLink,
  useLocation,
  useParams,
  useMatches,
} from "@tanstack/react-router";
import { Typography } from "@mui/material";

export default function Breadcrumb() {
  const { category } = useParams({ from: "" });
  const location = useLocation();
  const matches = useMatches();

  const selectedProduct = matches.find(
    (match) => match.routeId === "/_product/$category/$productId"
  )?.loaderData;

  if (location.pathname === "/") return null;

  const categoryName = formatCategoryName(category);

  const createBreadcrumbItems = () => {
    const items = [];

    if (location.pathname !== "/profile") {
      items.push(
        <Link
          key="home"
          component={RouterLink}
          to="/"
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
        >
          Home
        </Link>
      );
    }

    if (
      location.maskedLocation?.pathname.includes("/cart") ||
      location.pathname === "/cart"
    ) {
      items.push(
        <Link
          key="cart"
          component={RouterLink}
          to="/cart"
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
        >
          Cart
        </Link>
      );
    }

    if (categoryName && !location.maskedLocation?.pathname.includes("/cart")) {
      items.push(
        <Link
          key="category"
          component={RouterLink}
          to="/$category"
          params={category}
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
        >
          {categoryName}
        </Link>
      );
    }

    if (selectedProduct) {
      items.push(
        <Typography
          key="product"
          sx={{
            color: "text.primary",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {selectedProduct.title}
        </Typography>
      );
    }
    return items;
  };

  return (
    <div role="presentation" className="breadcrumb">
      <Breadcrumbs aria-label="breadcrumb">
        {createBreadcrumbItems()}
      </Breadcrumbs>
    </div>
  );
}
