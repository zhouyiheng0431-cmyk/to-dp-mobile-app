import Constants from "expo-constants";
import { Platform } from "react-native";

import type { Todo } from "@/features/todo/models/todo";

const devHost = Constants.expoConfig?.hostUri?.split(":")[0];
const fallbackHost = Platform.OS === "android" ? "10.0.2.2" : "localhost";
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? `http://${devHost || fallbackHost}:3001`;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${API_URL}${path}`, { ...options, signal: controller.signal });
    if (!response.ok) {
      throw new Error(`待办请求失败：HTTP ${response.status}`);
    }
    if (response.status === 204) return undefined as T;
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

export function getTodos(): Promise<Todo[]> {
  return request<Todo[]>("/todos");
}

export function createTodo(title: string): Promise<Todo> {
  return request<Todo>("/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  });
}

export function updateTodo(id: string, completed: boolean): Promise<Todo> {
  return request<Todo>(`/todos/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
}

export async function deleteTodo(id: string): Promise<void> {
  await request<unknown>(`/todos/${encodeURIComponent(id)}`, { method: "DELETE" });
}
