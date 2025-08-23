import type { Product } from "@/types"
import { Link } from "@tanstack/react-router";

type ProductItemProps = {
  product: Product;
  category: string;
}

const ProductItem = ({ product, category }: ProductItemProps) => {
  return (
    <li key={product.id} className="product-item">
      <Link to={`/${category}/${product.id}`}>
        <img src={product.images[0]} alt={product.title} className="product-thumbnail" />
        <strong>{product.title}</strong> - ${product.price}
      </Link>
    </li>
  )
}

export default ProductItem