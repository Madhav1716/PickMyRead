// ThemeContext.js
import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Retrieve theme preference from localStorage on component mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    // Toggle dark mode state
    setDarkMode((prevMode) => !prevMode);
    // Update theme preference in localStorage
    localStorage.setItem("theme", darkMode ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
