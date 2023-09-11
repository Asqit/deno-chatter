import Message from "../components/Message.tsx";
import { MessageResponse } from "./Room.tsx";
import { useCallback, useEffect, useMemo, useRef } from "preact/hooks";

interface MessagesProps {
  messages: MessageResponse[];
  username: string;
}

export default function Messages(props: MessagesProps) {
  const { messages, username } = props;
  const ref = useRef<HTMLUListElement | null>(null);

  const scrollToBottom = useCallback((element: HTMLElement) => {
    element.scrollTop = element.scrollHeight;
  }, []);

  const memoizedScrollToBottom = useMemo(() => scrollToBottom, []);

  useEffect(() => {
    if (ref.current) {
      memoizedScrollToBottom(ref.current);
    }
  }, [messages]);

  return (
    <ul
      ref={ref}
      className={"flex-grow flex flex-col items-start justify-start gap-2 overflow-y-auto"}
    >
      {messages.map((message, i) => (
        <Message
          key={i}
          username={message.username}
          value={message.message}
          timestamp={message.timestamp}
          isAuthor={message.username.toUpperCase().trim() ===
            username!.toUpperCase().trim()}
        />
      ))}
    </ul>
  );
}
