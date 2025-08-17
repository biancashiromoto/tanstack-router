import { getProductById } from '@/services/products';
import { createFileRoute, useLoaderData, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$category/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { id } = params;
    if (!id) {
      throw new Error('Product ID is required');
    }
    const product = await getProductById(id);
    return { product };
  },
})

function RouteComponent() {
  const { category } = useParams({ from: '/products/$category/$id' });
  const { product } = useLoaderData({ from: '/products/$category/$id' });

  if (!product) {
    return <p>Loading...</p>;
  }

  const productRating = product.rating ? new Array(Math.ceil(product.rating)).fill('⭐') : null;

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <div className="product-detail-content">
        <div className="product-images">
          {product.images.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`${product.title} ${index + 1}`} 
              className="product-image"
            />
          ))}
        </div>
        <div className="product-info">
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-category">Category: {category}</p>
          {product.brand && <p className="product-brand">Brand: {product.brand}</p>}

          {product.rating && (
            <p className="product-rating">
              Rating: {productRating}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
