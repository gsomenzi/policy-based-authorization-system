import { getResourceType } from "../decorators/authorizable.decorator";
import type {
	AuthorizationAction,
	AuthorizationContext,
} from "../value-objects/authorization-context";
import { AuthorizationResult } from "../value-objects/authorization-result";
import type { AuthorizationUser } from "../value-objects/authorization-user";

/**
 * An abstract class representing an authorization policy.
 *
 * This class defines the structure and behavior of an authorization policy,
 * including the resource it applies to, the action it governs, and the logic
 * to determine if access is allowed or denied.
 *
 * @template RESOURCE - The type of resource the policy applies to. It must be a class decorated with `@Authorizable("resourceType")`.
 *
 * @example
 * ```typescript
 * import { Authorizable } from "../decorators/authorizable.decorator";
 * import { AuthorizationPolicy } from "../ports/authorization-policy";
 * import { AuthorizationContext } from "../value-objects/authorization-context";
 * import { AuthorizationResult } from "../value-objects/authorization-result";
 * import { AuthorizationActions } from "../value-objects/authorization-actions";
 * import { AuthorizationUser } from "../value-objects/authorization-user";
 *
 * @Authorizable("Document")
 * class Document {
 *   constructor(public id: string, public userId: string) {}
 * }
 *
 * class DocumentReadPolicy extends AuthorizationPolicy<Document> {
 *   readonly resourceClass = Document;
 *   readonly action = AuthorizationActions.READ;
 *
 *  can(context: AuthorizationContext<Document, AuthorizationUser>): AuthorizationResult {
 *     const { resource, user } = context;
 *     if (this.isOwner(resource, user)) {
 *       return this.allow();
 *     }
 *     return this.deny("User is not the owner of the document.");
 *   }
 * }
 * ```
 */
export abstract class AuthorizationPolicy<RESOURCE extends object = object> {
	/**
	 * The class of the resource that this policy applies to. It must be decorated with `@Authorizable("resourceType")`.
	 */
	abstract readonly resourceClass: new (
		// biome-ignore lint/suspicious/noExplicitAny: can be any constructor
		...args: any[]
	) => RESOURCE;
	/**
	 * The action that this policy governs. It should be one of the defined `AuthorizationActions`.
	 */
	abstract readonly action: AuthorizationAction;

	private _resourceType?: string;

	/**
	 * Determines if the action is allowed or denied based on the provided context. The method should be implemented by subclasses to define specific authorization logic.
	 *
	 * @param context - The authorization context containing the resource and user information.
	 * @returns A promise that resolves to an `AuthorizationResult` indicating whether the action is allowed or denied.
	 */
	abstract can(
		context: AuthorizationContext<RESOURCE, AuthorizationUser>,
	): Promise<AuthorizationResult> | AuthorizationResult;

	get resourceType(): string {
		if (!this._resourceType) {
			const type = getResourceType(this.resourceClass);
			if (!type) {
				throw new Error(
					`Resource class ${this.resourceClass.name} is not decorated with @Authorizable("resourceType")`,
				);
			}
			this._resourceType = type;
		}
		return this._resourceType;
	}

	protected allow(): AuthorizationResult {
		return AuthorizationResult.allow();
	}

	protected deny(reason: string): AuthorizationResult {
		return AuthorizationResult.deny(reason);
	}

	protected isOwner(
		resource: { userId: string },
		user: AuthorizationUser,
	): boolean {
		return resource.userId === user.id;
	}
}
