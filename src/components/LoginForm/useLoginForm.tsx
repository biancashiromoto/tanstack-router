import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

const useLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "username") setUsername(value);
      else if (name === "password") setPassword(value);
    },
    [setUsername, setPassword]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate({ to: "/profile" });
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Error logging in");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    password,
    handleChange,
    error,
    isLoading,
    handleSubmit,
  };
};

export default useLoginForm;
