# Architecture Overview

The Policy-Based Authorization System is designed with Clean Architecture principles, separating domain logic from infrastructure and application concerns. The core concepts are:

- **Authorization Policies**: Encapsulate rules for resource access.
- **Resource Decorators**: Mark classes as authorizable resources.
- **Authorization Service**: Central service to evaluate policies.
- **NestJS Module**: Seamless integration with NestJS DI and modules.

This separation ensures testability, maintainability, and extensibility.