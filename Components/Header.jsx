import React, { useContext, useState } from "react";
import { themeComp } from "../contexts/ThemeContext";

export default function Header() {
  const [isDark, setIsDark] = useContext(themeComp);
  return (
    <header className={`header-container ${isDark ? "dark" : ""}`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where in the worlds?</a>
        </h2>
        <p
          className="theme-changer"
          onClick={() => {
            setIsDark(!isDark);
            localStorage.setItem("isDarkMode", !isDark);
          }}
        >
          <i className={`fa-solid fa-${isDark ? "sun" : "moon"}`} />
          &nbsp;&nbsp; {isDark ? "Light" : "Dark"} Mode
        </p>
      </div>
    </header>
  );
}
