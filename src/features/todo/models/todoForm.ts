import { z } from "zod";

export const todoFormSchema = z.object({
  title: z.string().trim().min(1, "请输入待办标题").max(100, "标题最多 100 个字符"),
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;
