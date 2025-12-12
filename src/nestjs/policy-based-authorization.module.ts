import { type DynamicModule, Global, Module, type Provider, type Type } from "@nestjs/common";
import type { AuthorizationPolicy } from "../domain/ports/authorization-policy";
import { PolicyBasedAuthorizationService } from "../infrastructure/policy-based-authorization-service";

export const AUTHZ_SERVICE = Symbol("AUTHZ_SERVICE");

/**
 * Options for configuring the PolicyBasedAuthorizationModule.
 *
 * This interface defines the structure of the options object
 * that can be passed to the `forRoot` method of the module.
 *
 * The `policies` property is an array of authorization policy
 * classes that will be registered with the authorization service.
 */
export interface PolicyBasedAuthorizationModuleOptions {
    policies: Type<AuthorizationPolicy>[];
}

/**
 * A NestJS module that provides policy-based authorization services.
 *
 * This module allows you to register authorization policies and provides
 * an authorization service that utilizes these policies to enforce access control.
 */
@Global()
@Module({})
export class PolicyBasedAuthorizationModule {
    /**
     * Configures the module with the given options.
     *
     * @param {PolicyBasedAuthorizationModuleOptions} options - The configuration options for the module.
     * @returns A dynamic module configured with the provided options.
     *
     * @example
     * ```typescript
     * import { Module } from "@nestjs/common";
     * import { PolicyBasedAuthorizationModule } from "policy-based-authorization-system";
     * import { MyCustomPolicy } from "./policies/my-custom-policy";
     *
     * @Module({
     *   imports: [
     *     PolicyBasedAuthorizationModule.forRoot({
     *       policies: [MyCustomPolicy],
     *     }),
     *   ],
     * })
     * export class AppModule {}
     * ```
     */
    static forRoot(options: PolicyBasedAuthorizationModuleOptions): DynamicModule {
        const authorizationServiceProvider: Provider = {
            provide: AUTHZ_SERVICE,
            useFactory: (...policies: AuthorizationPolicy[]) => {
                const service = new PolicyBasedAuthorizationService();

                for (const policy of policies) {
                    service.registerPolicy(policy);
                }

                return service;
            },
            inject: options.policies,
        };

        return {
            module: PolicyBasedAuthorizationModule,
            providers: [...options.policies, authorizationServiceProvider],
            exports: [AUTHZ_SERVICE],
        };
    }
}
