import { Accordion } from "../components/Accordion.tsx";
import Footer from "../components/Footer.tsx";

export default function Faq() {
  return (
    <section>
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
          className={"container mx-auto max-w-4xl px-4 md:p-8"}
        >
          <Accordion title="How it Works?" className={"my-4"}>
            <>
              <p>
                It's quite simple really. You either create or connect to a room
                by unique key, that you've chosen or received by someone. You
                also define your username. (A way to differentiate between chat
                participants)
              </p>
              <p>
                The chatting room exists until the last participant is
                connected. Once he/she disconnects, the room will be deleted and
                the key can be used again to generate new room.
              </p>
            </>
          </Accordion>

          <Accordion title="Do I need account?" className={"my-4"}>
            <>
              <p>
                No you don't need an account. There isn't even option to login
                nor register.
              </p>
            </>
          </Accordion>

          <Accordion
            title="Are my conversations saved somewhere?"
            className={"my-4"}
          >
            <>
              <p>
                No! Everything you type inside of the Room and the Room itself
                lives inside of server's temporary memory (RAM).
              </p>
            </>
          </Accordion>
        </article>
      </main>
      <Footer />
    </section>
  );
}
