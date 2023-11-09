export interface Todo {
  id?: string;        // A unique identifier for the todo item, typically provided by the database.
  title: string;     // The title or description of the todo.
  isDone: boolean;
  uid: string;
}