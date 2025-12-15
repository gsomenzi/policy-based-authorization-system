import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { Authorizable } from "../domain/decorators/authorizable.decorator";
import type { AuthorizationService } from "../domain/ports/authorization-service";
import { ResourceAuthorizationPolicy } from "../domain/ports/resource-authorization-policy";
import { AuthorizationActions } from "../domain/value-objects/authorization-context";
import { PolicyBasedAuthorizationService } from "./policy-based-authorization-service";

type User = {
    id: string;
};

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

class TestStorePolicy extends ResourceAuthorizationPolicy<User, Store> {
    readonly resourceClass = Store;
    readonly action = AuthorizationActions.READ;
    // biome-ignore lint/suspicious/noExplicitAny: context can be any
    authorize(context: any) {
        if (!this.isOwner(context.resource, context.user)) {
            return this.deny("User does not own the store");
        }
        return this.allow();
    }
    isOwner(resource: Store, user: User): boolean {
        return resource.userId === user.id;
    }
}

describe("PolicyBasedAuthorizationService", () => {
    let service: AuthorizationService;
    let policy: ResourceAuthorizationPolicy;
    let user: User;
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

        class InvalidPolicy extends ResourceAuthorizationPolicy<UndecoratedResource> {
            resourceClass = UndecoratedResource;
            action = AuthorizationActions.READ;
            authorize = () => ({ isAllowed: true });
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
