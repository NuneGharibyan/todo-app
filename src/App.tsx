import { Provider } from "react-redux";
import "./App.css";
import { AddTodo } from "./components/AddTodo/AddTodo";
import { Todos } from "./components/Todos/Todos";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className={"app__container"}>
        <AddTodo />
        <Todos />
      </div>
    </Provider>
  );
}

export default App;
