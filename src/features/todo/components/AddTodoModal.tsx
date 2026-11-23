import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView,
  StyleSheet, Text, TextInput, View,
} from "react-native";

import { todoFormSchema, type TodoFormValues } from "@/features/todo/models/todoForm";

type Props = {
  onClose: () => void;
  onSave: (title: string) => Promise<void>;
};

export function AddTodoModal({ onClose, onSave }: Props) {
  const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: { title: "" },
  });

  async function submit(values: TodoFormValues) {
    try {
      await onSave(values.title);
      onClose();
    } catch (error) {
      setError("root", { message: error instanceof Error ? error.message : "保存失败，请重试" });
    }
  }

  return (
    <Modal visible transparent animationType="slide" onRequestClose={() => { if (!isSubmitting) onClose(); }}>
      <KeyboardAvoidingView style={styles.overlay} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.centered} keyboardShouldPersistTaps="handled">
          <View style={styles.form}>
            <Text style={styles.heading}>添加待办</Text>
            <Text>标题</Text>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextInput
                  ref={ref}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  placeholder="例如：阅读十分钟"
                  accessibilityLabel="待办标题"
                  editable={!isSubmitting}
                  autoFocus
                  returnKeyType="done"
                />
              )}
            />
            {errors.title && <Text style={styles.error} accessibilityRole="alert">{errors.title.message}</Text>}
            {errors.root && <Text style={styles.error} accessibilityRole="alert">{errors.root.message}</Text>}
            <Pressable accessibilityRole="button" disabled={isSubmitting} style={[styles.button, isSubmitting && styles.disabled]} onPress={() => { void handleSubmit(submit)(); }}>
              <Text style={styles.buttonText}>{isSubmitting ? "保存中…" : "保存"}</Text>
            </Pressable>
            <Pressable accessibilityRole="button" disabled={isSubmitting} style={styles.cancel} onPress={onClose}>
              <Text style={styles.cancelText}>取消</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  centered: { flexGrow: 1, justifyContent: "center", padding: 24 },
  form: { backgroundColor: "#FFFFFF", padding: 24, borderRadius: 16, gap: 12 },
  heading: { fontSize: 24, fontWeight: "bold", color: "#111827" },
  input: { borderWidth: 1, borderColor: "#9CA3AF", borderRadius: 8, padding: 12, fontSize: 18, color: "#111827" },
  error: { color: "#B91C1C" },
  button: { backgroundColor: "#2563EB", padding: 16, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  disabled: { opacity: 0.5 },
  cancel: { padding: 12, alignItems: "center" },
  cancelText: { color: "#374151", fontSize: 18 },
});
