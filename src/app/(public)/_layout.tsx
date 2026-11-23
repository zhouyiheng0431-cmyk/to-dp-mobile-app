import { Redirect, Slot } from "expo-router";

import { useAuth } from "@/features/shared/hooks/useAuth";

export default function PublicLayout() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Redirect href="/calendar" />;
  return <Slot />;
}
