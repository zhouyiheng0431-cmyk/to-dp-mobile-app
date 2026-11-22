import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [items, setItems] = useState<string[]>([
    "学习 React Native",
    "练习 Expo",
    "散步十分钟",
  ]);

  function addItem() {
    setItems((currentItems) => [...currentItems, `新待办 ${currentItems.length + 1}`]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>代办任务</Text>
      {items.map((item, index) => (
        <Text key={index} style={styles.item}>{item}</Text>
      ))}
      <Pressable style={styles.button} onPress={addItem}>
        <Text style={styles.buttonText}>添加待办</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.push("./about")}>
        <Text style={styles.buttonText}>关于这个应用</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 24,
    gap: 12,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },
  item: {
    fontSize: 18,
    color: "#374151",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

