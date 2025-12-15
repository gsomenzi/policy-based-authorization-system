# Extensibility

- **Add New Policies**: Extend `ResourceAuthorizationPolicy` and implement your logic.
- **Custom Actions**: Define new actions as needed (e.g., `READ`, `WRITE`).
- **Plug-and-Play**: Register policies at runtime or via module configuration.
- **Type Safety**: Resource and user types are enforced via TypeScript generics.

### Example: Adding a New Policy

```typescript
import {
  Authorizable,
  ResourceAuthorizationPolicy,
  AuthorizationActions,
  AuthorizationContext,
  AuthorizationResult,
} from "@gsomenzi/policy-based-authorization-system";

type User = { id: string };

@Authorizable("Document")
class Document {
  constructor(public id: string, public userId: string) {}
}

class DocumentDeletePolicy extends ResourceAuthorizationPolicy<User, Document> {
  readonly resourceClass = Document;
  readonly action = AuthorizationActions.DELETE;

  authorize(context: AuthorizationContext<User, Document>): AuthorizationResult {
    // Custom logic
    return ...;
  }
}
```

Register this policy as shown in the usage examples.