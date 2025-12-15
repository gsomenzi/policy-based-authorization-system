import type { AuthorizationAction } from "../value-objects/authorization-context";
import type { AuthorizationResult } from "../value-objects/authorization-result";
import type { ResourceAuthorizationPolicy } from "./resource-authorization-policy";

export interface AuthorizationService {
    authorize<USER extends object, RESOURCE extends object = object>(
        user: USER,
        action: AuthorizationAction,
        resource: RESOURCE | null
    ): Promise<AuthorizationResult>;
    registerPolicy(policy: ResourceAuthorizationPolicy): void;
    getPolicy(action: string, resourceType: string): ResourceAuthorizationPolicy | undefined;
}
