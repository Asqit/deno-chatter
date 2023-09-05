import ThemeSwitcher from "../islands/ThemeSwitcher.tsx";

interface UsersProps {
  users: string[];
}

export default function Users(props: UsersProps) {
  const { users } = props;

  return (
    <article className={"flex flex-col gap-4 h-full w-full p-4"}>
      <h1 className={"font-bold text-2xl border-b py-2"}>
        <a href="/">Deno-Chatter</a>
      </h1>
      <h2 className={"text-xl font-bold"}>Users ({users.length})</h2>
      <ul className={"flex-grow overflow-y-auto"}>
        {users.map((user) => {
          return (
            <li
              className={"flex items-center justify-start gap-x-2 text-lg"}
            >
              <span
                className={"w-4 h-4 rounded-full inline-block bg-emerald-600"}
              />
              {String(user)}
            </li>
          );
        })}
      </ul>
      <div className={"rounded-md p-4 bg-black text-white"}>
        <ThemeSwitcher />
      </div>
    </article>
  );
}
