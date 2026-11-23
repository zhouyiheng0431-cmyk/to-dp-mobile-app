import { Stack } from "expo-router";
import { QueryProvider } from "@/features/shared/providers/QueryProvider";

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack screenOptions={{ headerTransparent: false }}>
        <Stack.Screen name="index" options={{ title: "Welcome" }} />
        <Stack.Screen name="calendar" options={{ title: "Calendar", headerBackTitle: "返回" }} />
      </Stack>
    </QueryProvider>
  );
}
