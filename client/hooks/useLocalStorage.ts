import { useEffect, useState } from "preact/hooks";

export default function useLocalStorage<T>(
  /** key in which the value will by identified */
  key: string,
  initialValue: T | (() => T),
) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = window.localStorage.getItem(key);

    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
}
