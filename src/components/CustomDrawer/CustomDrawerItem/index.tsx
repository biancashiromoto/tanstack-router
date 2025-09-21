import { formatCategoryName } from "@/helpers";
import { ListItemText, useTheme } from "@mui/material";
import { Link } from "@tanstack/react-router";

export interface CustomDrawerItemProps {
  category: string;
}

const CustomDrawerItem = ({ category }: CustomDrawerItemProps) => {
  const theme = useTheme();

  return (
    <Link
      to="/$category"
      params={{ category }}
      search={{ page: 1, limit: 15 }}
      preload="intent"
      style={{
        textDecoration: "none",
        color: "inherit",
        borderRadius: "4px",
        display: "block",
        padding: "8px 12px",
        transition: "all 0.2s ease-in-out",
      }}
      activeProps={{
        style: {
          fontWeight: "bold",
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.main + "14", // 8% opacity
        },
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
        e.currentTarget.style.transform = "translateX(4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.transform = "translateX(0)";
      }}
      preloadDelay={500}
    >
      <ListItemText primary={formatCategoryName(category)} />
    </Link>
  );
};

export default CustomDrawerItem;
