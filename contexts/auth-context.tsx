import { Loading } from "@/components/ui/loading";
import { createContext, ReactNode, useState } from "react";

export const AuthContext = createContext<any>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const signIn = () => {};

  const signOut = () => {};
  const contextData = {
    isLoading,
    user,
    signIn,
    signOut,
    session
  };
  console.log(contextData)
  return <AuthContext.Provider value={contextData}>
    {isLoading?(
      <Loading/>
    ):children}
  </AuthContext.Provider>;
};
