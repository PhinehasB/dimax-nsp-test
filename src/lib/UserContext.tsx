"use client";
import { UserAuthContext } from "@/Types/User";
import React, {
  useContext,
  useState,
  ReactNode,
  createContext,
  useEffect,
} from "react";
import Cookies from "js-cookie";

type UserContextType = {
  user: UserAuthContext;
  setUser: React.Dispatch<React.SetStateAction<UserAuthContext>>;
  logout: () => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAuthContext>({
    email: "",
    name: "",
    isLoggedIn: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    Cookies.remove("user_ctx");
    setUser({ email: "", name: "", isLoggedIn: false });
  };

  useEffect(() => {
    const cookieValue = Cookies.get("user_ctx");
    if (cookieValue) {
      try {
        const parsed = JSON.parse(cookieValue);
        setUser(parsed);
      } catch {
        Cookies.remove("user_ctx");
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user.isLoggedIn) {
      Cookies.set("user_ctx", JSON.stringify(user), { expires: 1 / 24 });
    } else {
      if (!isLoading) {
        Cookies.remove("user_ctx");
      }
    }
  }, [user, isLoading]);

  const value = { user, setUser, logout, isLoading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
