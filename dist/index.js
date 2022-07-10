"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nogimo = void 0;
var rxjs_1 = require("rxjs");
var LocalStorageService = {
    set: function (key, value) {
        localStorage.setItem(key, value);
    },
    get: function (key) {
        return localStorage.getItem(key);
    },
    delete: function (key) {
        localStorage.removeItem(key);
    },
    clearAll: function () {
        localStorage.clear();
    },
};
var CacheStore = {
    get: function (key) {
        try {
            return JSON.parse(LocalStorageService.get(key));
        }
        catch (error) {
            return {};
        }
    },
    set: function (key, value) {
        return LocalStorageService.set(key, JSON.stringify(value));
    },
    remove: function (key) {
        return LocalStorageService.delete(key);
    },
};
var Nogimo = /** @class */ (function () {
    function Nogimo(initialValue, cacheKey) {
        if (cacheKey === void 0) { cacheKey = null; }
        var _this = this;
        this.getValue = function () { return _this.obs$.value; };
        this.get = function () { return _this.obs$.asObservable(); };
        this.set = function (payload) {
            if (_this.cacheKey) {
                CacheStore.set(_this.cacheKey, payload);
            }
            _this.obs$.next(payload);
        };
        this.update = function (callBack) {
            var updatedValues = callBack(_this.getValue());
            if (_this.cacheKey) {
                CacheStore.set(_this.cacheKey, updatedValues);
            }
            _this.obs$.next(updatedValues);
        };
        this.patch = function (payload) {
            var margeValues = __assign(__assign({}, _this.obs$.value), payload);
            if (_this.cacheKey) {
                CacheStore.set(_this.cacheKey, margeValues);
            }
            _this.obs$.next(margeValues);
        };
        this.reset = function () {
            if (_this.cacheKey) {
                CacheStore.remove(_this.cacheKey);
            }
            _this.obs$.next(_this.initialValueSnapShot);
        };
        this.clear = function () {
            _this.obs$.next(null);
            if (_this.cacheKey) {
                CacheStore.remove(_this.cacheKey);
            }
        };
        this.cacheKey = cacheKey;
        if (initialValue === null) {
            this.obs$ = new rxjs_1.BehaviorSubject(CacheStore.get(cacheKey));
        }
        else {
            this.obs$ = new rxjs_1.BehaviorSubject(initialValue);
        }
        this.initialValueSnapShot = initialValue;
    }
    return Nogimo;
}());
exports.Nogimo = Nogimo;
var isEmpty = function (value) {
    // check is string
    if (typeof value === 'string') {
        return value.length === 0;
    }
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    return value === undefined || value === null || value === '';
};
