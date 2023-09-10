import { useEffect, useState } from "preact/hooks";
import Users from "../components/Users.tsx";
import Hamburger from "./Hamburger.tsx";
import Message from "../components/Message.tsx";

interface RoomProps {
  roomKey: string;
  username?: string | "anonymous";
  isJoin: boolean;
  baseUrl: string;
}

/** Websocket's response when message event is caughted */
interface MessageResponse {
  message: string;
  username: string;
  timestamp: number;
  event: "send-message";
}

export default function Room(props: RoomProps) {
  const { roomKey, isJoin, username, baseUrl } = props;
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
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
        setMessages((prev) => [...prev, data]);
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
        className={`w-full h-screen bg-white dark:bg-slate-900 fixed z-10 left-0 md:left-1/2 md:-translate-x-1/2 max-w-3xl transition-all ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
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
        <div className={"flex-shrink-0"}>
          <Hamburger
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen((p) => !p)}
          />
        </div>
        <ul
          className={"flex-grow flex flex-col items-start justify-start gap-4 overflow-y-auto"}
        >
          {messages.map((message, index) => {
            return (
              <Message
                key={index}
                username={message.username}
                value={message.message}
                timestamp={message.timestamp}
                isAuthor={message.username.toUpperCase().trim() ===
                  username!.toUpperCase().trim()}
              />
            );
          })}
        </ul>
        <form
          className={"flex mt-4"}
          onSubmit={(e) => {
            e.preventDefault();

            if (!message) return;

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
