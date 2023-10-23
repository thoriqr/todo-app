import { useContext, useEffect, useState } from "react";
import { TodoContext } from "./context/TodoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  const { todos, setTodos, setValue } = useContext(TodoContext);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const initialStateTodos = savedTodos.map((todo) => ({
      ...todo,
      isEditing: false
    }));
    setTodos(initialStateTodos);
  }, [setTodos]);

  const deleteTodo = (id) => {
    const deletedTodo = todos.filter((todo) => todo.id !== id);
    setTodos(deletedTodo);
    setValue("");
    localStorage.setItem("todos", JSON.stringify(deletedTodo));
  };

  const editTodo = (id) => {
    const editingTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isEditing: !todo.isEditing };
      } else {
        return { ...todo, isEditing: false };
      }
    });

    const editedTodo = editingTodo.find((todo) => todo.id === id);

    if (editedTodo) {
      setValue(editedTodo.isEditing ? editedTodo.task : ""); // Set value to an empty string if isEditing is false
    }

    setTodos(editingTodo);
    localStorage.setItem("todos", JSON.stringify(editingTodo));
  };

  const toggleCompletion = (id, completed) => {
    const completedTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: completed };
      }
      return todo;
    });
    setTodos(completedTodo);
    localStorage.setItem("todos", JSON.stringify(completedTodo));
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const activeTodos = todos.filter((todo) => !todo.completed);

  const normalLink =
    "w-full text-sm lg:base font-semibold py-1 border-b-4 text-gray-400 dark:text-slate-500 border-gray-400 dark:border-slate-500";
  const activeLink =
    "w-full text-sm lg:base font-semibold py-1 border-b-4 text-gray-900 dark:text-slate-300 border-gray-900 dark:border-slate-100";

  return (
    <div className="pt-2">
      <div className="w-full lg:w-3/4 mx-auto">
        <div className="flex justify-around ">
          <button
            className={!showCompleted ? activeLink : normalLink}
            onClick={() => setShowCompleted(false)}
          >
            Active
          </button>
          <button
            className={showCompleted ? activeLink : normalLink}
            onClick={() => setShowCompleted(true)}
          >
            Completed
          </button>
        </div>
      </div>
      <ul className="w-full lg:w-3/4 mx-auto pt-2">
        {completedTodos.length === 0 && showCompleted && (
          <p className="pt-10 text-sm font-medium text-gray-500 dark:text-slate-400 italic">
            no completed todos
          </p>
        )}
        {activeTodos.length === 0 && !showCompleted && (
          <p className="pt-10 text-sm font-semibold text-gray-700 dark:text-slate-400 italic">
            no active todos
          </p>
        )}
        {showCompleted
          ? completedTodos.map((todo) => (
              <li
                key={todo.id}
                className="p-4 mt-2 flex justify-between items-center rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-md"
              >
                <div className="flex gap-2 overflow-hidden">
                  <input
                    className="cursor-pointer accent-gray-700 dark:accent-slate-200"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompletion(todo.id, false)}
                  />
                  <p className="text-sm lg:text-lg font-semibold text-gray-700 dark:text-slate-200 line-through">
                    {todo.task}
                  </p>
                </div>

                <span
                  className="dark:text-slate-200 text-xl cursor-pointer"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </li>
            ))
          : activeTodos.map((todo) => (
              <li
                key={todo.id}
                className="p-4 mt-2 flex justify-between items-center rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-md"
              >
                <div className="flex gap-2 overflow-hidden">
                  <input
                    className="cursor-pointer accent-gray-700 dark:accent-slate-200"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompletion(todo.id, true)}
                  />
                  <p className="text-sm lg:text-lg font-semibold text-gray-700 dark:text-slate-200">
                    {todo.task}
                  </p>
                </div>
                <div className="flex gap-2 pl-2">
                  <span
                    className="text-gray-700 dark:text-slate-200 text-xl cursor-pointer"
                    onClick={() => editTodo(todo.id)}
                  >
                    {todo.isEditing ? (
                      // Close icon
                      <FontAwesomeIcon icon={faXmark} />
                    ) : (
                      // Pen icon
                      <FontAwesomeIcon icon={faPenToSquare} />
                    )}
                  </span>
                  <span
                    className="text-gray-700 dark:text-slate-200 text-xl cursor-pointer"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default TodoList;
