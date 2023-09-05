import { useState } from "preact/hooks";
import Room from "./Room.tsx";

export default function CreateRoomForm() {
  const [isRoom, setIsRoom] = useState<boolean>(false);
  const [ws, setWs] = useState<WebSocket>();
  const [formData, setFormData] = useState({
    key: "",
    username: "anonymous",
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const { key, username } = formData;

    const socket = new WebSocket(
      `ws://localhost:8001/create/${key}/username/${username}`,
    );

    socket.onopen = (e) => <Room ws={socket} />;

    socket.send(JSON.stringify({
      event: "send-message",
      username,
      message: "píča",
    }));

    socket.onmessage = (e) => console.log(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={"grid grid-cols-1 grid-rows-3 gap-4 mt-4"}
    >
      <div className={"flex flex-col"}>
        <label htmlFor={"key"}>Room Key</label>
        <input
          type="text"
          name="key"
          id="key"
          value={formData.key}
          onChange={(e) => {
            setFormData({
              ...formData,
              [e.currentTarget.name]: e.currentTarget.value,
            });
          }}
          className={"rounded-md bg-slate-200 p-2"}
          required
        />
      </div>

      <div className={"flex flex-col"}>
        <label htmlFor={"username"}>Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={(e) => {
            setFormData({
              ...formData,
              [e.currentTarget.name]: e.currentTarget.value,
            });
          }}
          className={"rounded-md bg-slate-200 p-2"}
          required
        />
      </div>

      <button
        className={"px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-700 active:bg-emerald-900 transition-colors duration-300"}
        type="submit"
      >
        Create!
      </button>
    </form>
  );
}
