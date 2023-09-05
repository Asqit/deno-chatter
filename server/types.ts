/** interface used to describe room participant */
export interface Client {
	/** user defined name, others can refer to as */
	username: string;

	/** client's websocket reference */
	ws: WebSocket;
}

/** interface used to describe room */
export interface Room {
	/** unique key used to differentiate between other rooms inside room map */
	key: string;

	/** all chat participants inside of single room */
	clients: Client[];
}

// TODO: figure out the typing system

/** Event used to send message in the room */
export interface MessageEvent {
	type: "send-message";
	username: string;
	message: string;
}

/** Event used when new client is connected or disconnects */
export interface UpdateUsersEvent {
	type: "update-users";
	usernames: string[];
}

/** type we used to differentiate between event types */
export type PacketEvent = MessageEvent | UpdateUsersEvent;

/** An interface describing the `MessageEvent.data` object */
export interface Packet<PacketEvent> {
	event: Event;
}
