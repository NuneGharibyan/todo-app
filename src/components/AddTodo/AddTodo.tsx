import Card from "antd/es/card/Card";
import * as React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { ITodo } from "../../data-scructures/ITodo";
import { TodoStatus } from "../../data-scructures/TodoStatus";
import { upsertTodo } from "../../store/todoSlice";
import { TodoForm } from "../TodoForm/TodoForm";
import "./add-todo.css";

const AddTodo: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const onSubmit = (
    newTodo: Omit<ITodo, "id" | "status">,
    actions: any
  ): void => {
    const todo = {
      ...newTodo,
      id: uuid(),
      status: TodoStatus.PENDING,
    };

    actions.resetForm();
    dispatch(upsertTodo(todo));
  };

  return (
    <Card title={"Add Todo"} className={"add-todo__card"}>
      <TodoForm
        initialValues={{
          title: "",
          description: "",
          deadline: "",
        }}
        onSubmit={onSubmit}
        showLabel={true}
      />
    </Card>
  );
};

export { AddTodo };
