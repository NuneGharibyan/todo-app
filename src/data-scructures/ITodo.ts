import { TodoStatus } from "./TodoStatus";

export interface ITodo {
  id: string;
  title: string;
  status: TodoStatus;
  description?: string;
  deadline?: string;
}
