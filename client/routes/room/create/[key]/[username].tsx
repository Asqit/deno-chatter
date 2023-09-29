import RoomIsland from "../../../../islands/Room.tsx";
import { defineRoute, LayoutConfig } from "$fresh/server.ts";
import { fetchWsLocation } from "../../../../utils/fetchWsLocation.ts";

export const config: LayoutConfig = {
  skipInheritedLayouts: true, // Skip already inherited layouts
};

export default defineRoute(async (req, ctx) => {
  const { key, username } = ctx.params;
  const location = await fetchWsLocation();

  return (
    <RoomIsland
      roomKey={key}
      isJoin={false}
      username={username}
      baseUrl={location}
    />
  );
});
