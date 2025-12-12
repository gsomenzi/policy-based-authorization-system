import type { AuthorizationPolicy } from "./authorization-policy";

export interface PolicyComposer {
	compose(...policies: AuthorizationPolicy[]): AuthorizationPolicy;
}
