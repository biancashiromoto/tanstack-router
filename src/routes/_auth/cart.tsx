import { useAuth } from '@/context/AuthContext'
import { getUsersCartById } from '@/services/users'
import type { Product } from '@/types'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import CartItem from '../-components/CartItem'

export const Route = createFileRoute('/_auth/cart')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const userId = context.user?.id;
    const cart = await getUsersCartById(Number(userId))
    return { cart: cart[0] ?? { products: [] } }
  }
})

function RouteComponent() {
  const { user } = useAuth();
  const { cart: { products, total } } = useLoaderData({ from: '/_auth/cart' });

  return (
    <>
      <h2 className='subtitle'>{user?.firstName}'s Cart</h2>
      {products ? (
        <div className='cart-list'>
          {products.length > 0 ? products.map((item: Product) => (
            <CartItem key={item.id} item={item} />
          )) : <p>No items in cart</p>}
        </div>
      ) : (
        <p>No cart data available</p>
      )}
      {products.length > 0 && <h3 className='subtitle cart-price'>Total: ${total}</h3>}
    </>
  )
}
