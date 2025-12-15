import { getResourceType } from "../decorators/authorizable.decorator";
import type { AuthorizationAction, AuthorizationContext } from "../value-objects/authorization-context";
import { AuthorizationResult } from "../value-objects/authorization-result";
import { GenericAuthorizationPolicy } from "./generic-authorization-policy";

export abstract class ResourceAuthorizationPolicy<
    USER extends object = object,
    RESOURCE extends object = object,
> extends GenericAuthorizationPolicy {
    abstract readonly resourceClass: new (
        // biome-ignore lint/suspicious/noExplicitAny: can be any constructor
        ...args: any[]
    ) => RESOURCE;

    abstract readonly action: AuthorizationAction;

    private _resourceType?: string;

    abstract authorize(
        context: AuthorizationContext<USER, RESOURCE>
    ): Promise<AuthorizationResult> | AuthorizationResult;

    get resourceType(): string {
        if (!this._resourceType) {
            const type = getResourceType(this.resourceClass);
            if (!type) {
                throw new Error(
                    `Resource class ${this.resourceClass.name} is not decorated with @Authorizable("resourceType")`
                );
            }
            this._resourceType = type;
        }
        return this._resourceType;
    }
}
