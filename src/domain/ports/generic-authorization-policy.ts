import { AuthorizationResult } from "../value-objects/authorization-result";

export abstract class GenericAuthorizationPolicy {
    abstract authorize(context: unknown): Promise<AuthorizationResult> | AuthorizationResult;

    protected allow(): AuthorizationResult {
        return AuthorizationResult.allow();
    }

    protected deny(reason: string): AuthorizationResult {
        return AuthorizationResult.deny(reason);
    }
}
