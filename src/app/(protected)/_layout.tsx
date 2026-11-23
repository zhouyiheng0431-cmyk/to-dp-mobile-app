import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerTransparent: false }}>
      <Stack.Screen name="calendar" options={{ title: "Calendar" }} />
    </Stack>
  );
}
