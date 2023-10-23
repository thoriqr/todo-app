import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeSwitch = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    if (theme === "light") {
      // when theme is changed, set the localStorage
      localStorage.setItem("theme", JSON.stringify("dark"));
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      // when theme is changed, set the localStorage
      localStorage.setItem("theme", JSON.stringify("light"));
      setTheme("light");
      document.documentElement.classList.remove("light");
    }
  };

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme"));
    if (!theme || theme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme, setTheme]);

  return (
    <div className="absolute top-2 right-2">
      <button
        aria-labelledby="theme"
        onClick={toggleTheme}
        className="relative w-10 h-10 my-2 dark:text-slate-200 text-xl px-2 py-1 rounded-full bg-transparent ring-gray-700 dark:ring-slate-200 focus:ring-2 items-center"
      >
        {theme === "dark" ? (
          <span className="absolute inset-0 top-1.5">
            <FontAwesomeIcon icon={faSun} />
          </span>
        ) : (
          <span className="absolute inset-0 top-1.5">
            <FontAwesomeIcon icon={faMoon} />
          </span>
        )}
      </button>
    </div>
  );
};

export default ThemeSwitch;
