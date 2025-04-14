import { Loading } from "@/components/ui/loading";
import { v4 as uuidv4 } from "uuid";
import { account } from "@/lib/appwrite";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

export const AuthContext = createContext<any>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [session, setSession] = useState<Models.Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const init = () => {
    checkAuth();
  };

  useEffect(() => {
    init();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const previousSession = await account.getSession("current");
      if (previousSession) {
        setSession(previousSession);
        const previousUser = await account.get();
        setUser(previousUser);
      }
      console.log(previousSession);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      await account.create(uuidv4(), email, password);
      await account.updateName(fullName)
      await signIn(email, password)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const responseSession = await account.createEmailPasswordSession(
        email,
        password
      );
      setSession(responseSession);
      const responseUser = await account.get();
      setUser(responseUser);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await account.deleteSession("current");
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const contextData = {
    isLoading,
    user,
    signUp,
    signIn,
    signOut,
    session,
  };
  console.log(JSON.stringify(contextData, null, 2));
  return (
    <AuthContext.Provider value={contextData}>
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
