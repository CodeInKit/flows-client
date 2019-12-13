import { ask_server } from './actions/ask_server';
import { useCIKFlow } from './react';
import { flows } from './flows';
export { flows };
export const actions = {
    ask_server
};
export const react = {
    useCIKFlow
};
export default {
    flows,
    actions: {
        ask_server
    },
    react: {
        useCIKFlow
    }
};
