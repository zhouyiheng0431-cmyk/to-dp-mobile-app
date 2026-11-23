import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
  onToggle: (todo: Todo) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export function TodoCard({ todo, onToggle, onDelete }: Props) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runAction(action: () => Promise<void>) {
    setPending(true);
    setError(null);
    try {
      await action();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "操作失败，请重试");
    } finally {
      setPending(false);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={[styles.title, todo.completed && styles.completed]}>{todo.title}</Text>
      <Text style={styles.status}>{todo.completed ? "已完成" : "未完成"}</Text>
      <View style={styles.actions}>
        <Pressable accessibilityRole="button" disabled={pending} style={[styles.button, pending && styles.disabled]} onPress={() => { void runAction(() => onToggle(todo)); }}>
          <Text style={styles.toggleText}>{todo.completed ? "恢复未完成" : "标记完成"}</Text>
        </Pressable>
        <Pressable accessibilityRole="button" disabled={pending} style={[styles.button, pending && styles.disabled]} onPress={() => { void runAction(() => onDelete(todo.id)); }}>
          <Text style={styles.deleteText}>删除</Text>
        </Pressable>
      </View>
      {pending && <Text style={styles.status}>处理中…</Text>}
      {error && <Text style={styles.deleteText} accessibilityRole="alert">{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#FFFFFF", padding: 16, borderRadius: 12, gap: 8 },
  title: { fontSize: 18, color: "#111827" },
  completed: { textDecorationLine: "line-through", color: "#6B7280" },
  status: { fontSize: 14, color: "#4B5563" },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  button: { minHeight: 44, justifyContent: "center", paddingHorizontal: 12, backgroundColor: "#F3F4F6", borderRadius: 8 },
  toggleText: { color: "#1D4ED8", fontSize: 16 },
  deleteText: { color: "#B91C1C", fontSize: 16 },
  disabled: { opacity: 0.5 },
});
