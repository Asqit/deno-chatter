import { useCallback } from "preact/hooks";
import { useDarkMode } from "../hooks/useDarkMode.ts";

export default function ThemeSwitcher() {
  const { isDarkMode, setDarkTheme, setLightTheme } = useDarkMode();

  const toggle = useCallback(() => {
    if (isDarkMode) setLightTheme();
    else setDarkTheme();
  }, [isDarkMode]);

  return (
    <button
      onClick={toggle}
      className={`hover:underline`}
    >
      {isDarkMode ? "Light" : "Dark"}
    </button>
  );
}
