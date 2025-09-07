import { useAuth } from "@/context/AuthContext";
import { formatCategoryName } from "@/helpers";
import { getProductById } from "@/services/products";
import type { Product } from "@/types";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";

type BreadcrumbProductProps = {
  category: string;
  productId?: string | null;
  product?: Product["title"] | null;
};

export default function BreadcrumbProducts({
  category,
  productId = null,
  product = null,
}: BreadcrumbProductProps) {
  const { data: productData } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(Number(productId)),
    enabled: !!productId,
  });

  const productTitle = product ?? productData?.title;
  const categoryName = formatCategoryName(category);
  const { page } = useSearch({ from: "/_product/$category" });
  const { user } = useAuth();

  return (
    <div role="presentation" className="breadcrumb">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/"
        >
          {user ? "Profile" : "Home"}
        </Link>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href={`/${category}`}
        >
          {categoryName}
        </Link>
        {!productTitle && (
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
        {productTitle && (
          <Typography
            sx={{
              color: "text.primary",
              display: "flex",
              alignItems: "center",
            }}
          >
            {productTitle}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
