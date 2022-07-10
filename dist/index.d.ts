import { Observable } from 'rxjs';
export declare class Nogimo<T> {
    private obs$;
    private cacheKey;
    private initialValueSnapShot;
    constructor(initialValue: T, cacheKey?: string);
    getValue: () => T;
    get: () => Observable<T>;
    set: (payload: T) => void;
    update: (callBack: (pv: T) => T) => void;
    patch: (payload: Partial<T>) => void;
    reset: () => void;
    clear: () => void;
}
