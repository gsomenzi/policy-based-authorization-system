# Clean Architecture Concepts

The project is structured to follow Clean Architecture principles:

- **Domain Layer**: Contains core business logic, policies, and value objects. No dependencies on frameworks or infrastructure.
- **Application Layer**: (Optional) Coordinates domain logic, could contain use cases.
- **Infrastructure Layer**: Implements interfaces, integrates with frameworks (e.g., NestJS), and external services.
- **Presentation Layer**: (Optional) Controllers, routes, or UI.

### Benefits
- Decoupling: Each layer can evolve independently.
- Testability: Domain logic is easily unit tested.
- Extensibility: New frameworks or integrations can be added with minimal changes to the core.

### Example Structure

```
src/
  domain/
    decorators/
    ports/
    value-objects/
  infrastructure/
  nestjs/
```

See the [architecture overview](../architecture/overview.md) for more details.