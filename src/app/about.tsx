import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>关于这个应用</Text>
      <Text style={styles.description}>这是我学习 React Native 和 Expo 的第一个待办应用。</Text>
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
  },
  description: {
    fontSize: 18,
    lineHeight: 28,
    color: "#374151",
  },
});
