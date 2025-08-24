import ProductItem from '@/routes/-components/ProductItem';
import { getProductsCategories } from '@/services/categories';
import { getProductsByCategory } from '@/services/products';
import type { Product } from '@/types';
import { queryOptions } from '@tanstack/react-query';
import { createFileRoute, Outlet, useLoaderData, useMatches } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/_product/$category')({
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
  head: ({ loaderData: { category } }: { loaderData?: any }) => {
    return {
      meta: [
        {
          title: `Products in ${category}`,
        }
      ]
    };
  },
});


function RouteComponent() {
  const { products, category } = useLoaderData({ from: '/_product/$category' });
  const matches = useMatches();

  const isProductSelected = matches.some(match => 
    match.routeId === '/_product/$category/$id'
  );

  const productList = useMemo(() => (
    <ul className='product-list'>
      {products?.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  ), [products, category]);

  return (
    <section className="product-categories">
      {!isProductSelected && productList}
      {isProductSelected && <Outlet />}
    </section>
  );
}
