/**
 * A function that emits a side effect and does not return anything.
 */
export type Procedure = (...args: any[]) => void;

type ThrottleOptions = {
    leading: boolean;
    trailing: boolean;
};

export function throttle<F extends Procedure>(func: F, wait: number, options: Partial<ThrottleOptions> = {}): Procedure {
    let timeout: NodeJS.Timeout | null = null;
    let previous = 0;

    const later = function (...args: any[]) {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        func(...args);
    };

    return function (...args: any[]) {
        const now = Date.now();

        if (!previous && options.leading === false) {
            previous = now;
        }
        const remaining = wait - (now - previous);

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func(...args);
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(() => later(...args), remaining);
        }
    };
}

export type DebounceOptions = {
    isImmediate: boolean,
}

export function debounce<F extends Procedure>(func: F, waitMilliseconds = 50, options: Partial<DebounceOptions> = {}) {
    let timeoutId: NodeJS.Timeout | undefined;

    return function(this: any, ...args: any[]) {
        const context = this;

        const doLater = function() {
            timeoutId = undefined;
            if (!options.isImmediate) {
                func.apply(context, args);
            }
        }

        const shouldCallNow = options.isImmediate && timeoutId === undefined;

        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(doLater, waitMilliseconds);

        if (shouldCallNow) {
            func.apply(context, args);
        }
    } as F;
}