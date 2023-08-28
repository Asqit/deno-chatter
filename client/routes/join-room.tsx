export default function JoinRoom() {
  return (
    <section
      className={"md:min-h-screen md:h-fit md:flex md:items-center md:justify-center md:bg-slate-200"}
    >
      <main
        className={"p-4 container max-w-3xl mx-auto md:mt-8 md:rounded-md md:shadow-lg md:border bg-white"}
      >
        <h1 className={"text-3xl font-bold my-2"}>Join existing room</h1>
        <h2 className={"text-xl font-semibold my-2 text-slate-400"}>
          Start by entering unique room key.
        </h2>
        <form className={"grid grid-cols-2 grid-rows-2 gap-4 mt-4"}>
          <div className={"flex flex-col"}>
            <label htmlFor={"key"}>Room Key</label>
            <input
              type="text"
              id="key"
              className={"rounded-md bg-slate-200 p-2"}
              required
            />
          </div>

          <div className={"flex flex-col"}>
            <label htmlFor={"username"}>Username</label>
            <input
              type="text"
              id="username"
              className={"rounded-md bg-slate-200 p-2"}
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
  );
}
