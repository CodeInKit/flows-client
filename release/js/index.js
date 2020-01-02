import { ask_server } from './actions/ask_server';
import { useCIKFlow } from './react';
import { createState, setState, stateSnapshot, useCIKState } from './state';
import { flows } from './flows';
export { flows };
export const actions = {
    ask_server
};
export const cikReact = {
    useCIKFlow,
    useCIKState
};
export const state = {
    createState,
    setState,
    stateSnapshot
};
export default {
    flows,
    actions: {
        ask_server
    },
    cikReact: {
        useCIKFlow,
        useCIKState
    },
    state: {
        createState,
        setState,
        stateSnapshot
    }
};
