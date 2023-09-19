interface Cache {
    [key: string]: any;
}

export function cacheable(target: any, name: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cache: Cache = {};

    descriptor.value = function proxy() {
        const key = JSON.stringify(arguments);

        if (!cache[key]) {
            cache[key] = originalMethod.apply(this, arguments);
        }

        return cache[key];
    };

    return descriptor;
}