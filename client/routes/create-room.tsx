export default function CreateRoom() {
  return (
    <section>
      <header>
        <h1>Create a new chat room</h1>
        <h2>Here, you can create & join a new chat room</h2>
      </header>
      <main>
        <form>
          <input type="text" placeholder={"Enter a unique room key"} required />
        </form>
      </main>
    </section>
  );
}
