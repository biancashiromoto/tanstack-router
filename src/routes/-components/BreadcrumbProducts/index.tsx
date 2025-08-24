import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { getProductById } from '@/services/products';
import type { Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { formatCategoryName } from '@/helpers';

type BreadcrumbProductProps = {
  category: string;
  productId?: string | null;
  product?: Product["title"] | null;
};

export default function BreadcrumbProducts({
  category,
  productId = null,
  product = null
}: BreadcrumbProductProps) {
  const { data: productData } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(Number(productId)),
    enabled: !!productId
  });
  const productTitle = product ?? productData?.title;
  const categoryName = formatCategoryName(category);

  return (
    <div role="presentation" className="breadcrumb">
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
        >
          Products
        </Typography>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href={`/${category}`}
        >
          {categoryName}
        </Link>
        {productTitle && (
          <Typography
            sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
          >
            {productTitle}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
