import { load } from "$std/dotenv/mod.ts";

export async function fetchWsLocation() {
  let location = "";
  const ENV_KEY = "WS_LOCATION";

  if (!Deno.env.has(ENV_KEY)) {
    const env = await load();
    location = env[ENV_KEY];
  } else {
    location = Deno.env.get(ENV_KEY)!;
  }

  if (!location) {
    location = "ws://localhost:8080";
  }

  return location;
}
