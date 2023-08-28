import { useSignal } from "@preact/signals";

export default function CreateRoomForm() {
  const ws = useSignal<WebSocket | null>(null);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
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
          id="key"
          className={"rounded-md bg-slate-200 p-2"}
          required
        />
      </div>

      <div className={"flex flex-col"}>
        <label htmlFor={"username"}>Username</label>
        <input
          type="text"
          id="username"
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
