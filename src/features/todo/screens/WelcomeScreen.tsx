import { useAuth } from "@/features/shared/hooks/useAuth";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  const { login, isLoggingIn } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  async function handleLogin() {
    setLoginError(null);
    try {
      await login();
    } catch {
      setLoginError("登录状态保存失败，请重试。");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome</Text>
      <Text style={styles.description}>欢迎使用待办应用，开始安排今天的任务吧。</Text>
      <Pressable accessibilityRole="button" disabled={isLoggingIn} style={[styles.button, isLoggingIn && styles.disabled]} onPress={() => { void handleLogin(); }}>
        <Text style={styles.buttonText}>{isLoggingIn ? "登录中…" : "登陆"}</Text>
      </Pressable>
      {loginError && <Text accessibilityRole="alert" style={styles.error}>{loginError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  disabled: { opacity: 0.5 },
  error: { color: "#B91C1C" },
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

