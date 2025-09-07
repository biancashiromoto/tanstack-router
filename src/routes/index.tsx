import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/routes/-components/LoginForm";
import { searchProducts } from "@/services/products";
import type { Product } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Header from "./-components/Header";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { user } = useAuth();
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<Product[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const results = await searchProducts(query);
      setOptions(results.products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    handleSearch(value);
  };

  return (
    <div className="home-container">
      <Header
        search={search}
        options={options}
        handleSearchChange={handleSearchChange}
      />
      {!user && <LoginForm />}
    </div>
  );
}
