import type { Product } from "@/types"
import { Link } from "@tanstack/react-router";

type ProductItemProps = {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <li key={product.id} className="product-item">
      <Link 
        to="/$category/$id" 
        params={{ 
          category: product.category, 
          id: product.id.toString() 
        }}
        preload={false}
      >
        <img src={product.images[0]} alt={product.title} className="product-thumbnail" />
        <strong>{product.title}</strong> - ${product.price}
      </Link>
    </li>
  )
}

export default ProductItem