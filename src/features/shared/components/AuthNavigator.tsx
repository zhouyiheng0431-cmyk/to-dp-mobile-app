import { Stack } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/features/shared/hooks/useAuth";

export function AuthNavigator() {
  const { isLoading, isAuthenticated, error, retry } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator accessibilityLabel="正在读取登录状态" />
        <Text>正在读取登录状态…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>无法读取登录状态，请重试。</Text>
        <Pressable accessibilityRole="button" style={styles.retry} onPress={() => { void retry(); }}>
          <Text>重试</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerTransparent: false }}>
      <Stack.Screen name="(public)" options={{ title: "Welcome" }} />
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, gap: 12, backgroundColor: "#F3F4F6" },
  retry: { padding: 16, backgroundColor: "#E5E7EB", borderRadius: 8 },
});
