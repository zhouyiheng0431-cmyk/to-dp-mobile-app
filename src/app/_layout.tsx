import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { retry: 1 }, mutations: { retry: false } },
  }));
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerTransparent: false }}>
        <Stack.Screen name="index" options={{ title: "Welcome" }} />
        <Stack.Screen name="calendar" options={{ title: "Calendar", headerBackTitle: "返回" }} />
      </Stack>
    </QueryClientProvider>
  );
}
