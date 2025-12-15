import "reflect-metadata";
import { describe, expect, it } from "vitest";
import { Authorizable, getResourceType } from "./authorizable.decorator";

describe("Authorizable / getResourceType", () => {
    it("should return resource type for a decorated class", () => {
        @Authorizable("Document")
        class Document {}

        expect(getResourceType(Document)).toBe("Document");
    });

    it("should return resource type for an instance of a decorated class", () => {
        @Authorizable("Document")
        class Document {}

        expect(getResourceType(new Document())).toBe("Document");
    });

    it("should return undefined for an undecorated class", () => {
        class Undecorated {}

        expect(getResourceType(Undecorated)).toBeUndefined();
    });

    it("should return undefined for an instance of an undecorated class", () => {
        class Undecorated {}

        expect(getResourceType(new Undecorated())).toBeUndefined();
    });
});
