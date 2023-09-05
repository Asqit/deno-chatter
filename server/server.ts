import { assignHandlers, port, rooms, routes } from "./utils.ts";

Deno.serve({ port }, (req: Request) => {
  const joinMatch = routes.join_room.exec(req.url);
  const createMatch = routes.create_room.exec(req.url);

  // ---------------------------------------------------------- Join Room
  if (joinMatch) {
    console.log("client is joining a room");
    const roomKey = joinMatch.pathname.groups.code!;
    const username = joinMatch.pathname.groups.username!;

    if (!rooms.has(roomKey)) {
      return new Response(null, { status: 404 });
    }

    const room = rooms.get(roomKey)!;

    if (room.clients.find((client) => client.username === username)) {
      return new Response(null, { status: 404 });
    }

    if (req.headers.get("upgrade") !== "websocket") {
      return new Response(null, { status: 501 });
    }

    const { socket, response } = Deno.upgradeWebSocket(req);

    room.clients.push({ ws: socket, username });

    rooms.set(roomKey, room);

    assignHandlers(socket, roomKey);

    return response;
  }

  // ---------------------------------------------------------- Create Room
  if (createMatch) {
    const rookKey = createMatch.pathname.groups.code!;
    const username = createMatch.pathname.groups.username!;

    if (rooms.has(rookKey)) {
      return new Response(null, { status: 409 });
    }

    if (req.headers.get("upgrade") !== "websocket") {
      return new Response(null, { status: 501 });
    }

    const { socket, response } = Deno.upgradeWebSocket(req);

    rooms.set(rookKey, {
      key: rookKey,
      clients: [{ username, ws: socket }],
    });

    assignHandlers(socket, rookKey);

    return response;
  }

  return new Response(null, { status: 404 });
});
