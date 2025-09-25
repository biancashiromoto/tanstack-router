import { formatCategoryName } from "@/helpers";
import { useLocation, useMatches, useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import type { BreadcrumbItemProps } from "../BreadcrumbItem";

export interface useBreadcrumbReturn {
  items: Array<{ to: string; label: string }>;
  categoryName: string | null;
  selectedProduct: any;
  location: ReturnType<typeof useLocation>;
  matches: ReturnType<typeof useMatches>;
}

const useBreadcrumb = (): useBreadcrumbReturn => {
  const { category } = useParams({ from: "/_product/$category" });
  const location = useLocation();
  const matches = useMatches();

  const categoryName = formatCategoryName(category);

  const selectedProduct = matches.find(
    (match) => match.routeId === "/_product/$category/$productId"
  )?.loaderData;

  const items = useMemo(() => {
    const breadcrumbItems: BreadcrumbItemProps[] = [];

    if (location.pathname !== "/profile") {
      breadcrumbItems.push({ to: "/", label: "Home" });
    }

    if (
      location.maskedLocation?.pathname.includes("/cart") ||
      location.pathname === "/cart"
    ) {
      breadcrumbItems.push({ to: "/cart", label: "Cart" });
    }

    if (categoryName && !location.maskedLocation?.pathname.includes("/cart")) {
      breadcrumbItems.push({ to: `/${category}`, label: categoryName });
    }

    if (location.pathname.includes("/user")) {
      breadcrumbItems.push({
        to: `/user/${location.pathname.split("/").pop()}`,
        label: ` ${location.maskedLocation?.pathname.split("/").pop()}`,
      });
    }

    if (selectedProduct) {
      breadcrumbItems.push({
        to: location.pathname,
        label: selectedProduct.title,
      });
    }

    return breadcrumbItems;
  }, [location, categoryName, selectedProduct, category]);

  return {
    items,
    categoryName,
    selectedProduct,
    location,
    matches,
  };
};

export default useBreadcrumb;
