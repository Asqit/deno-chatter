import { Accordion } from "../components/Accordion.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../islands/Footer.tsx";

export default function Faq() {
  return (
    <section className={"dark:bg-[#181818]"}>
      <Navbar />
      <header className={"bg-black text-white"}>
        <div className={"container max-w-4xl mx-auto p-32"}>
          <h1 className={"text-3xl font-bold"}>FAQ</h1>
          <h2 className={"text-xl font-semibold"}>
            Discover answers for your questions
          </h2>
        </div>
      </header>
      <main className={"min-h-[60vh]"}>
        <article
          className={"container mx-auto max-w-4xl px-4 md:p-8 md:grid md:grid-cols-1 md:gap-4"}
        >
          <Accordion title="How it Works?">
            <>
              <p>
                It's quite simple really. You either create or connect to a room
                by unique key, that you've chosen or received by someone. You
                also define your username. (A way to differentiate between chat
                participants)
              </p>
              <p>
                The chatting room exists only as long as there is at least one
                participant. After that, the room will be deleted, but the
                room's key can be reused.
              </p>
            </>
          </Accordion>

          <Accordion title="Do I need account?">
            <p>
              No you don't need an account. There isn't even option to login nor
              register.
            </p>
          </Accordion>

          <Accordion title="Are my conversations saved somewhere?">
            <p>
              No! the Room itself lives inside of server's temporary memory
              (RAM) and only has knowledge of your username. Furthermore, the
              messages are stored only on your browser tab, meaning, that once
              you refresh or close the tab, the messages will be gone.
            </p>
          </Accordion>
          <Accordion title="Can I send pictures, voice recordings...etc?">
            <p>
              Not yet. Currently the only way to communicate with each other is
              in form of text.
            </p>
          </Accordion>
        </article>
      </main>
      <Footer />
    </section>
  );
}
