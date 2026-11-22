import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "待办清单" }} />
      <Stack.Screen name="about" options={{ title: "关于", headerBackTitle: "返回" }} />
    </Stack>
  );
}
