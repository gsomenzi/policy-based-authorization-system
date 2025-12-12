import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { Authorizable } from "../domain/decorators/authorizable.decorator";
import { AuthorizationPolicy } from "../domain/ports/authorization-policy";
import type { AuthorizationService } from "../domain/ports/authorization-service";
import { AuthorizationActions } from "../domain/value-objects/authorization-context";
import type { AuthorizationUser } from "../domain/value-objects/authorization-user";
import { PolicyBasedAuthorizationService } from "./policy-based-authorization-service";

@Authorizable("store")
@Authorizable("store")
class Store {
    id: string;
    name: string;
    userId: string;
    constructor(props: { id: string; name: string; userId: string }) {
        this.id = props.id;
        this.name = props.name;
        this.userId = props.userId;
    }
}

class TestStorePolicy extends AuthorizationPolicy<Store> {
    readonly resourceClass = Store;
    readonly action = AuthorizationActions.READ;
    // biome-ignore lint/suspicious/noExplicitAny: context can be any
    can(context: any) {
        if (!this.isOwner(context.target.resource, context.user)) {
            return this.deny("User does not own the store");
        }
        return this.allow();
    }
}

describe("PolicyBasedAuthorizationService", () => {
    let service: AuthorizationService;
    let policy: AuthorizationPolicy;
    let user: AuthorizationUser;
    let storeFromUser: Store;
    let storeFromAnotherUser: Store;
    beforeEach(() => {
        service = new PolicyBasedAuthorizationService();
        policy = new TestStorePolicy();
        user = { id: "user1" };
        storeFromUser = new Store({
            id: "store1",
            name: "Test Store",
            userId: "user1",
        });
        storeFromAnotherUser = new Store({
            id: "store2",
            name: "Another User's Store",
            userId: "user2",
        });
    });

    it("should register and retrieve a policy", () => {
        service.registerPolicy(policy);
        const retrievedPolicy = service.getPolicy(AuthorizationActions.READ, "store");
        expect(retrievedPolicy).toBe(policy);
    });

    it("should authorize using the registered policy", async () => {
        service.registerPolicy(policy);
        const result = await service.authorize(user, AuthorizationActions.READ, storeFromUser);
        expect(result.isAllowed).toBe(true);
    });

    it("should deny access when the policy conditions are not met", async () => {
        service.registerPolicy(policy);
        const result = await service.authorize(user, AuthorizationActions.READ, storeFromAnotherUser);
        expect(result.isAllowed).toBe(false);
        expect(result.reason).toBe("User does not own the store");
    });

    it("should allow access when no policy is registered for the resource", async () => {
        const result = await service.authorize(user, AuthorizationActions.CREATE, storeFromUser);
        expect(result.isAllowed).toBe(true);
        expect(result.reason).toBeUndefined();
    });

    it("should throw error when resource is not decorated with @Authorizable", async () => {
        class UndecoratedResource {
            id = "1";
        }

        await expect(service.authorize(user, AuthorizationActions.READ, new UndecoratedResource())).rejects.toThrow(
            "Resource type not found. Make sure the resource class is decorated with @Authorizable"
        );
    });

    it("should throw error when registering policy with undecorated resource class", () => {
        class UndecoratedResource {
            id = "1";
        }

        class InvalidPolicy extends AuthorizationPolicy<UndecoratedResource> {
            resourceClass = UndecoratedResource;
            action = AuthorizationActions.READ;
            can = () => ({ isAllowed: true });
        }

        expect(() => service.registerPolicy(new InvalidPolicy())).toThrow(
            "Resource class UndecoratedResource is not decorated with @Authorizable"
        );
    });

    it("should return undefined when getting non-existent policy", () => {
        const retrievedPolicy = service.getPolicy(AuthorizationActions.DELETE, "store");
        expect(retrievedPolicy).toBeUndefined();
    });

    it("should deny access when resource is null", async () => {
        const result = await service.authorize(user, AuthorizationActions.READ, null);
        expect(result.isAllowed).toBe(false);
        expect(result.reason).toBe("Resource not found");
    });
});
