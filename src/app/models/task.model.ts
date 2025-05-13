// src/app/task.model.ts
export interface Task {
  id?: number;
  title: string;
  description?: string;
  dueDate: string; // ISO date string, ex. "2025-05-20"
  completed: boolean;
  userId?: string; // optionnel, géré par le backend
}
