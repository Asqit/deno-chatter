import Hamburger from "../islands/Hamburger.tsx";
import ThemeSwitcher from "../islands/ThemeSwitcher.tsx";

interface UsersProps {
  users: string[];
  closeMenuCallback: () => void;
  roomKey: string;
  username: string;
}

export default function Users(props: UsersProps) {
  const { users, closeMenuCallback, roomKey, username } = props;

  return (
    <article className={"flex flex-col gap-4 h-full w-full p-4"}>
      <div
        className={"flex items-center justify-between border-b dark:border-slate-700"}
      >
        <h1 className={"font-bold text-2xl py-2"}>
          <a href="/">Deno-Chatter</a>
        </h1>
        <Hamburger
          isOpen={true}
          onClick={closeMenuCallback}
        />
      </div>
      <h2 className={"text-xl font-bold"}>Room Information</h2>
      <ul>
        <li>
          Room Key: <span>{roomKey}</span>
        </li>
        <li>
          Username: <span>{username}</span>
        </li>
      </ul>
      <h3 className={"text-xl font-bold"}>Users ({users.length})</h3>
      <ul className={"flex-grow overflow-y-auto"}>
        {users.map((user) => {
          return (
            <li
              className={"flex items-center justify-start gap-x-2 text-lg"}
            >
              <span
                className={"w-2 h-2 rounded-full inline-block bg-emerald-600"}
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
