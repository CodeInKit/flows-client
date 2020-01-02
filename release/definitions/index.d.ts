import { ask_server } from './actions/ask_server';
import { useCIKFlow } from './react';
import { setState, useCIKState } from './state';
import { flows } from './flows';
import { IActionData } from '@codeinkit/flows';
export { IActionData };
export { flows };
export declare const actions: {
    ask_server: typeof ask_server;
};
export declare const cikReact: {
    useCIKFlow: typeof useCIKFlow;
    useCIKState: typeof useCIKState;
};
export declare const state: {
    createState: <T>(initialState: T) => void;
    setState: typeof setState;
    stateSnapshot: (path: string) => any;
};
declare const _default: {
    flows: import("@codeinkit/flows/release/client").Flows;
    actions: {
        ask_server: typeof ask_server;
    };
    cikReact: {
        useCIKFlow: typeof useCIKFlow;
        useCIKState: typeof useCIKState;
    };
    state: {
        createState: <T>(initialState: T) => void;
        setState: typeof setState;
        stateSnapshot: (path: string) => any;
    };
};
export default _default;
