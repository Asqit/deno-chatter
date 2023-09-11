import { useDarkMode } from "../hooks/useDarkMode.ts";

export default function ThemeSwitcher() {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      className={`hover:underline`}
    >
      {isDarkMode === "dark" ? "Light" : "Dark"}
    </button>
  );
}
