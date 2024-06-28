import {
  EntityState,
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { ITodo } from "../data-scructures/ITodo";
import { TodoStatus } from "../data-scructures/TodoStatus";

const todosAdapter = createEntityAdapter<ITodo>({});

interface ITodoState extends EntityState<ITodo, string> {}

const initialState: ITodoState = todosAdapter.getInitialState();

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    upsertTodo: (state: ITodoState, action: PayloadAction<ITodo>) => {
      const todo: ITodo = action.payload;

      todosAdapter.setOne(state, todo);
    },
    changeTodoStatus: (
      state: ITodoState,
      action: PayloadAction<{ id: string; status: TodoStatus }>
    ) => {
      const { id, status } = action.payload;
      const todo = selectTodoById(id)({ todos: state });

      if (!todo) {
        return;
      }

      const updatedTodo = {
        ...todo,
        status,
      };

      todosAdapter.setOne(state, updatedTodo);
    },
  },
  extraReducers: () => {},
});

type RootState = { todos: ITodoState };

const todosSelectors = todosAdapter.getSelectors<RootState>(
  (state) => state.todos
);

const selectTodos = (state: RootState): ITodo[] =>
  todosSelectors.selectAll(state);

const selectActiveTodoIds = (state: RootState): string[] => {
  const todos: ITodo[] = selectTodos(state);
  const activeTodoIds = todos
    .filter((todo: ITodo) => todo.status !== TodoStatus.REMOVED)
    .map((todo: ITodo) => todo.id);

  return activeTodoIds;
};

const selectRemovedTodoIds = (state: RootState): string[] => {
  const todos: ITodo[] = selectTodos(state);
  const removedTodoIds = todos
    .filter((todo: ITodo) => todo.status === TodoStatus.REMOVED)
    .map((todo: ITodo) => todo.id);

  return removedTodoIds;
};

const selectTodoById =
  (id: string) =>
  (state: RootState): ITodo | undefined =>
    todosSelectors.selectById(state, id);

const todoReducer = todoSlice.reducer;
const { upsertTodo, changeTodoStatus } = todoSlice.actions;

export {
  changeTodoStatus,
  selectActiveTodoIds,
  selectRemovedTodoIds,
  selectTodoById,
  selectTodos,
  todoReducer,
  upsertTodo,
};
