import { useAuth } from "@/context/AuthContext";
import { formatCategoryName } from "@/helpers";
import { getProductById } from "@/services/products";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";

export default function BreadcrumbProducts() {
  const { id, category } = useParams({ from: "" });

  const { data: productData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
  });

  const { user } = useAuth();
  const { page } = useSearch({ from: "" });

  if (!category) return null;

  const categoryName = formatCategoryName(category);

  return (
    <div role="presentation" className="breadcrumb">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href={user ? "/profile" : "/"}
        >
          Home
        </Link>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href={`/${category}`}
        >
          {categoryName}
        </Link>
        {!productData?.title && (
          <Typography
            sx={{
              color: "text.primary",
              display: "flex",
              alignItems: "center",
            }}
          >
            Page {page}
          </Typography>
        )}
        {id && (
          <Typography
            sx={{
              color: "text.primary",
              display: "flex",
              alignItems: "center",
            }}
          >
            {productData?.title}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
