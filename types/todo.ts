export interface Todo {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  createdAt: Date;
}

export interface TodoItemProps {
  text?: string;
  completed?: boolean;
  onDelete?: () => void;
  onToggle?: () => void;
}
