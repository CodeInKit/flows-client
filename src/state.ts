import { useState, useEffect } from "react";
import { BehaviorSubject } from 'rxjs';
import _ from 'lodash';

type stateType = ReturnType<<T>(initialState: T) => BehaviorSubject<T>>
let state: stateType | null = null;

export const createState = <T>(initialState: T) => {
  if(state === null) {
    state = new BehaviorSubject(initialState);
    return;
  }

  throw new Error('state already exists');
};
export const stateSnapshot = (path: string) => _.get(state.getValue(), path);

export function useCIKState(path: string) {
  const [value, setValue] = useState(_.get(state.getValue(), path));
  
  useEffect(() => {
    const subscriber = (data: object) => {
      setValue(_.get(data, path))
    };
    const obs = state.subscribe(subscriber);

    return () => {
      obs.unsubscribe();
    }
  }, [path]);

  return value;
}

export function setState(newState: stateType) {
  const currentState = state.getValue();
  const updatedState = _.extend({}, currentState, newState);

  state.next(updatedState);

  return updatedState;
}

export function stateObservable() {
  return state.asObservable();
}