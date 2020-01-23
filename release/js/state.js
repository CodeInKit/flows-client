import { useState, useEffect } from "react";
import { BehaviorSubject } from 'rxjs';
import _ from 'lodash';
let state = null;
export const createState = (initialState) => {
    if (state === null) {
        state = new BehaviorSubject(initialState);
        return;
    }
    throw new Error('state already exists');
};
export const stateSnapshot = (path) => {
    if (_.isUndefined(path)) {
        return state.getValue();
    }
    return _.get(state.getValue(), path);
};
export function useCIKState(path) {
    const [value, setValue] = useState(_.get(state.getValue(), path));
    useEffect(() => {
        const subscriber = (data) => {
            setValue(_.get(data, path));
        };
        const obs = state.subscribe(subscriber);
        return () => {
            obs.unsubscribe();
        };
    }, [path]);
    return value;
}
export function setState(newState) {
    const currentState = state.getValue();
    const updatedState = _.extend({}, currentState, newState);
    state.next(updatedState);
    return updatedState;
}
export function stateObservable() {
    return state.asObservable();
}
