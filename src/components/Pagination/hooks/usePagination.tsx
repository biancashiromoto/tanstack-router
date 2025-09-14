import { useLoaderData, useNavigate, useSearch } from "@tanstack/react-router";

const usePagination = () => {
  const { page, limit } = useSearch({ from: "" });
  const { products, category } = useLoaderData({
    from: "/_product",
  });
  const navigate = useNavigate();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / limit);

  const handlePageChange = (
    _e: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    navigate({
      to: "/$category",
      params: { category },
      search: { page: newPage, limit },
    });
  };

  return {
    page,
    limit,
    currentProducts,
    totalPages,
    handlePageChange,
  };
};

export default usePagination;
