import { AppEvents, MessageEvent, ModeratorMessageEvent, Room, UpdateUsersEvent } from "./types.ts";

/** port of our http and ws port */
export const port = 8080;

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

		const message: MessageEvent = {
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

		const message: MessageEvent = {
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
				differentiateEvent(key, data);
				break;
			case "moderator-message":
				differentiateEvent(key, data);
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

/**
 * function used to differentiate each events and then handle it
 * @param key
 * @param event
 * @returns
 */
function differentiateEvent(key: string, event: AppEvents) {
	if (event.event === "send-message") {
		const message: MessageEvent = {
			timestamp: Date.now(),
			event: "send-message",
			username: event.username,
			message: event.message,
		};

		broadcast(key, JSON.stringify(message));

		return;
	}

	if (event.event === "moderator-message") {
		manageModeratorMessage(event);
		return;
	}
}

// TODO: Work on command parsing and handling
function manageModeratorMessage(_: ModeratorMessageEvent) {}
