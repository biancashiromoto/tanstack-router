import { useAuth } from "@/context/AuthContext";
import type { SignInData } from "@/services/user";
import { useCallback, useState } from "react";

export interface IUseLoginFormReturn {
  handleSubmit: (e: React.FormEvent) => void;
  formData: SignInData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  signInError: Error | null;
  isLoading: boolean;
}

const useLoginForm = (): IUseLoginFormReturn => {
  const [formData, setFormData] = useState<SignInData>({
    username: "",
    password: "",
  });
  const { signInUser, signInError, isLoading } = useAuth();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [setFormData]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInUser(formData);
  };

  return {
    handleSubmit,
    formData,
    handleChange,
    signInError,
    isLoading,
  };
};

export default useLoginForm;
