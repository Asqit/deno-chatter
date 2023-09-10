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
        className={"inline-block self-end justify-self-end"}
      >
        <span
          className={"bg-emerald-500 text-black rounded-xl float-right p-2 "}
        >
          {value}
        </span>
        <br />
        <span
          className={"text-black dark:text-slate-500 px-3 text-sm inline-block float-right my-4"}
        >
          you - {new Date(timestamp).toLocaleTimeString()}
        </span>
      </li>
    );
  }

  return (
    <li className={" inline-block"}>
      <span
        className={"text-black dark:text-slate-500 px-3 text-sm inline-block my-4"}
      >
        {username} - {new Date(timestamp).toLocaleTimeString()}
      </span>
      <br />
      <span className={"bg-slate-500 text-white rounded-xl p-2"}>{value}</span>
    </li>
  );
}
