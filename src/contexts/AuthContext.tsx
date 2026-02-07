import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  studentId?: string;
  hostel?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, studentId?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulated login
    await new Promise(r => setTimeout(r, 1200));
    if (email) {
      setUser({
        id: 'user-1',
        name: email.split('@')[0].replace(/[.]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email,
        studentId: 'BHU/22/0' + Math.floor(Math.random() * 9000 + 1000),
      });
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, _password: string, studentId?: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1500));
    setUser({ id: 'user-' + Date.now(), name, email, studentId });
    return true;
  };

  const logout = () => setUser(null);

  const updateProfile = (updates: Partial<User>) => {
    if (user) setUser({ ...user, ...updates });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
