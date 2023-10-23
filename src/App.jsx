import "./App.css";
import TodoWrapper from "./components/TodoWrapper";
import TodoFormAdd from "./components/TodoFormAdd";
import TodoList from "./components/TodoList";
import ThemeSwitch from "./components/ThemeSwitch";

function App() {
  return (
    <TodoWrapper>
      <ThemeSwitch />
      <div className="mx-auto mb-4 flex max-w-fit items-center justify-center px-7 py-2 shadow-md rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
        <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">To-do App!</p>
      </div>
      <TodoFormAdd />
      <TodoList />
    </TodoWrapper>
  );
}

export default App;
