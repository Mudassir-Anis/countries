import Header from "./Components/Header";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import SelectMenu from "./Components/SelectMenu";
import CountriesContainer from "./Components/CountriesContainer";
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { themeComp, ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <themeComp.Provider>
      <ThemeProvider>
        <Header />
        <Outlet />
      </ThemeProvider>
    </themeComp.Provider>
  );
}
