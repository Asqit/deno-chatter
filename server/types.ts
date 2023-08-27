/** interface used to describe room participant */
export interface Client {
	/** user defined name, other can refer to as */
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
