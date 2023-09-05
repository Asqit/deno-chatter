import RoomIsland from "../../../../islands/Room.tsx";
import { defineRoute, LayoutConfig } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import { load } from "$std/dotenv/mod.ts";

export const config: LayoutConfig = {
  skipInheritedLayouts: true, // Skip already inherited layouts
};

export default defineRoute(async (req, ctx) => {
  const { key, username } = ctx.params;

  let location = "";

  if (!Deno.env.has("WS_LOCATION")) {
    const env = await load();
    location = env["WS_LOCATION"];
  } else {
    location = Deno.env.get("WS_LOCATION")!;
  }

  return (
    <RoomIsland
      roomKey={key}
      isJoin={true}
      username={username}
      baseUrl={location}
    />
  );
});
