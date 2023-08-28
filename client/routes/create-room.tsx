import { Handlers } from "$fresh/server.ts";
import CreateRoomForm from "../islands/create-room-form.tsx";

export const roomCreationHandler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const roomKey = form.get("key")?.toString();
    const username = form.get("username")?.toString();

    const ws = new WebSocket(
      `ws://localhost:8001/create/${roomKey}/username/${username}`,
    );

    const headers = new Headers();

    if (ws.readyState === ws.OPEN) {
      headers.append("location", `room/${roomKey}`);
      return new Response(null, {
        status: 308,
        headers,
      });
    }

    headers.append("location", "connection-error");
    return new Response(null, { headers, status: 301 });
  },
};

export default function CreateRoom() {
  return (
    <section
      className={"md:min-h-screen md:h-fit md:flex md:items-center md:justify-center md:bg-slate-200"}
    >
      <main
        className={"p-4 container max-w-3xl mx-auto md:mt-8 md:rounded-md md:shadow-lg md:border bg-white"}
      >
        <h1 className={"text-3xl font-bold my-2"}>Create a new chat room</h1>
        <h2 className={"text-xl font-semibold my-2 text-slate-400"}>
          Start by entering unique room key.
        </h2>
        <CreateRoomForm />
      </main>
    </section>
  );
}
