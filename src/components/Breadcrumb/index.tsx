import { useAuth } from "@/context/AuthContext";
import { formatCategoryName } from "@/helpers";
import useFetchProductDetails from "@/hooks/useFetchProductDetails";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {
  Link as RouterLink,
  useLocation,
  useParams,
} from "@tanstack/react-router";
import Loader from "../Loader";

export default function Breadcrumb() {
  const { category } = useParams({ from: "" });
  const { user } = useAuth();
  const location = useLocation();
  useFetchProductDetails();
  const { product, isLoading: isLoadingProduct } = useFetchProductDetails();
  if (!category) return null;

  const categoryName = formatCategoryName(category);

  const createBreadcrumbItems = () => {
    const items = [];

    items.push(
      <Link
        key="home"
        component={RouterLink}
        to={user ? "/profile" : "/"}
        underline="hover"
        sx={{ display: "flex", alignItems: "center" }}
        color="inherit"
      >
        Home
      </Link>
    );

    items.push(
      <Link
        key={location.maskedLocation ? "cart" : "category"}
        component={RouterLink}
        to={location.maskedLocation ? "/cart" : "/$category"}
        params={location.maskedLocation ? undefined : category}
        underline="hover"
        sx={{ display: "flex", alignItems: "center" }}
        color="inherit"
      >
        {location.maskedLocation ? "Cart" : categoryName}
      </Link>
    );

    if (product) {
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
          {!isLoadingProduct ? product.title : <Loader />}
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
