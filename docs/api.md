# API Reference

### `@Authorizable(resourceType: string)`
Decorator to mark a class as an authorizable resource.

### `ResourceAuthorizationPolicy<USER, RESOURCE>`
Abstract class to implement resource-based policies. Requires `resourceClass`, `action`, and `authorize()` method.

### `AuthorizationActions` / `AuthorizationAction`
Built-in CRUD actions and the corresponding action type used by the service.

### `PolicyBasedAuthorizationService`
Central service to register policies and evaluate authorization.

### `PolicyBasedAuthorizationModule`
NestJS module for registering policies as providers.

---

See source code for more advanced usage and type definitions.