import { UpdateUsersEvent } from "../types.ts";
import { rooms } from "./configuration.ts";

/**
 * function used to send message to all chat participants inside of room
 * @param key unique key, that points to Room inside rooms map
 * @param message stringified event
 * @returns {void} nothing
 */
export function broadcast(key: string, message: string) {
	const room = rooms.get(key);

	if (!room) {
		console.error("404 : Room not found");
		return;
	}

	room.clients.forEach((client) => client.ws.send(message));
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

	const message: UpdateUsersEvent = {
		event: "update-users",
		usernames,
		timestamp: Date.now(),
	};

	broadcast(key, JSON.stringify(message));
}
