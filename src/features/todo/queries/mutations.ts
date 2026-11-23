import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Todo } from "@/features/todo/models/todo";
import { todoKeys } from "@/features/todo/queries/keys";
import { createTodo, deleteTodo, updateTodo } from "@/features/todo/services/todos";

export function useTodoMutations() {
  const queryClient = useQueryClient();
  const refreshTodos = () => queryClient.invalidateQueries({ queryKey: todoKeys.list });
  const addMutation = useMutation({ mutationFn: createTodo, onSuccess: refreshTodos });
  const toggleMutation = useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo.id, !todo.completed),
    onSuccess: refreshTodos,
  });
  const deleteMutation = useMutation({ mutationFn: deleteTodo, onSuccess: refreshTodos });

  return { addMutation, toggleMutation, deleteMutation };
}
