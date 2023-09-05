import { useDarkMode } from "../hooks/useDarkMode.ts";

export default function ThemeSwitcher() {
  const { isDarkMode, setDarkTheme, setLightTheme } = useDarkMode();

  return (
    <button
      className={"hover:underline"}
      onClick={isDarkMode ? setLightTheme : setDarkTheme}
    >
      {isDarkMode ? "light theme" : "dark theme"}
    </button>
  );
}
