export default function Brand({ isSmall }: { isSmall?: boolean }) {
  return (
    <h1 className={`text-2xl font-black ${isSmall ? "py-0" : "py-4"}`}>
      <a href="/">🦕 Deno-Chatter</a>
    </h1>
  );
}
