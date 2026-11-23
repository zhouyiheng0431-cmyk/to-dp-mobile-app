import { AuthNavigator } from "@/features/shared/components/AuthNavigator";
import { QueryProvider } from "@/features/shared/providers/QueryProvider";

export default function RootLayout() {
  return (
    <QueryProvider>
      <AuthNavigator />
    </QueryProvider>
  );
}
