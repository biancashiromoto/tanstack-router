import { User, type SignInData } from "@/services/user";
import type { IUser } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

const userService = new User();

interface AuthContextType {
  user: IUser | null;
  signInUser: (data: SignInData) => void;
  signOutUser: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInError: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    mutate: signInUser,
    isPending: isLoadingSignIn,
    error: signInError,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (formData: SignInData) =>
      await userService.signIn(formData),
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      window.location.pathname = "/";
    },
  });

  const signOutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.pathname = "/";
  };

  const isAuthenticated = user !== null;

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const value = {
    user,
    signInUser,
    signOutUser,
    isAuthenticated,
    isLoading: isLoadingSignIn || isLoading,
    signInError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
