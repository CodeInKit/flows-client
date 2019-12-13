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
