import { Handlers } from "$fresh/server.ts";
import Navbar from "../components/Navbar.tsx";
import Footer from "../islands/Footer.tsx";
import VerifiedInput from "../islands/VerifiedInput.tsx";

export const handler: Handlers = {
  async POST(req, _) {
    const form = await req.formData();
    const username = form.get("username")?.toString();
    const roomKey = form.get("roomKey")?.toString();

    const headers = new Headers();

    headers.set("location", `/room/join/${roomKey}/${username}`);
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function JoinRoom() {
  return (
    <>
      <Navbar />
      <section
        className={"min-h-screen h-fit md:flex md:items-center md:justify-center md:bg-slate-200 dark:bg-slate-900 md:dark:bg-slate-800"}
      >
        <main
          className={"p-4 h-full md:h-fit container max-w-3xl mx-auto md:mt-8 md:rounded-md md:shadow-lg bg-white dark:bg-slate-900"}
        >
          <h1 className={"text-3xl font-bold my-2"}>Join existing room</h1>
          <h2 className={"text-xl font-semibold my-2 text-slate-400"}>
            Start by entering unique room key.
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
                className={"rounded-md bg-slate-200 p-2 dark:bg-slate-700"}
                required
              />
            </div>

            <div className={"flex flex-col"}>
              <label htmlFor={"username"}>Username</label>
              <VerifiedInput
                type="text"
                id="username"
                name="username"
                className={"rounded-md bg-slate-200 p-2 dark:bg-slate-700"}
                required
              />
            </div>

            <button
              className={"col-span-full mt-4 px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-700 active:bg-emerald-900 transition-colors duration-300"}
              type="submit"
            >
              Unlock!
            </button>
          </form>
        </main>
      </section>
      <Footer />
    </>
  );
}
