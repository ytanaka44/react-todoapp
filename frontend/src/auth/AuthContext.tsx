import React, { createContext, useState, useContext, useEffect } from "react";
import { auth } from "./firebase";
import { User } from "firebase/auth";

// AuthContextの型を定義
interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
}
const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: true,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe; // クリーンアップ関数
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
