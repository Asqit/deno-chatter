import RoomIsland from "../../../../islands/Room.tsx";
import { LayoutConfig } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";

export const config: LayoutConfig = {
  skipInheritedLayouts: true, // Skip already inherited layouts
};

export default function Room(props: PageProps) {
  const { params } = props;

  return (
    <RoomIsland roomKey={params.key} isJoin={true} username={params.username} />
  );
}
