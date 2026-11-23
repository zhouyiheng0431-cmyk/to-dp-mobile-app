import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { LoadingIndicator } from "@/features/shared/components/LoadingIndicator";
import { AddTodoModal } from "@/features/todo/components/AddTodoModal";
import { TodoCard } from "@/features/todo/components/TodoCard";
import type { Todo } from "@/features/todo/models/todo";
import { useTodoMutations } from "@/features/todo/queries/mutations";
import { useTodos } from "@/features/todo/queries/queries";

const filters = ["All", "Active", "Completed"] as const;
type Filter = (typeof filters)[number];

export default function CalendarScreen() {
  const { data: todos = [], isPending: loading, error, refetch } = useTodos();
  const { addMutation, toggleMutation, deleteMutation } = useTodoMutations();
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");
  const visibleTodos = todos.filter((todo) =>
    filter === "All" || (filter === "Completed" ? todo.completed : !todo.completed)
  );

  async function addTodo(title: string) {
    await addMutation.mutateAsync(title);
  }

  async function toggleTodo(todo: Todo) {
    await toggleMutation.mutateAsync(todo);
  }

  async function removeTodo(id: string) {
    await deleteMutation.mutateAsync(id);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>待办事项</Text>
      <Pressable accessibilityRole="button" disabled={loading || !!error} style={[styles.addButton, (loading || !!error) && styles.disabled]} onPress={() => setShowAddModal(true)}>
        <Text style={styles.addButtonText}>Add Todo</Text>
      </Pressable>
      <View style={styles.filters}>
        {filters.map((option) => (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityState={{ selected: filter === option }}
            style={[styles.filterButton, filter === option && styles.selectedFilter]}
            onPress={() => setFilter(option)}
          >
            <Text style={[styles.filterText, filter === option && styles.selectedFilterText]}>{option}</Text>
          </Pressable>
        ))}
      </View>
      {loading ? <LoadingIndicator />: error ? (
        <>
          <Text style={styles.error}>{error.message}</Text>
          <Text>请确认手机和电脑连接同一 Wi-Fi，且 json-server 正在运行。</Text>
          <Pressable onPress={() => { void refetch(); }}>
            <Text style={styles.retry}>重试</Text>
          </Pressable>
        </>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={visibleTodos}
          keyExtractor={(todo) => todo.id}
          renderItem={({ item }) => <TodoCard todo={item} onToggle={toggleTodo} onDelete={removeTodo} />}
          ListEmptyComponent={<Text>{filter === "All" ? "暂无待办事项" : filter === "Active" ? "暂无未完成事项" : "暂无已完成事项"}</Text>}
        />
      )}
      {showAddModal && <AddTodoModal onClose={() => setShowAddModal(false)} onSave={addTodo} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 24,
    gap: 12,
  },
  heading: { fontSize: 28, fontWeight: "bold", color: "#111827" },
  list: { flex: 1 },
  listContent: { gap: 12, paddingBottom: 24 },
  error: { color: "#B91C1C" },
  retry: { color: "#2563EB", fontSize: 18, paddingVertical: 12 },
  addButton: { backgroundColor: "#2563EB", padding: 16, borderRadius: 12, alignItems: "center" },
  addButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  disabled: { opacity: 0.5 },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  filterButton: { minHeight: 44, justifyContent: "center", paddingHorizontal: 12, borderRadius: 8, backgroundColor: "#E5E7EB" },
  selectedFilter: { backgroundColor: "#2563EB" },
  filterText: { fontSize: 16, color: "#374151" },
  selectedFilterText: { color: "#FFFFFF" },
});
