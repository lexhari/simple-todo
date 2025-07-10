import { create } from 'zustand';

export interface Todo {
    id: string;
    text: string;
    description?: string;
    completed: boolean;
    category: string;
    dueDate?: Date;
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
}

interface TodoStore {
    todos: Todo[];
    addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    updateTodo: (id: string, updatedTodo: Partial<Todo>) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],

    addTodo: (todoData) => set((state) => ({
        todos: [
            ...state.todos,
            {
                ...todoData,
                id: Math.random().toString(36).substr(2, 9), // Simple ID generation
                createdAt: new Date(),
            },
        ],
    })),

    deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id),
    })),

    toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
    })),

    updateTodo: (id, updates) => set((state) => ({
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, ...updates } : todo
        ),
    })),
}))