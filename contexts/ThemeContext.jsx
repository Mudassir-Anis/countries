import { useState } from "react";
import { createContext } from "react";

export const themeComp = createContext("I am theme");

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDarkMode")) || false
  );

  return (
    <themeComp.Provider value={[isDark, setIsDark]}>
      {children}
    </themeComp.Provider>
  );
}
