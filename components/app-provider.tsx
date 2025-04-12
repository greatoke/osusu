import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React, { ReactNode } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/contexts/auth-context";

type AppProviderProps = {
  children: ReactNode;
};
const AppProvider = ({ children }: AppProviderProps) => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
