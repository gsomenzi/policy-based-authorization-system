# Architecture Decisions

- **Use of Interfaces and Abstract Classes**: Policies and services are defined via interfaces/abstract classes, enabling easy extension and mocking.
- **Clean Architecture**: Domain logic is isolated from infrastructure (e.g., NestJS integration), allowing independent evolution and testing.
- **Type Safety**: TypeScript generics enforce correct resource and user types throughout the system.
- **Decorator Pattern**: Used for marking resources, enabling metadata-driven policy resolution.
- **Dependency Injection**: Especially in NestJS, policies and services are injected, supporting modularity and testability.

These decisions ensure the system is robust, extensible, and maintainable.