export default function Navbar() {
  return (
    <nav
      className={"p-4 dark:bg-black"}
    >
      <div
        className={"container mx-auto max-w-4xl flex items-start justify-between flex-wrap gap-y-2 py-5"}
      >
        <h1 className={"font-bold text-lg"}>
          <a href="/">Deno-Chatter</a>
        </h1>
        <ul className={"flex gap-x-4 basis-full md:basis-auto"}>
          <li className={"hover:text-emerald-500"}>
            <a href={"/create-room"}>Create room</a>
          </li>
          <li className={"hover:text-emerald-500"}>
            <a href={"/join-room"}>Join room</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
