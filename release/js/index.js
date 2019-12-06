import { useState, useEffect } from 'react';
import { Flows } from '@codeinkit/flows/release/client';
export const flows = new Flows();
/**
 * react hook that execute a hook from flow library
 *
 * @param data flow data, show include the flowName to identify the executed flow.
 */
export function useCIKFlow(data, itemToFollow) {
    const initialState = typeof data[itemToFollow] !== 'undefined' ? data[itemToFollow] : data;
    const [flowState, setFlowState] = useState(initialState);
    useEffect(() => {
        flows.execute(data.flowName, data).then((fdata) => {
            const newData = typeof fdata[itemToFollow] !== 'undefined' ? fdata[itemToFollow] : fdata;
            setFlowState(newData);
        });
        // we don't want to execute on each update (render) therefore we don't have dependencies.
        // eslint-disable-next-line
    }, []);
    return [flowState, setFlowState];
}
/**
 * this high order action send the data through websocket to the server
 * and return the response from the server flow.
 *
 * @param {WebSocket} socket
 * @param {string} flowName
 */
export function ask_server(socket) {
    // this is the action that will send the data through websocket and return with the data to the next action.
    return function (fdata) {
        fdata.requestId = Math.round(Math.random() * 10 * 8);
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(fdata));
        }
        else if (socket.readyState === WebSocket.CONNECTING) {
            socket.addEventListener('open', () => {
                socket.send(JSON.stringify(fdata));
            });
        }
        else {
            throw new Error('Websocket is close!');
        }
        // while sending the message to the server we listen for response from the server.
        return new Promise(resolve => {
            const event = (message) => {
                const data = JSON.parse(message.data);
                if (data.requestId === fdata.requestId) {
                    socket.removeEventListener('message', event);
                    Object.assign(fdata, data);
                    resolve();
                }
            };
            socket.addEventListener('message', event);
        });
    };
}
