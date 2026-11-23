import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

const authKey = ["auth"] as const;
const tokenKey = "pretend-auth-token";

export function useAuth() {
  const queryClient = useQueryClient();
  const authQuery = useQuery({
    queryKey: authKey,
    queryFn: () => SecureStore.getItemAsync(tokenKey),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async () => {
      const token = "pretend-token";
      await SecureStore.setItemAsync(tokenKey, token);
      return token;
    },
    onSuccess: async (token) => {
      await queryClient.cancelQueries({ queryKey: authKey });
      queryClient.setQueryData(authKey, token);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => SecureStore.deleteItemAsync(tokenKey),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: authKey });
      queryClient.setQueryData(authKey, null);
    },
  });

  return {
    isAuthenticated: !!authQuery.data,
    isLoading: authQuery.isPending,
    error: authQuery.error,
    retry: authQuery.refetch,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}
