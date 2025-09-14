export const formatCategoryName = (
  category: string,
  shouldCapitalizeFirstLetter = true
): string => {
  const formatted = `${category[0].toUpperCase() + category.slice(1)}`.replace(
    "-",
    " "
  );
  return shouldCapitalizeFirstLetter ? formatted : formatted.toLowerCase();
};

export const getProductRating = (rating: number | null) => {
  return rating ? new Array(Math.ceil(rating)).fill("⭐") : null;
};
