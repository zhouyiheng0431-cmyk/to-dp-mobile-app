import { useQuery } from "@tanstack/react-query";

import { todoKeys } from "@/features/todo/queries/keys";
import { getTodos } from "@/features/todo/services/todos";

export function useTodos() {
  return useQuery({
    queryKey: todoKeys.list,
    queryFn: getTodos,
  });
}
