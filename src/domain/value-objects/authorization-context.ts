export enum AuthorizationActions {
    CREATE = "CREATE",
    READ = "READ",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}

export type AuthorizationAction = keyof typeof AuthorizationActions;

export interface AuthorizationContext<USER, RESOURCE> {
    user: USER;
    action: AuthorizationAction;
    resource: RESOURCE;
}
