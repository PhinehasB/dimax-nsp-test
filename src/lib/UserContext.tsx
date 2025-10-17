import { UserAuthContext } from "@/Types/User";
import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the type of object we’re storing

// 2. Define what our context will hold
type UserContextType = {
  user: UserAuthContext;
  setUser: React.Dispatch<React.SetStateAction<UserAuthContext>>;
};

// 3. Create the context (initially null)
const UserContext = createContext<UserContextType | null>(null);

// 4. Create a provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAuthContext>({
    email: "Theophilus",
    name: "Developer",
    isLoggedIn: true,
  });

  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// 5. Create a custom hook for easy access
export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
