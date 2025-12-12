import type { AuthorizationUser } from "./authorization-user";

export enum AuthorizationActions {
	CREATE = "CREATE",
	READ = "READ",
	UPDATE = "UPDATE",
	DELETE = "DELETE",
}

export type AuthorizationAction = keyof typeof AuthorizationActions;

export interface AuthorizationContext<RESOURCE, USER = AuthorizationUser> {
	user: USER;
	target: {
		action: AuthorizationAction;
		resource: RESOURCE;
	};
}
