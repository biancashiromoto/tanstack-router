import ProductItem from '@/routes/-components/ProductItem';
import { getProductsCategories } from '@/services/categories';
import { getProductsByCategory } from '@/services/products';
import type { Product } from '@/types';
import { queryOptions } from '@tanstack/react-query';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/_product/$category/')({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const queryClient = context?.queryClient;
    const category = params.category;
    if (!category) throw new Error('Category is required');
    return queryClient.ensureQueryData(
      queryOptions({
        queryKey: ['products', category],
        queryFn: async () => {
          const { products } = await getProductsByCategory(category);
          return { products, category };
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
      })
    );
  },
  beforeLoad: async ({ params }) => {
    const category = params.category;
      const categories = await getProductsCategories();
      if (!categories.includes(category)) throw new Error(`Category ${category} not found`);
  },
  errorComponent: () => <p>Error loading products.</p>,
});


function RouteComponent() {
  const { products, category } = useLoaderData({ from: '/_product/$category/' });

  const productList = useMemo(() => (
    <ul className='product-list'>
      {products?.map((product: Product) => (
        <ProductItem key={product.id} product={product} category={category} />
      ))}
    </ul>
  ), [products, category]);

  return (
    <section>
      <h2 className='subtitle'>Products in {category}</h2>
      {!products ? (
        <div className='loader-container'>
          <span className='loader' /> Loading products...
        </div>
      ) : (
        productList
      )}
    </section>
  );
}
