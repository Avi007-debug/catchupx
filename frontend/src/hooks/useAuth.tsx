import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

interface AuthContextType {
  user: User | null;
  session: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('catchupx_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setSession({ user: userData });
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock authentication - in real app, this would call Supabase
    if (email && password) {
      const userData = {
        id: '1',
        email,
        user_metadata: {
          full_name: email.split('@')[0]
        }
      };
      setUser(userData);
      setSession({ user: userData });
      localStorage.setItem('catchupx_user', JSON.stringify(userData));
      return { error: null };
    }
    return { error: { message: 'Invalid credentials' } };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    // Mock signup - in real app, this would call Supabase
    if (email && password && fullName) {
      const userData = {
        id: Date.now().toString(),
        email,
        user_metadata: {
          full_name: fullName
        }
      };
      setUser(userData);
      setSession({ user: userData });
      localStorage.setItem('catchupx_user', JSON.stringify(userData));
      return { error: null };
    }
    return { error: { message: 'Invalid data' } };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem('catchupx_user');
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};