import { Pagination as MuiPagination } from "@mui/material";
import usePagination from "./hooks/usePagination";

const Pagination = () => {
  const { totalPages, page, handlePageChange } = usePagination();

  if (!totalPages || totalPages === 1) return null;

  return (
    <MuiPagination
      count={totalPages}
      page={page}
      onChange={(e, newPage) => handlePageChange(e, newPage)}
      showFirstButton
      showLastButton
      className="pagination"
      sx={{ my: 2, display: "flex", justifyContent: "center" }}
    />
  );
};

export default Pagination;
