import { ask_server } from './actions/ask_server';
import { useCIKFlow } from './react';
import { flows } from './flows';
import { IActionData } from '@codeinkit/flows';
export { IActionData };
export { flows };
export declare const actions: {
    ask_server: typeof ask_server;
};
export declare const react: {
    useCIKFlow: typeof useCIKFlow;
};
declare const _default: {
    flows: import("@codeinkit/flows/release/client").Flows;
    actions: {
        ask_server: typeof ask_server;
    };
    react: {
        useCIKFlow: typeof useCIKFlow;
    };
};
export default _default;
