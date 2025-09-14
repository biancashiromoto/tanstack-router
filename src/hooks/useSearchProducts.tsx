import { searchProducts } from "@/services/products";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

const useSearchProducts = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 300);
  const location = useLocation();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", debouncedSearch],
    queryFn: () => searchProducts(debouncedSearch),
    enabled: debouncedSearch.length > 2,
    staleTime: 1000 * 60 * 5,
  });

  const options = useMemo(() => {
    return products?.products || [];
  }, [products]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  useEffect(() => handleSearchChange(""), [location.pathname]);

  return {
    search,
    options,
    isLoading,
    isError,
    error,
    handleSearchChange,
  };
};

export default useSearchProducts;
