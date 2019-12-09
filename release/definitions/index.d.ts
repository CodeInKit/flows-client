import { Flows } from '@codeinkit/flows/release/client';
export declare const flows: Flows;
/**
 * react hook that execute a hook from flow library
 *
 * @param data flow data, show include the flowName to identify the executed flow.
 */
export declare function useCIKFlow(flowName: string, data: any, itemToFollow?: string, dependencies?: string[]): any[];
/**
 * this high order action send the data through websocket to the server
 * and return the response from the server flow.
 *
 * @param {WebSocket} socket
 * @param {string} flowName
 */
export declare function ask_server(socket: WebSocket, flowName: string): (fdata: any) => Promise<unknown>;
