import ProductItem from "@/routes/-components/ProductItem";
import { getProductsCategories } from "@/services/categories";
import { getProductsByCategory } from "@/services/products";
import type { Product } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import {
  createFileRoute,
  Outlet,
  useLoaderData,
  useParams,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_product/$category")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const queryClient = context?.queryClient;
    const category = params.category;
    if (!category) throw new Error("Category is required");
    return queryClient.ensureQueryData(
      queryOptions({
        queryKey: ["products", category],
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
    if (!categories.includes(category))
      throw new Error(`Category ${category} not found`);
  },
  errorComponent: ({ error }) => <p>Error loading products: {error.message}</p>,
  head: ({ loaderData: { category } }: { loaderData?: any }) => {
    return {
      meta: [
        {
          title: `Products in ${category}`,
        },
      ],
    };
  },
});

function RouteComponent() {
  const { products } = useLoaderData({ from: "/_product/$category" });
  const { id } = useParams({ from: "" });
  const isProductSelected = !!id;

  return (
    <section className="product">
      {!isProductSelected && (
        <>
          <p className="text">{products.length} products found</p>
          <ul className="product-list">
            {products?.map((product: Product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </ul>
        </>
      )}
      {isProductSelected && <Outlet />}
    </section>
  );
}
