/** interface used to describe room participant */
export interface Client {
	/** user defined name, others can refer to as */
	username: string;

	/** client's websocket reference */
	ws: WebSocket;

	/** chat moderator */
	moderator?: WebSocket;

	/** each room can be locked by password (managed by moderator) */
	password?: string;
}

/** interface used to describe room */
export interface Room {
	/** unique key used to differentiate between other rooms inside room map */
	key: string;

	/** all chat participants inside of single room */
	clients: Client[];
}

/** Base version of our event type */
export interface BaseEvent {
	/** time of the event */
	timestamp: number;
}

/** Event used to send message in the room */
export interface MessageEvent extends BaseEvent {
	event: "send-message";
	username: string;
	message: string;
}

/** Event used when new client is connected or disconnects */
export interface UpdateUsersEvent extends BaseEvent {
	event: "update-users";
	usernames: string[];
}

export interface ModeratorMessageEvent extends BaseEvent {
	event: "moderator-message";
	message: string;
}

export type AppEvents = UpdateUsersEvent | MessageEvent | ModeratorMessageEvent;
