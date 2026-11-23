import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome</Text>
      <Text style={styles.description}>欢迎使用待办应用，开始安排今天的任务吧。</Text>
      <Pressable style={styles.button} onPress={() => router.push("./calendar")}>
        <Text style={styles.buttonText}>查看待办</Text>
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
    justifyContent: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    color: "#374151",
    lineHeight: 28,
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

