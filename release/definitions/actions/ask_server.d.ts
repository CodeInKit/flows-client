import { IActionData } from "..";
/**
 * this high order action send the data through websocket to the server
 * and return the response from the server flow.
 *
 * @param {WebSocket} socket
 * @param {string} flowName
 */
export declare function ask_server<T extends IActionData>(socket: WebSocket, flowName: string): (data: T) => Promise<T>;
