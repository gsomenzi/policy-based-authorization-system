# API Reference

### `@Authorizable(resourceType: string)`
Decorator to mark a class as an authorizable resource.

### `AuthorizationPolicy<T>`
Abstract class to implement custom policies. Requires `resourceClass`, `action`, and `can()` method.

### `PolicyBasedAuthorizationService`
Central service to register policies and evaluate authorization.

### `PolicyBasedAuthorizationModule`
NestJS module for registering policies as providers.

---

See source code for more advanced usage and type definitions.