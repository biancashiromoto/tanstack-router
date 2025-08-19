import type { Product } from "@/types"
import { useNavigate } from "@tanstack/react-router";

type ProductItemProps = {
  product: Product;
  category: string;
}

const ProductItem = ({ product, category }: ProductItemProps) => {
  const navigate = useNavigate();
  
  return (
    <li key={product.id} className="product-item" onClick={ () => navigate({ to: `/products/${category}/${product.id}` }) }>
      <img src={product.images[0]} alt={product.title} className="product-thumbnail" />
      <strong>{product.title}</strong> - ${product.price}
    </li>
  )
}

export default ProductItem