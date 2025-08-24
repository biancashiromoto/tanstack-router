import { createFileRoute, Outlet, useLocation, useParams } from '@tanstack/react-router'
import BreadcrumbProducts from './-components/BreadcrumbProducts';

export const Route = createFileRoute('/_product')({
  component: RouteComponent,
})

function RouteComponent() {
  const { category } = useParams({ from: '/_product' });
  const currentLocation = useLocation();
  
  const pathSegments = currentLocation.pathname.split('/').filter(Boolean);
  const productId = pathSegments.length >= 2 ? pathSegments[1] : null;

  return (
    <section className="products">
      <BreadcrumbProducts category={category} productId={productId} />
      <Outlet />
    </section>
  )
}

