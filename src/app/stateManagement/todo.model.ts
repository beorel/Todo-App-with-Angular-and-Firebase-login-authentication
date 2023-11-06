export interface Todo {
  id: string; // A unique identifier for the todo item
  title: string; // The title or description of the todo
  isDone: boolean; // Indicates whether the todo is marked as done or not
  userId: string; // The user ID associated with the todo (if it's a user-specific todo)
}
