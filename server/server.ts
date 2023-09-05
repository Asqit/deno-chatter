import { Room } from "./types.ts";
import { routes } from "./utils.ts";

const port = 8080;
const rooms: Map<string, Room> = new Map();

/** function used to send a message for all users inside of one room */
function broadcast(key: string, message: string) {
  const room = rooms.get(key);

  if (!room) {
    console.error("404 : Room not found");
    return;
  }

  room.clients.forEach((client) => client.ws.send(message));
}

/** function used to update room clients of all participants username */
function broadcastUsernames(key: string) {
  const room = rooms.get(key);

  if (!room) {
    console.error("404 : Room not found");
    return;
  }

  const usernames = room.clients.map((c) => c.username);

  broadcast(
    key,
    JSON.stringify({
      event: "update-users",
      usernames,
      timestamp: Date.now(),
    }),
  );
}

/** utility function used to bind websocket handlers to new clients */
function assignHandlers(ws: WebSocket, key: string) {
  ws.onopen = () => {
    broadcastUsernames(key);
    broadcast(
      key,
      JSON.stringify({
        event: "send-message",
        username: "Aux",
        message: "New client has joined us",
        timestamp: Date.now(),
      }),
    );
  };

  ws.onclose = () => {
    const room = rooms.get(key)!;
    const newClients = room.clients.filter((client) => client.ws !== ws);

    if (newClients.length == 0) {
      rooms.delete(key);
      return;
    }

    room.clients = newClients;
    rooms.set(key, room);
    broadcastUsernames(key);
  };

  ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    const room = rooms.get(key)!;
    const client = room.clients.find((c) => c.ws === ws);

    if (data.event === "send-message") {
      broadcast(
        key,
        JSON.stringify({
          event: "send-message",
          username: client?.username || "anonymous",
          message: data.message,
          timestamp: Date.now(),
        }),
      );
    } else {
      console.error(`Unknown event: ${data.event}`);
    }
  };

  ws.onerror = (e: Event | ErrorEvent) => {
    console.error(e instanceof ErrorEvent ? e.message : e.type);
  };
}

Deno.serve({ port }, (req: Request) => {
  const joinMatch = routes.join_room.exec(req.url);
  const createMatch = routes.create_room.exec(req.url);

  console.log("Connection...");

  // -------------------------------------------------------- Join Room
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
    console.log("creating a new room");
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

  console.log("Not Found");
  return new Response(null, { status: 404 });
});
