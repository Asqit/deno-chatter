import { AppEvents } from "../types.ts";
import { broadcastUsernames, broadcast } from "./broadcast.ts";
import { rooms } from "./configuration.ts";
import { eventHandler } from "./eventHandler.ts";

/**
 * function used to bind websocket handlers to new room participant
 * @param ws client's websocket reference
 * @param key ID of the room, where the participant connected
 */
export function assignHandlers(ws: WebSocket, key: string) {
	const SERVER_NAME = `Maid@${key}`;

	// ----------------------------------------------------------------- onOpen
	ws.onopen = (_) => {
		const room = rooms.get(key);
		const user = room ? room.clients.find((i) => i.ws === ws) : false;

		const message = {
			event: "send-message",
			username: SERVER_NAME,
			message: user ? `${user.username} has joined the chat` : "New client has joined the chat",
			timestamp: Date.now(),
		};

		broadcastUsernames(key);
		broadcast(key, JSON.stringify(message));
	};

	// ----------------------------------------------------------------- onClose
	ws.onclose = (_) => {
		const room = rooms.get(key)!;
		const user = room.clients.find((u) => u.ws === ws);
		const newClients = room.clients.filter((client) => client.ws !== ws);

		if (newClients.length == 0) {
			rooms.delete(key);
			return;
		}

		room.clients = newClients;
		rooms.set(key, room);

		const message = {
			event: "send-message",
			username: SERVER_NAME,
			message: `${user?.username} has left the chat.`,
			timestamp: Date.now(),
		};

		broadcastUsernames(key);
		broadcast(key, JSON.stringify(message));
	};

	// ----------------------------------------------------------------- onMessage
	ws.onmessage = (message) => {
		const data = JSON.parse(message.data) as AppEvents;

		switch (data.event) {
			case "send-message":
				eventHandler(key, data);
				break;
			case "moderator-message":
				eventHandler(key, data);
				break;
			case "update-users":
				break;
			default:
				console.warn(`Unknown Event: ${data}`);
				break;
		}
	};

	// ----------------------------------------------------------------- onError
	ws.onerror = (e: Event | ErrorEvent) => {
		console.error(e instanceof ErrorEvent ? e.message : e.type);
	};
}
