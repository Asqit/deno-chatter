import { load } from "$std/dotenv/mod.ts";

export function useGetLocation() {
  let location = "";

  if (!Deno.env.has("WS_LOCATION")) {
    load().then((env) => {
      location = env["WS_LOCATION"];
    });
  } else {
    location = Deno.env.get("WS_LOCATION")!;
  }

  return location;
}
