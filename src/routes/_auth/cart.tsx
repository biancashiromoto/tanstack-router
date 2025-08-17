import { useAuth } from '@/context/AuthContext'
import { getUsersCartById } from '@/services/users'
import type { Product } from '@/types'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/cart')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const userId = context.user?.id
    if (userId) {
      try {
        const cart = await getUsersCartById(Number(userId))
        console.log('Cart loaded from context:', cart)
        return { cart }
      } catch (error) {
        console.error('Error loading cart:', error)
        return { cart: null }
      }
    }
    return { cart: null }
  }
})

function RouteComponent() {
  const { user } = useAuth()
  const { cart } = useLoaderData({ from: '/_auth/cart' });

  return (
    <div className="cart-container">
      <h2 className='subtitle'>{user?.firstName}'s Cart</h2>
      {cart ? (
        <div>
          {
            cart.length > 0 ? cart.map((item: Product) => (
              <div key={item.id} className="cart-item">
                <p className="text"><strong>Product Title:</strong> {item.title}</p>
                <p className="text"><strong>Price:</strong> ${item.price}</p>
                <img src={item.images[0]} alt={item.title} className="cart-item-image" />
                <p className="text"><strong>Description:</strong> {item.description}</p>
                <p className="text"><strong>Category:</strong> {item.category}</p>
                <p className="text"><strong>Brand:</strong> {item.brand}</p>
              </div>
            )) : <p>No items in cart</p>
          }
        </div>
      ) : (
        <p>No cart data available</p>
      )}
    </div>
  )
}
