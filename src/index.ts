import { ask_server } from './actions/ask_server';
import { useCIKFlow } from './react';
import { createState, setState, stateSnapshot, useCIKState, stateObservable } from './state';
import { flows } from './flows';
import { IActionData } from '@codeinkit/flows';

export { IActionData };
export { flows };
export const actions = {
  ask_server
}
export const cikReact = {
  useCIKFlow,
  useCIKState
}

export const state = {
  createState,
  setState,
  stateSnapshot,
  stateObservable
}

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
    stateSnapshot,
    stateObservable
  }
}