import { Handlers } from "$fresh/server.ts";
import Navbar from "../components/Navbar.tsx";
import VerifiedInput from "../islands/VerifiedInput.tsx";

export const handler: Handlers = {
  async POST(req, _) {
    const form = await req.formData();
    const username = form.get("username")?.toString();
    const roomKey = form.get("roomKey")?.toString();

    const headers = new Headers();

    headers.set("location", `/room/create/${roomKey}/${username}`);
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function CreateRoom() {
  return (
    <>
      <Navbar />
      <section
        className={"pt-4 md:py-32"}
      >
        <main
          className={"p-4 mt-8 h-full md:h-fit container max-w-3xl mx-auto md:mt-8 md:rounded-md md:shadow-lg md:bg-white md:dark:bg-zinc-900"}
        >
          <h1 className={"text-3xl font-bold my-2"}>Create a new chat room</h1>
          <h2 className={"text-xl font-semibold my-2 text-zinc-400"}>
            Start by entering unique room key & your username.
          </h2>
          <form
            className={"grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-2 gap-4 mt-4"}
            method={"POST"}
          >
            <div className={"flex flex-col"}>
              <label htmlFor={"key"}>Room Key</label>
              <VerifiedInput
                type="text"
                id="roomKey"
                name="roomKey"
                className={"rounded-md bg-zinc-200 p-2 dark:bg-zinc-700"}
                required
              />
            </div>

            <div className={"flex flex-col"}>
              <label htmlFor={"username"}>Username</label>
              <VerifiedInput
                type="text"
                id="username"
                name="username"
                className={"rounded-md bg-zinc-200 p-2 dark:bg-zinc-700"}
                required
              />
            </div>

            <button
              className={"col-span-full mt-4 px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-700 active:bg-emerald-900 transition-colors duration-300"}
              type="submit"
            >
              Create a new room!
            </button>
          </form>
        </main>
      </section>
    </>
  );
}
