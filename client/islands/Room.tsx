import { useCallback, useEffect, useState } from "preact/hooks";
import ControlPanel from "../components/ControlPanel.tsx";
import Hamburger from "./Hamburger.tsx";
import Brand from "../components/Brand.tsx";
import Messages from "./Messages.tsx";

interface RoomProps {
  roomKey: string;
  username?: string | "anonymous";
  isJoin: boolean;
  baseUrl: string;
}

/** Websocket's response in JSON format.*/
export interface MessageResponse {
  message: string;
  username: string;
  timestamp: number;
  event: "send-message";
}

/** All possible events, that can be send throughout the JSON communication */
type ResponseEventType = "send-message" | "update-users";

export default function Room(props: RoomProps) {
  const { roomKey, isJoin, username, baseUrl } = props;
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [message, setMessage] = useState<string>("");
  const [ws, setWs] = useState<WebSocket>();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // ----------------------------------------------- useEffect
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
      console.error(e);
      alert("An Error occurred...sorry 😿");
      ws.close();
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const eventType = data.event as ResponseEventType;

      switch (eventType) {
        case "send-message":
          setMessages((prev) => prev.concat(data));
          break;
        case "update-users":
          setUsers(() => [...data.usernames]);
          break;
      }
    };

    setWs(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // ----------------------------------------------- form.onSubmit
  const handleSubmit = useCallback((e: Event) => {
    e.preventDefault();

    if (!message.trim()) return;

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
    (e.target as HTMLFormElement).reset();
  }, [message, username, ws]);

  // ----------------------------------------------- input.onChange
  const handleChange = useCallback((e: Event) => {
    const target = (e.target) as HTMLInputElement;
    const value = target.value;

    if (!value.trim()) {
      return;
    }

    setMessage(value);
  }, [setMessage]);

  return (
    <section
      className={"flex w-full h-screen bg-slate-300 dark:bg-transparent md:p-4"}
    >
      <div
        className={`w-full h-screen md:rounded-xl md:h-[calc(100vh-2rem)] bg-white/40 dark:bg-slate-900/40 backdrop-blur-md fixed z-10 left-0 md:left-1/2 md:-translate-x-1/2 max-w-3xl transition-all duration-300 ${
          isMenuOpen ? "translate-y-0" : "translate-y-[110%]"
        }`}
      >
        <ControlPanel
          users={users}
          closeMenuCallback={() => setIsMenuOpen(false)}
          username={username!}
          roomKey={roomKey!}
        />
      </div>

      <div
        className={"flex-grow flex flex-col bg-white dark:bg-slate-800 p-8 gap-4 max-w-3xl mx-auto md:rounded-xl md:shadow-lg"}
      >
        <div
          className={"flex flex-shrink-0 items-center justify-between border-b dark:border-slate-700"}
        >
          <Brand />
          <Hamburger
            isOpen={isMenuOpen}
            containerClassName="relative z-50"
            onClick={() => setIsMenuOpen((p) => !p)}
          />
        </div>
        <Messages username={username!} messages={messages} />
        <form
          className={"flex mt-4"}
          onSubmit={handleSubmit}
        >
          <input
            className={"rounded-l-md bg-slate-200 p-2 dark:bg-slate-700 flex-grow border border-slate-300 dark:border-slate-600"}
            onChange={handleChange}
            value={message}
            name="message"
            type="string"
            autofocus
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
