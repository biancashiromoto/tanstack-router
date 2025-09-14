import { useAuth } from "@/context/AuthContext";
import { formatCategoryName } from "@/helpers";
import { getProductById } from "@/services/products";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import {
  useParams,
  Link as RouterLink,
  useLocation,
} from "@tanstack/react-router";
import CircularProgress from "@mui/material/CircularProgress";

export default function Breadcrumb() {
  const { id, category } = useParams({ from: "" });
  const { user } = useAuth();
  const location = useLocation();

  const { data: productData, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: Boolean(id),
  });

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

    if (id) {
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
          {isLoadingProduct ? (
            <CircularProgress size={16} />
          ) : (
            productData?.title || `Produto ${id}`
          )}
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
