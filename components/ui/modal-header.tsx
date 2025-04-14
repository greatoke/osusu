import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { ThemedText } from "../ThemedText";
import { BackButton } from "./button";

type ModalHeaderProps = {
  title: string;
};

const ModalHeader = ({ title }: ModalHeaderProps) => {
  return (
    <View style={styles.header}>
      <BackButton onPress={() => router.back()} />
      <ThemedText type="subtitle" style={styles.headerTitle}>
        {title}
      </ThemedText>
      <View style={styles.placeholder} />
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  placeholder: {
    width: 40,
  },
});
