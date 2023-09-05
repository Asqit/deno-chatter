import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>500 - Internal server error</title>
      </Head>
      <h1>Internal server error</h1>
    </>
  );
}
