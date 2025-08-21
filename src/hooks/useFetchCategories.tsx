import { getProductsCategories } from "@/services/categories";
import { useQuery } from "@tanstack/react-query";

const useFetchCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getProductsCategories,
  });
}

export default useFetchCategories