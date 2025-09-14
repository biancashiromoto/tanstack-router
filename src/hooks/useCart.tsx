import { useAuth } from "@/context/AuthContext";
import { getUsersCartById } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { user } = useAuth();
  if (!user) return { cart: null, isLoading: false, error: null };

  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getUsersCartById(user?.id),
    enabled: Boolean(user?.id),
  });

  return {
    cart: data,
    isLoading,
    error,
  };
};

export default useCart;
