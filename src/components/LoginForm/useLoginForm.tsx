import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

const useLoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [setFormData]
  );

  const {
    mutate: loginUser,
    isPending,
    data: loginResponse,
    error,
  } = useMutation({
    mutationKey: ["login", formData],
    mutationFn: async () => await login(formData.username, formData.password),
  });

  useEffect(() => {
    if (loginResponse) navigate({ to: "/" });
  }, [loginResponse]);

  return {
    loginUser,
    loginResponse,
    formData,
    handleChange,
    isPending,
    error,
  };
};

export default useLoginForm;
