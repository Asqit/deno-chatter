export default function Navbar() {
  return (
    <nav
      className={"p-4 dark:bg-slate-950"}
    >
      <div
        className={"container mx-auto max-w-4xl flex items-start justify-between flex-wrap py-5"}
      >
        <h1 className={"font-bold text-lg"}>
          <a href="/">Deno-Chatter</a>
        </h1>
        <ul className={"flex gap-x-4"}>
          <li>
            <a href={"/create-room"}>Create room</a>
          </li>
          <li>
            <a href={"/join-room"}>Join room</a>
          </li>
          <li>
            <a href="/faq">FAQ</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
