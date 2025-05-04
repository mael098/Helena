import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'assistant';
};

// Mock user data - in a real app, this would come from an API
const MOCK_USERS = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'doctor@example.com',
    password: 'password123',
    role: 'doctor' as const,
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    email: 'assistant@example.com',
    password: 'password123',
    role: 'assistant' as const,
  },
];

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  signIn: async () => { },
  signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Check if the user is already logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const signIn = async (email: string, password: string) => {
    // In a real app, this would be an API call
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;

    // Store user in AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(userWithoutPassword));

    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    return;
  };

  const signOut = async () => {
    // Remove user from AsyncStorage
    await AsyncStorage.removeItem('user');

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);