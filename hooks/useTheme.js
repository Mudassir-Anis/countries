import { useContext } from "react";
import { themeComp } from "../contexts/ThemeContext";

const useTheme = () => useContext(themeComp);

export default useTheme;
