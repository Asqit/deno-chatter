import { asset } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <section>
      <header
        className={" bg-gradient-to-br from-emerald-200 via-emerald-500 to-emerald-200 p-32"}
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
              Chat anonymously with help from <code>fresh</code> and{" "}
              <code>deno</code>
            </h2>
          </article>
        </div>
      </header>
      <main
        className={"px-8"}
      >
        <div
          className={"grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 my-8 md:container md:max-w-5xl md:mx-auto"}
        >
          <article
            className={"p-8 border border-black rounded-md flex flex-col items-center justify-center text-center"}
          >
            <h3 className={"font-semibold text-xl"}>Create a new room</h3>
            <h4>
              Create and join a new chat room identified by key defined by you.
            </h4>
            <a
              href={"create-room"}
              className={"px-4 py-2 rounded-md my-2 bg-emerald-500 text-white hover:bg-emerald-700 active:bg-emerald-900 block w-fit"}
            >
              Go Create!
            </a>
          </article>
          <article
            className={"p-8 border border-black rounded-md flex flex-col items-center justify-center text-center"}
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
            className={"p-8 border border-black rounded-md flex flex-col items-center justify-center text-center md:col-span-2"}
          >
            <h3 className={"font-semibold text-xl"}>Learn more</h3>
            <h4>Not sure how it works?</h4>
            <a
              href={"join-room"}
              className={"px-4 py-2 rounded-md my-2 bg-emerald-500 text-white hover:bg-emerald-700 active:bg-emerald-900 block w-fit"}
            >
              Learn more
            </a>
          </article>
        </div>
      </main>
      <footer className={"bg-black text-white p-8"}>
        <div className="p-8 max-w-4xl mx-auto">
          <div
            className={"flex justify-between items-center flex-wrap gap-y-4"}
          >
            <div>
              <p>
                Website by Ondřej Tuček
              </p>
              <a href="https://fresh.deno.dev" target="_blank" rel="external">
                <span className={"flex items-center gap-x-2"}>
                  <img
                    src={asset("images/logo.svg")}
                    className={"w-[32px] aspect-square"}
                    alt={"Fresh framework logo"}
                  />{" "}
                  Made with <b>Fresh</b>
                </span>
              </a>
            </div>
            <div className={"md:text-right"}>
              <p>
                Feedback? Issue?{" "}
                <a
                  rel="external"
                  target="blank"
                  className={"underline"}
                  href={"https://github.com/asqit/deno-chatter"}
                >
                  Let me know!
                </a>
              </p>
              <p>Copyright &copy; 2023</p>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
