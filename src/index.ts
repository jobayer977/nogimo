import { BehaviorSubject, Observable } from 'rxjs';
const LocalStorageService = {
  set: (key: string, value: any): void => {
    localStorage.setItem(key, value);
  },
  get: (key: string): string | null => {
    return localStorage.getItem(key);
  },
  delete: (key: string): void => {
    localStorage.removeItem(key);
  },
  clearAll: (): void => {
    localStorage.clear();
  },
};
const CacheStore = {
  get: (key: string) => {
    try {
      return JSON.parse(LocalStorageService.get(key) as any);
    } catch (error) {
      return {};
    }
  },
  set: (key: string, value: any) => {
    return LocalStorageService.set(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    return LocalStorageService.delete(key);
  },
};
export class Nogimo<T> {
  private obs$!: BehaviorSubject<T>;
  private cacheKey: string | undefined;
  private initialValueSnapShot: T;
  constructor(initialValue: T, cacheKey: string = null) {
    this.cacheKey = cacheKey;
    if (initialValue === null) {
      this.obs$ = new BehaviorSubject<T>(CacheStore.get(cacheKey));
    } else {
      this.obs$ = new BehaviorSubject<T>(initialValue);
    }
    this.initialValueSnapShot = initialValue;
  }
  getValue = (): T => this.obs$.value;
  get = (): Observable<T> => this.obs$.asObservable();
  set = (payload: T) => {
    if (this.cacheKey) {
      CacheStore.set(this.cacheKey, payload);
    }
    this.obs$.next(payload);
  };
  update = (callBack: (pv: T) => T) => {
    const updatedValues = callBack(this.getValue());
    if (this.cacheKey) {
      CacheStore.set(this.cacheKey, updatedValues);
    }
    this.obs$.next(updatedValues);
  };
  patch = (payload: Partial<T>) => {
    const margeValues = { ...this.obs$.value, ...payload };
    if (this.cacheKey) {
      CacheStore.set(this.cacheKey, margeValues);
    }
    this.obs$.next(margeValues);
  };
  reset = () => {
    if (this.cacheKey) {
      CacheStore.remove(this.cacheKey);
    }
    this.obs$.next(this.initialValueSnapShot);
  };
  clear = () => {
    this.obs$.next(null as any);
    if (this.cacheKey) {
      CacheStore.remove(this.cacheKey);
    }
  };
}
