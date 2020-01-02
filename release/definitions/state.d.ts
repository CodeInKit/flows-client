import { BehaviorSubject } from 'rxjs';
declare type stateType = ReturnType<(<T>(initialState: T) => BehaviorSubject<T>)>;
export declare const createState: <T>(initialState: T) => void;
export declare const stateSnapshot: (path: string) => any;
export declare function useCIKState(path: string): any;
export declare function setState(newState: stateType): BehaviorSubject<unknown>;
export declare function stateObservable(): import("rxjs").Observable<unknown>;
export {};
