# Architecture Diagram

```mermaid
graph TD
  User -->|Request| AuthorizationService
  AuthorizationService -->|Delegates| AuthorizationPolicy
  AuthorizationPolicy -->|Checks| Resource
  AuthorizationService -->|Integrates| NestJSModule
```

This diagram illustrates the flow from user requests to policy evaluation and resource access.