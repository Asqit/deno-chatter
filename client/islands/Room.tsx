import { useEffect, useState } from "preact/hooks";
import Users from "../components/Users.tsx";
import Hamburger from "./Hamburger.tsx";

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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
    <section
      className={"flex w-full h-screen bg-slate-300 dark:bg-transparent"}
    >
      <div
        className={`w-full h-screen bg-white dark:bg-slate-900 fixed z-10 left-0 md:left-1/2 md:-translate-x-1/2 max-w-3xl ${
          isMenuOpen ? "top-0" : "-top-full"
        }`}
      >
        <Users
          users={users}
          closeMenuCallback={() => setIsMenuOpen(false)}
          username={username!}
          roomKey={roomKey!}
        />
      </div>

      <div
        className={"flex-grow flex flex-col bg-white dark:bg-slate-800 p-8 gap-4 max-w-3xl mx-auto"}
      >
        <Hamburger
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen((p) => !p)}
        />
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
