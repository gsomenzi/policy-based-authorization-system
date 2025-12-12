# Extensibility

- **Add New Policies**: Extend `AuthorizationPolicy` and implement your logic.
- **Custom Actions**: Define new actions as needed (e.g., `READ`, `WRITE`).
- **Plug-and-Play**: Register policies at runtime or via module configuration.
- **Type Safety**: Resource and user types are enforced via TypeScript generics.

### Example: Adding a New Policy

```typescript
class DocumentDeletePolicy extends AuthorizationPolicy<Document> {
  readonly resourceClass = Document;
  readonly action = AuthorizationActions.DELETE;

  can(context: AuthorizationContext<Document, { id: string }>): AuthorizationResult {
    // Custom logic
    return ...;
  }
}
```

Register this policy as shown in the usage examples.