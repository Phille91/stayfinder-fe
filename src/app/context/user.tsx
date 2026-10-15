"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

export interface User {
  id: string;
  email: string;
  name?: string;
}

type UserState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserState | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
        { credentials: "include" },
      );

      if (!userResponse.ok) {
        setUser(null);
        setError(null);
        return;
      }

      const data = (await userResponse.json()) as { user: User };
      setUser(data.user);
      console.log("user från /auth/me", data.user);
      setError(null);
    } catch (err) {
      setError((err as Error).message ?? "Något gick fel");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <UserContext.Provider value={{ user, isLoading, error, refresh, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used withing a UserProvider");
  }
  return context;
};
