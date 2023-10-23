// import React from "react";
import ReactDOM from "react-dom/client";
import TodoContextProvider from "./components/context/TodoContext";
import ThemeContextProvider from "./components/context/ThemeContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <TodoContextProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </TodoContextProvider>
  // </React.StrictMode>
);
