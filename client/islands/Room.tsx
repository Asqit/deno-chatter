import { load } from "$std/dotenv/mod.ts";
import { useEffect, useState } from "preact/hooks";

interface RoomProps {
  roomKey: string;
  username?: string | "anonymous";
  isJoin: boolean;
}

let location: string;

if (!Deno.env.has("WS_LOCATION")) {
  load().then((env) => {
    location = env["WS_LOCATION"];
  });
} else {
  location = Deno.env.get("WS_LOCATION")!;
}

export default function Room(props: RoomProps) {
  const { roomKey, isJoin, username } = props;
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [ws, setWs] = useState<WebSocket>();

  useEffect(() => {
    if (!roomKey || !username) {
      alert("Invalid parameters");
      return;
    }

    const ws = new WebSocket(
      `${location}/${
        isJoin ? "join" : "create"
      }/${roomKey}/username/${username}`,
    );

    ws.onclose = (e) => {
      console.warn(`disconnecting...${e}`);
      alert("Disconnected");
    };

    ws.onerror = (e) => {
      console.log(e);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.event === "send-message") {
        setMessages((prev) => [...prev, `${data.username}: ${data.message}`]);
        return;
      }

      if (data.event === "update-users") {
        setUsers(() => [...data.usernames]);
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
        <ul className={"flex flex-col items-center justify-center gap-y-2"}>
          {users.map((user) => <li>{user}</li>)}
        </ul>
      </div>
      <div className={"flex-grow flex flex-col p-8"}>
        <ul
          className={"flex-grow flex flex-col items-start justify-start gap-4 overflow-y-auto"}
        >
          {messages.map((message, index) => {
            const bits = message.split(":");
            const user = bits[0];
            const msg = bits[1];

            console.log(message);

            if (user === username) {
              return (
                <li
                  className={"bg-slate-500 text-white rounded-xl p-2 inline-block self-end justify-self-end"}
                >
                  {msg}
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
              ws.send(
                JSON.stringify({
                  event: "send-message",
                  username,
                  message,
                }),
              );
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
            className={"rounded-l-md bg-slate-200 p-2 dark:bg-slate-700 flex-grow border border-slate-600"}
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
