/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  
  return (
    <TodoContext.Provider value={{ todos, setTodos, value, setValue }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
