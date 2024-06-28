export enum TodoStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  OVERDUE = "overdue",
  REMOVED = "removed",
}

export const TodoStatusColor = {
  [TodoStatus.PENDING]: "#2db7f5",
  [TodoStatus.COMPLETED]: "#87d068",
  [TodoStatus.OVERDUE]: "#c08ce6",
  [TodoStatus.REMOVED]: "#f50",
};
