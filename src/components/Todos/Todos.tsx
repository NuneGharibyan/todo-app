import { Tabs } from "antd";
import { useSelector } from "react-redux";
import {
  selectActiveTodoIds,
  selectRemovedTodoIds,
} from "../../store/todoSlice";
import { TodoList } from "../TodoList/TodoList";

const Todos: React.FC = () => {
  const activeTodoIds: string[] = useSelector(selectActiveTodoIds);
  const removedTodoIds: string[] = useSelector(selectRemovedTodoIds);

  return (
    <Tabs
      items={[
        {
          key: "active-todos",
          label: "Active Todos",
          children: <TodoList todoIds={activeTodoIds} />,
        },
        {
          key: "removed-todos",
          label: "Removed Todos",
          children: <TodoList todoIds={removedTodoIds} />,
        },
      ]}
    />
  );
};

export { Todos };
