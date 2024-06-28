import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, List, Tag, Tooltip } from "antd";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITodo } from "../../data-scructures/ITodo";
import { TodoStatus, TodoStatusColor } from "../../data-scructures/TodoStatus";
import {
  changeTodoStatus,
  selectTodoById,
  upsertTodo,
} from "../../store/todoSlice";
import { TodoForm } from "../TodoForm/TodoForm";
import "./todo-item.css";

interface ITodoItemProps {
  id: string;
}

const TodoItem: React.FC<ITodoItemProps> = ({ id }) => {
  const dispatch = useDispatch();
  const formRef = useRef();

  const todo: ITodo | undefined = useSelector(selectTodoById(id));
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const changeStatus = useCallback(
    (status: TodoStatus): void => {
      if (todo?.id) {
        dispatch(
          changeTodoStatus({
            id: todo.id,
            status,
          })
        );
      }
    },
    [dispatch, todo?.id]
  );

  useEffect(() => {
    const checkDate = (): void => {
      if (
        !todo?.deadline ||
        [TodoStatus.OVERDUE, TodoStatus.COMPLETED].includes(todo?.status)
      ) {
        return;
      }

      const currentDate: number = new Date().getTime();
      const itemDate: number = new Date(todo.deadline).getTime();
      const timeUntilDue: number = itemDate - currentDate;

      if (itemDate <= currentDate) {
        changeStatus(TodoStatus.OVERDUE);
      } else {
        setTimeout(checkDate, timeUntilDue);
      }
    };

    checkDate();
  }, [todo?.deadline, todo?.status, changeStatus]);

  if (!todo) {
    return <></>;
  }

  const getActions = (): ReactElement[] => {
    const deleteButton = (
      <Button
        icon={<DeleteOutlined />}
        onClick={() => changeStatus(TodoStatus.REMOVED)}
      />
    );
    const editButton = isEditing ? (
      <Button type={"primary"} onClick={onSave}>
        {"Save"}
      </Button>
    ) : (
      <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)} />
    );
    const canComplete: boolean = todo.status !== TodoStatus.OVERDUE;
    const completeButton = (
      <Tooltip title={!canComplete && "Your todo is overdue"}>
        <Button
          disabled={!canComplete}
          onClick={() => changeStatus(TodoStatus.COMPLETED)}
        >
          {"Mark as Complete"}
        </Button>
      </Tooltip>
    );
    const buttons =
      todo.status !== TodoStatus.REMOVED
        ? [deleteButton, editButton, completeButton]
        : [];

    return buttons;
  };

  const onSave = (): void => {
    if (!formRef.current) {
      return;
    }

    (formRef.current as any).handleSubmit();
  };
  const onSubmit = (values: Omit<ITodo, "id" | "status">): void => {
    dispatch(
      upsertTodo({
        ...todo,
        ...(values as any),
      })
    );
    setIsEditing(false);
  };

  return (
    <List.Item key={todo.id} actions={getActions()}>
      <div className={"todo-item__container"}>
        {isEditing ? (
          <TodoForm
            innerRef={formRef as any}
            initialValues={{
              title: todo.title,
              description: todo.description,
              deadline: todo.deadline,
            }}
            onSubmit={onSubmit}
            showSubmitButton={false}
          />
        ) : (
          <>
            <div className={"todo-item__title"}>{todo.title}</div>
            <div>{todo.description}</div>
            <div>{todo.deadline}</div>
          </>
        )}
        <Tag className={"todo-item__tag"} color={TodoStatusColor[todo.status]}>
          {todo.status}
        </Tag>
      </div>
    </List.Item>
  );
};

export { TodoItem };
