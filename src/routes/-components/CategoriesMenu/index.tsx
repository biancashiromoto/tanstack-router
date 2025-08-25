import { Link } from "@tanstack/react-router";

type CategoriesMenuProps = {
  categories: string[];
};

const CategoriesMenu = ({ categories }: CategoriesMenuProps) => {
  return (
    <div className="categories-container">
      <h3>Categories</h3>
      <ul className="categories-list">
        {categories.map((category: string) => (
          <Link
            key={category}
            className="category-item"
            to={`/${category}`}
            activeProps={{ className: "active" }}
            preload={false}
            search={{ page: 1, limit: 5 }}
          >
            {category}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesMenu;
