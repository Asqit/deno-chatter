interface MessageProps {
  value: string;
  timestamp: number;
  username: string;
  isAuthor: boolean;
}

export default function Message(props: MessageProps) {
  const { value, username, timestamp, isAuthor } = props;

  if (isAuthor) {
    return (
      <li
        className={"inline-block self-end justify-self-end animate-fade-in-up select-none group"}
      >
        <span
          className={"bg-emerald-500 text-black rounded-xl float-right p-2 select-text"}
        >
          {value}
        </span>
        <br />
        <span
          className={"text-black dark:text-zinc-500 px-3 text-sm float-right my-2 inline-block opacity-0 transition-opacity group-hover:opacity-100"}
        >
          🫵 You - {new Date(timestamp).toLocaleTimeString()}
        </span>
      </li>
    );
  }

  return (
    <li className={"inline-block animate-fade-in-up select-none"}>
      <span
        className={"text-black dark:text-zinc-500 px-3 text-sm inline-block my-4"}
      >
        {username} - {new Date(timestamp).toLocaleTimeString()}
      </span>
      <br />
      <span className={"bg-zinc-500 text-white rounded-xl p-2 select-text"}>
        {value}
      </span>
    </li>
  );
}
