import { List } from "antd";
import { ReactElement } from "react";
import { TodoItem } from "../TodoItem/TodoItem";

interface ITodoListProps {
  todoIds: string[];
}

const TodoList: React.FC<ITodoListProps> = ({ todoIds }) => {
  const renderItem = (id: string): ReactElement => {
    return <TodoItem id={id} />;
  };

  return <List dataSource={todoIds} bordered={true} renderItem={renderItem} />;
};

export { TodoList };
