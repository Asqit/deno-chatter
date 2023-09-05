import { useEffect, useState } from "preact/hooks";
import Users from "../components/Users.tsx";

interface RoomProps {
  roomKey: string;
  username?: string | "anonymous";
  isJoin: boolean;
  baseUrl: string;
}

export default function Room(props: RoomProps) {
  const { roomKey, isJoin, username, baseUrl } = props;
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
      `${baseUrl}/${
        isJoin ? "join" : "create"
      }/${roomKey}/username/${username}`,
    );

    ws.onclose = (e) => {
      alert("Disconnected");
    };

    ws.onerror = (e) => {
      console.log(e);
      ws.close();
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
      <input type="checkbox" className={"hidden peer"} id="slider" />
      <div
        className={"w-1/3 border-r border-slate-300 max-w-md dark:bg-slate-900 dark:border-slate-500 relative top-0 left-0 peer-checked:w-0 peer-checked:hidden"}
      >
        <label
          htmlFor={"slider"}
          className={"hidden flex flex-col items-center justify-center gap-2 absolute -right-8 top-4 border-black border-2 p-2 bg-white"}
        >
          <div className={"w-4 h-[0.32rem] block bg-black"} />
          <div className={"w-4 h-[0.32rem] block bg-black"} />
        </label>
        <Users users={users} />
      </div>

      <div className={"flex-grow flex flex-col p-8 gap-4"}>
        <header className="p-4 border-b">
          <h1 className={"text-xl font-bold"}>
            Room code: <span className={"font-mono text-lg"}>{roomKey}</span>
          </h1>
          <h2>Username: {username}</h2>
        </header>
        <ul
          className={"flex-grow flex flex-col items-start justify-start gap-4 overflow-y-auto"}
        >
          {messages.map((message, index) => {
            const bits = message.split(":");
            const user = bits[0];
            const msg = bits[1];

            if (user.toUpperCase().trim() === username?.toUpperCase().trim()) {
              return (
                <li
                  className={"bg-emerald-500 text-black rounded-xl p-2 inline-block self-end justify-self-end"}
                >
                  {msg}
                </li>
              );
            }

            return (
              <li
                className={"bg-slate-500 text-white rounded-xl p-2 inline-block"}
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
