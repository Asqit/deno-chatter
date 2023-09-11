import { useCallback, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

type ValueType =
  | string
  | string[]
  | number
  | undefined;

export default function VerifiedInput(
  props: JSX.HTMLAttributes<HTMLInputElement>,
) {
  const { className, ...rest } = props;
  const [error, setError] = useState<boolean>(false);
  const [value, setValue] = useState<ValueType>("");

  const handleChange = useCallback((e: Event) => {
    setError(false);

    const target = (e.target) as HTMLInputElement;
    const value = target.value;
    const regex = /^[A-Za-z0-9]+$/;

    if (!regex.test(value)) {
      setError(true);
      setValue("");
    } else {
      setValue(value);
    }
  }, []);

  return (
    <div>
      <input
        {...rest}
        onChange={handleChange}
        value={value}
        className={`${
          className ? className : ""
        } flex-grow w-full block outline ${
          error ? "outline-red-600" : "outline-transparent"
        }`}
      />
    </div>
  );
}
