import { useState, useEffect } from 'react';
import { Flows } from '@codeinkit/flows/release/client';
import _ from 'lodash';
export const flows = new Flows();
/**
 * react hook that execute a hook from flow library
 *
 * @param data flow data, show include the flowName to identify the executed flow.
 */
export function useCIKFlow(flowName, data, itemToFollow, dependencies = []) {
    if (!_.isString(flowName)) {
        throw new Error('the first param should be a string represent the flow name');
    }
    if (!_.isPlainObject(data)) {
        throw new Error('the second parameter should be the data that you initially pass to the flow');
    }
    if (!_.isUndefined(itemToFollow) && _.isArray(itemToFollow)) {
        dependencies = itemToFollow;
    }
    else if (!_.isUndefined(itemToFollow) && !_.isString(itemToFollow)) {
        throw new Error('the third parameter should be a string that represent item in the data which we follow or the dependencies on which we re-execute the flow');
    }
    if (!_.isArray(dependencies)) {
        throw new Error('dependencies should be an array of strings');
    }
    const initialState = typeof data[itemToFollow] !== 'undefined' ? data[itemToFollow] : data;
    const [flowState, setFlowState] = useState(initialState);
    useEffect(() => {
        flows.execute(flowName, data).then((fdata) => {
            const newData = typeof fdata[itemToFollow] !== 'undefined' ? fdata[itemToFollow] : fdata;
            setFlowState(newData);
        });
    }, dependencies);
    return [flowState, setFlowState];
}
/**
 * this high order action send the data through websocket to the server
 * and return the response from the server flow.
 *
 * @param {WebSocket} socket
 * @param {string} flowName
 */
export function ask_server(socket, flowName) {
    // this is the action that will send the data through websocket and return with the data to the next action.
    return function (fdata) {
        fdata.__flows = {
            flowName,
            requestId: Math.round(Math.random() * Math.pow(10, 16)).toString(16)
        };
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
                if (data.__flows.requestId === fdata.__flows.requestId) {
                    socket.removeEventListener('message', event);
                    resolve(data);
                }
            };
            socket.addEventListener('message', event);
        });
    };
}
