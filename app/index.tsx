import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Button } from "@/components/ui/button";

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? "light"].tint;

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("../assets/images/finance.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <ThemedText type="title" style={styles.title}>
        Stay on top of your finance with us.
      </ThemedText>

      <ThemedText style={styles.subtitle}>
        We are your new financial Advisors to recommend the best investments for
        you.
      </ThemedText>

      <Button variant="default" onPress={() => router.push("/signup")}>
        Create account
      </Button>

      <Button onPress={() => router.push("/login")} variant="secondary">
        Login
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 40,
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  loginButton: {
    padding: 12,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
