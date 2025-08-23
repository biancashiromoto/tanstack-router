import { getProductById } from "@/services/products";
import type { Product } from "@/types"
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type CartItemProps = {
  item: Product;
}


const CartItem = ({ item }: CartItemProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductById(item.id);
      setProduct(product);
    }
    getProduct();
  }, [item.id]);

  const handleClick = () => navigate({ to: `/${product?.category}/${product?.id}` });
  
  return (
    <div className='cart-item' key={item.id} onClick={handleClick}>
      <img src={item.thumbnail} alt={item.title} className="cart-thumbnail" />
      <strong>{item.title}</strong>
      <span className="cart-item-price">${item.price}</span>
      <div className="cart-item-quantity">
        <span className="quantity">{item.quantity}</span>
      </div>
    </div>
  )
}

export default CartItem