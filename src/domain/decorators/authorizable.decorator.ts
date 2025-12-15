import "reflect-metadata";

const RESOURCE_TYPE_METADATA_KEY = Symbol("RESOURCE_TYPE");

export function Authorizable(resourceType: string): ClassDecorator {
    return (target: object) => {
        Reflect.defineMetadata(RESOURCE_TYPE_METADATA_KEY, resourceType, target);
    };
}

export function getResourceType(
    // biome-ignore lint/suspicious/noExplicitAny: can be any constructor
    target: object | (new (...args: any[]) => object)
): string | undefined {
    if (typeof target === "function") {
        return Reflect.getMetadata(RESOURCE_TYPE_METADATA_KEY, target);
    }
    return Reflect.getMetadata(RESOURCE_TYPE_METADATA_KEY, target.constructor);
}
