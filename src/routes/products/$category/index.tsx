import { getProductsByCategory } from '@/services/products';
import type { Product } from '@/types';
import { createFileRoute, useLoaderData, useNavigate, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$category/')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { category } = params;
    if (!category) {
      throw new Error('Category is required');
    }
    const products = await getProductsByCategory(category);
    return { products };
  },
})

function RouteComponent() {
  const { category } = useParams({ from: '/products/$category/' });
  const { products } = useLoaderData({ from: '/products/$category/' });
  const navigate = useNavigate();

  return (
    <div>
      {!products && <p>Loading...</p>}
      <h2 className='subtitle'>Products in {category}</h2>
      {products && (
        <ul className='product-list'>
          {products.products.map((product: Product) => (
            <li key={product.id} className="product-item" onClick={ () => navigate({ to: `/products/${category}/${product.id}` }) }>
              <img src={product.images[0]} alt={product.title} className="product-thumbnail" />
              <strong>{product.title}</strong> - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
