import { handleModeratorEvent } from "../event-handlers/handleModaratorEvent.ts";
import { AppEvents } from "../types.ts";
import { broadcast } from "./broadcast.ts";

/**
 * function used to differentiate each events and then handle it
 * @param key
 * @param event
 * @returns
 */
export function eventHandler(key: string, event: AppEvents) {
	if (event.event === "send-message") {
		const message = {
			timestamp: Date.now(),
			event: "send-message",
			username: event.username,
			message: event.message,
		};

		broadcast(key, JSON.stringify(message));

		return;
	}

	if (event.event === "moderator-message") {
		handleModeratorEvent(event);
		return;
	}
}
