import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { Authorizable } from "../decorators/authorizable.decorator";
import { AuthorizationActions, type AuthorizationContext } from "../value-objects/authorization-context";
import { AuthorizationResult } from "../value-objects/authorization-result";
import { ResourceAuthorizationPolicy } from "./resource-authorization-policy";

describe("ResourceAuthorizationPolicy", () => {
    it("should throw when resourceClass is not decorated", () => {
        class UndecoratedResource {}

        class InvalidPolicy extends ResourceAuthorizationPolicy<object, UndecoratedResource> {
            readonly resourceClass = UndecoratedResource;
            readonly action = AuthorizationActions.READ;

            authorize(_context: AuthorizationContext<object, UndecoratedResource>): AuthorizationResult {
                return this.allow();
            }
        }

        const policy = new InvalidPolicy();

        expect(() => policy.resourceType).toThrow(/is not decorated with @Authorizable/);
    });

    it("should resolve resourceType from @Authorizable metadata", () => {
        @Authorizable("Document")
        class Document {
            constructor(public id: string) {}
        }

        class DocumentPolicy extends ResourceAuthorizationPolicy<object, Document> {
            readonly resourceClass = Document;
            readonly action = AuthorizationActions.READ;

            authorize(_context: AuthorizationContext<object, Document>): AuthorizationResult {
                return this.allow();
            }
        }

        const policy = new DocumentPolicy();
        expect(policy.resourceType).toBe("Document");
        expect(policy.resourceType).toBe("Document");
    });
});
