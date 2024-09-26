import RoomIsland from "../../../../islands/Room.tsx";
import { defineRoute, LayoutConfig } from "$fresh/server.ts";
import { fetchWsLocation } from "../../../../utils/fetchWsLocation.ts";
import { locate } from "../../../../utils/locate.ts";

export const config: LayoutConfig = {
  skipInheritedLayouts: true, // Skip already inherited layouts
};

export default defineRoute(async (_req, ctx) => {
  const { key, username } = ctx.params;
  const location = await fetchWsLocation();
  await locate()

  return (
    <RoomIsland
      roomKey={key}
      isJoin={true}
      username={username}
      baseUrl={location}
    />
  );
});
