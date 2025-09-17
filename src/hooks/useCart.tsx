import { useAuth } from "@/context/AuthContext";
import { getUsersCartById } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useCart = () => {
  const { user } = useAuth();
  if (!user) return { cart: null, isLoading: false, error: null };

  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getUsersCartById(user?.id),
    enabled: Boolean(user?.id),
  });

  const totalPrice = useMemo(() => {
    if (!data?.products) return 0;
    return data.products.reduce(
      (total: number, item: { price: number; quantity?: number }) =>
        total + item.price * (item.quantity ?? 0),
      0
    );
  }, [data]);

  return {
    cart: data,
    isLoading,
    error,
    totalPrice,
  };
};

export default useCart;
