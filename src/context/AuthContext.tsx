import { signIn } from '@/services/users'
import type { User } from '@/types'
import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      
      const signedUser = await signIn(username, password);
      if (signedUser) {
        setUser(signedUser);
        localStorage.setItem('user', JSON.stringify(signedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  const logout = () => {
    console.log('Logging out user:', user);
    setUser(null);
    localStorage.removeItem('user');
  }

  const isAuthenticated = user !== null

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
