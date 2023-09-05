import { useEffect, useState } from "preact/hooks";
import { useDarkMode } from "../useDarkMode.ts";

export default function Room() {
  const username = "anonymous";
  const roomKey = "test";
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [ws, setWs] = useState<WebSocket>();
  const { isDarkMode, setDarkTheme, setLightTheme } = useDarkMode();

  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8080/create/${roomKey}/username/${username}`,
    );

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.event === "send-message") {
        setMessages((
          prev,
        ) => [
          ...prev,
          `${data.username}:${data.message}:${data.timestamp}`,
        ]);
        return;
      }

      if (data.event === "update-users") {
        setUsers((prev) => [...prev, data.usernames]);
      }
    };

    ws.onopen = () => {
      console.log("Connected!");
    };

    setWs(ws);
  }, []);

  return (
    <section className={"flex w-full h-screen"}>
      <div
        className={"w-1/3 border-r border-slate-300 p-8 max-w-md dark:bg-slate-900 dark:border-slate-500"}
      >
        <h2 className={"font-semibold text-lg"}>Users ({users.length})</h2>
        <ul>
          {users.map((user) => <li>{user}</li>)}
        </ul>
        <button>toggle theme</button>
      </div>
      <div className={"flex-grow flex flex-col p-8"}>
        <ul
          className={"flex-grow flex flex-col items-start justify-start gap-4 overflow-y-auto"}
        >
          {messages.map((message, index) => {
            const bits = message.split(":");
            const user = bits[0];
            const msg = bits[1];
            const time = bits[2];

            if (user === username) {
              return (
                <li
                  className={"bg-slate-500 text-white rounded-xl p-2 inline-block self-end justify-self-end"}
                >
                  {msg} <span>{time}</span>
                </li>
              );
            }

            return (
              <li
                className={"bg-emerald-500 text-white dark:text-black rounded-xl p-2 inline-block"}
                key={index}
              >
                {<span className={"font-bold"}>{user}</span>}
                {":"}
                {<span>{msg}</span>}
              </li>
            );
          })}
        </ul>
        <form
          className={"flex mt-4"}
          onSubmit={(e) => {
            e.preventDefault();
            if (ws) {
              ws.send(JSON.stringify({
                event: "send-message",
                username,
                message,
              }));
            }

            setMessage("");
            e.currentTarget.reset();
          }}
        >
          <input
            onChange={(e) => setMessage(e.currentTarget.value)}
            value={message}
            name="message"
            type="string"
            className={"px-2 flex-grow border border-emerald-500 rounded-l-md outline outline-transparent dark:bg-slate-700"}
          />
          <button
            type="submit"
            className={"bg-emerald-500 hover:bg-emerald-700 active:bg-emerald-900 px-4 py-2 rounded-r-md"}
          >
            send
          </button>
        </form>
      </div>
    </section>
  );
}
