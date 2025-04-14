import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Values } from "@/constants/values";
import { IconSymbol } from "./IconSymbol";

type Props = {
  variant: "default" | "secondary" | "outline" | "link";
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export function Button({ variant, children, style, onPress }: Props) {
  const backgroundColor = useThemeColor({}, "tint");
  const textColor = variant === "default" ? "#fff" : backgroundColor;

  const buttonStyles = [
    styles.baseButton,
    variant === "default" && { backgroundColor },
    variant === "secondary" && styles.secondaryButton,
    variant === "outline" && styles.outlineButton,
    variant === "link" && styles.linkButton,
    style,
  ] as StyleProp<ViewStyle>[];

  return (
    <Pressable style={buttonStyles} onPress={onPress} activeOpacity={0.8}>
      <ThemedText style={[styles.text, { color: textColor }]}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

type BackButtonProps = {
    onPress: ()=>void
}

export function BackButton({onPress}: BackButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.backButton}>
      <IconSymbol name="chevron.left" size={24} color="#000" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  linkButton: {
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
  },
  text: {
    fontWeight: Values.fontWeight.bold,
    fontSize: Values.fontSize.md,
  },
});
