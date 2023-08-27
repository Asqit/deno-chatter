import { Room } from "./types.ts";

/** port of our http and ws port */
export const port = 8000;

/** Non persistent chat rooms */
export const rooms: Map<string, Room> = new Map();

/** An object containing all possible routes for our HTTP server */
export const routes = {
	join_room: new URLPattern({ pathname: "/join/:code/username/:username" }),
	create_room: new URLPattern({ pathname: "/create/:code/username/:username" }),
};

/**
 * function used to send message to all chat participants inside of room
 * @param key unique key, that points to Room inside rooms map
 * @param message message to send
 * @returns {void} nothing
 */
export function broadcast(key: string, message: string) {
	const room = rooms.get(key);

	if (!room) {
		console.error("404 : Room not found");
		return;
	}

	for (const client of room.clients) {
		client.ws.send(message);
	}
}

/**
 * function used to update participants of current participants usernames
 * @param key ID for specific room
 * @returns {void} nothing
 */
export function broadcastUsernames(key: string) {
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
		})
	);
}

/**
 * function used to bind websocket handlers to new room participant
 * @param ws client's websocket reference
 * @param key ID of the room, where the participant connected
 */
export function assignHandlers(ws: WebSocket, key: string) {
	ws.onopen = () => {
		broadcastUsernames(key);
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
		const data = message.data;
		const room = rooms.get(key)!;
		const client = room.clients.find((c) => c.ws === ws);

		if (data.event === "send-message") {
			broadcast(
				key,
				JSON.stringify({
					event: "send-message",
					username: client?.username || "anonymous",
					message: data.message,
				})
			);
		}
	};

	ws.onerror = (e: Event | ErrorEvent) => {
		console.log(e instanceof ErrorEvent ? e.message : e.type);
	};
}
