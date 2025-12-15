import { getResourceType } from "../domain/decorators/authorizable.decorator";
import type { AuthorizationService } from "../domain/ports/authorization-service";
import type { ResourceAuthorizationPolicy } from "../domain/ports/resource-authorization-policy";
import type { AuthorizationAction, AuthorizationContext } from "../domain/value-objects/authorization-context";
import { AuthorizationResult } from "../domain/value-objects/authorization-result";

export class PolicyBasedAuthorizationService implements AuthorizationService {
    private policies: Map<string, ResourceAuthorizationPolicy> = new Map();

    async authorize<USER extends object, RESOURCE extends object>(
        user: USER,
        action: AuthorizationAction,
        resource: RESOURCE | null
    ): Promise<AuthorizationResult> {
        if (!resource) {
            return AuthorizationResult.deny("Resource not found");
        }

        const resourceType = getResourceType(resource);

        if (!resourceType) {
            throw new Error(
                `Resource type not found. Make sure the resource class is decorated with @Authorizable("resourceType")`
            );
        }

        const policyKey = this.getPolicyKey(resourceType, action);
        const policy = this.policies.get(policyKey);

        if (policy) {
            const context: AuthorizationContext<USER, RESOURCE> = {
                user,
                action,
                resource,
            };
            return policy.authorize(context);
        }

        return AuthorizationResult.allow();
    }

    registerPolicy(policy: ResourceAuthorizationPolicy): void {
        const policyKey = this.getPolicyKey(policy.resourceType, policy.action);
        this.policies.set(policyKey, policy);
    }

    getPolicy(action: AuthorizationAction, resourceType: string): ResourceAuthorizationPolicy | undefined {
        const policyKey = this.getPolicyKey(resourceType, action);
        return this.policies.get(policyKey);
    }

    private getPolicyKey(resourceType: string, action: string): string {
        return `${resourceType}:${action}`.toLowerCase();
    }
}
