import { useEffect } from "preact/hooks";
import useLocalStorage from "./useLocalStorage.ts";

export function useDarkMode() {
  const [theme, setTheme] = useLocalStorage<string>("theme", "dark");

  const setLightTheme = () => {
    setTheme("light");
    document.documentElement.classList.remove("dark");
  };

  const setDarkTheme = () => {
    setTheme("dark");
    document.documentElement.classList.add("dark");
  };

  const toggle = () => {
    if (theme === "dark") setLightTheme();
    else setDarkTheme();
  };

  const setThemeByOs = () => {
    if (self.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      setThemeByOs();
      return;
    }

    const theme = JSON.parse(localStorage.getItem("theme")!);

    if (theme === "dark") {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }, []);

  return {
    isDarkMode: theme,
    toggle,
    setThemeByOs,
    setDarkTheme,
    setLightTheme,
  };
}
