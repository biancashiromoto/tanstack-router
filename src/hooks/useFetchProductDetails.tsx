import { getProductById } from "@/services/products";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

const useFetchProductDetails = () => {
  const { productId } = useParams({ from: "" });
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: Boolean(productId),
  });

  return {
    product: data,
    isLoading,
    error,
  };
};

export default useFetchProductDetails;
