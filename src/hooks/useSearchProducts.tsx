import { searchProducts } from "@/services/products";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

const useSearchProducts = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 300);

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

  const clearSearch = () => {
    setSearch("");
  };

  return {
    search,
    options,
    isLoading,
    isError,
    error,
    handleSearchChange,
    clearSearch,
  };
};

export default useSearchProducts;
