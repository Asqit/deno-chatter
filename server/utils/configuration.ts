import { Room } from "../types.ts";

/** port of our http and ws port */
export const port = 8080;

/** Non persistent chat rooms */
export const rooms: Map<string, Room> = new Map();

/** An object containing all possible routes for our HTTP server */
export const routes = {
	join_room: new URLPattern({ pathname: "/join/:code/username/:username" }),
	create_room: new URLPattern({ pathname: "/create/:code/username/:username" }),
};
