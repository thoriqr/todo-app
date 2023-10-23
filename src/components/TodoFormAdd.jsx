import { useContext } from "react";
import { TodoContext } from "./context/TodoContext";
import { v4 as uuidv4 } from "uuid";
uuidv4();

const TodoFormAdd = () => {
  const { todos, setTodos, value, setValue } = useContext(TodoContext);

  const addTodo = (taskValue) => {
    const newTodo = [
      ...todos,
      { id: uuidv4(), task: taskValue, completed: false, isEditing: false },
    ]
    setTodos(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo))
  };

  const updateTodo = (taskValue) => {
    const updatedTodo = todos.map((todo) => {
      if (todo.isEditing) {
        // Check if the current todo is in edit mode
        // Update the task property of the editing todo
        return { ...todo, task: taskValue };
      }
      return todo;
    });
    setTodos(updatedTodo);

    // After updating, set all todos back to non-editing mode
    const submitUpdateTodo = updatedTodo.map((todo) => ({
      ...todo,
      isEditing: false,
    }));
    setTodos(submitUpdateTodo);
    localStorage.setItem("todos", JSON.stringify(submitUpdateTodo))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value !== "") {
      if (todos.some((todo) => todo.isEditing)) {
        // edit mode
        updateTodo(value);
      } else {
        // add mode
        addTodo(value);
      }
      setValue("");
    }
  };

  return (
    <div className="mx-auto flex justify-center">
      <form
        className="w-full lg:w-3/4 relative flex gap-1 items-center"
        onSubmit={handleSubmit}
      >
        <input
          value={value}
          type="text"
          placeholder={
            todos.some((todo) => todo.isEditing) ? "Update Task" : "Add Task"
          }
          className="w-full p-3 text-sm lg:text-lg font-medium text-gray-700 dark:text-slate-200 rounded-md border border-gray-400 dark:border-gray-700 bg-white dark:bg-black focus:outline-none placeholder:text-sm"
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="h-full w-20 rounded-md bg-gray-800 dark:bg-slate-200 hover:bg-gray-600 dark:hover:bg-gray-300 shadow-md"
          type="submit"
        >
          <p className="p-2 text-sm lg:text-base font-semibold text-slate-200 dark:text-gray-700">
            {todos.some((todo) => todo.isEditing) ? "Update" : "Add"}
          </p>
        </button>
      </form>
    </div>
  );
};

export default TodoFormAdd;
