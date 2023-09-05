import { asset } from "$fresh/runtime.ts";
import Navbar from "../components/Navbar.tsx";
import Footer from "../islands/Footer.tsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className={"dark:bg-slate-950"}>
        <header
          className={" bg-gradient-to-br from-emerald-200 via-emerald-500 to-emerald-400 dark:from-emerald-600 dark:via-emerald-900 dark:to-emerald-600 p-32"}
        >
          <div
            className={"container mx-auto max-w-5xl flex items-center gap-x-4"}
          >
            <figure>
              <img src={asset("images/deno_logo.png")} />
            </figure>
            <article>
              <h1 className={"text-3xl md:text-5xl font-bold"}>Deno Chatter</h1>
              <h2 className={"text-2xl "}>
                Chat anonymously with friends, colleges...
              </h2>
            </article>
          </div>
        </header>
        <main
          className={"px-8 py-16"}
        >
          <div
            className={"grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 my-8 md:container md:max-w-5xl md:mx-auto"}
          >
            <article
              className={"p-8 border border-black dark:border-slate-600 rounded-md flex flex-col items-center justify-center text-center"}
            >
              <h3 className={"font-semibold text-xl"}>Create a new room</h3>
              <h4>
                Create and join a new chat room identified by key defined by
                you.
              </h4>
              <a
                href={"create-room"}
                className={"px-4 py-2 rounded-md my-2 bg-emerald-500 text-white hover:bg-emerald-700 active:bg-emerald-900 block w-fit"}
              >
                Go Create!
              </a>
            </article>
            <article
              className={"p-8 border border-black dark:border-slate-600 rounded-md flex flex-col items-center justify-center text-center"}
            >
              <h3 className={"font-semibold text-xl"}>Join existing room</h3>
              <h4>Join already existing chat by entering unique room key.</h4>
              <a
                href={"join-room"}
                className={"px-4 py-2 rounded-md my-2 bg-emerald-500 text-white hover:bg-emerald-700 active:bg-emerald-900 block w-fit"}
              >
                Go Chatting
              </a>
            </article>
            <article
              className={"p-8 border border-black dark:border-slate-600 rounded-md flex flex-col items-center justify-center text-center md:col-span-2"}
            >
              <h3 className={"font-semibold text-xl"}>Learn more</h3>
              <h4>Not sure how it works?</h4>
              <a
                href={"faq"}
                className={"px-4 py-2 rounded-md my-2 bg-emerald-500 text-white hover:bg-emerald-700 active:bg-emerald-900 block w-fit"}
              >
                Learn more
              </a>
            </article>
          </div>
        </main>
      </section>
      <Footer />
    </>
  );
}
