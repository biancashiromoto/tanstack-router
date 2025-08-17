import { getProductsCategories } from '@/services/categories';
import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router';
import '../App.scss';

export const Route = createFileRoute('/')({
  component: App,
  loader: async () => {
    const categories: string[] = await getProductsCategories();
    return { categories };
  },
});

function App() {
  const { categories } = useLoaderData({ from: "/" });
  const navigate = useNavigate();

  return (
    <>
      <div className='categories-container'>
        <h3>Categories</h3>
        <ul className='categories-list'>
          {categories.map((category) => (
            <li key={category} className='category-item' onClick={() => {
              navigate({ to: `/products/${category}` })
            }}>
              <a href={`/products/${category}`}>{category}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
