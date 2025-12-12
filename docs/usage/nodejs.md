# Usage in Node.js

Install the package:

```bash
npm install @gsomenzi/policy-based-authorization-system
```

### Example

```typescript
import { Authorizable, AuthorizationPolicy, AuthorizationContext, AuthorizationResult, AuthorizationActions, PolicyBasedAuthorizationService } from "@gsomenzi/policy-based-authorization-system";

@Authorizable("Document")
class Document {
  constructor(public id: string, public userId: string) {}
}

class DocumentReadPolicy extends AuthorizationPolicy<Document> {
  readonly resourceClass = Document;
  readonly action = AuthorizationActions.READ;

  can(context: AuthorizationContext<Document, { id: string }>): AuthorizationResult {
    const { resource, user } = context;
    return resource.userId === user.id ? this.allow() : this.deny("Not the owner");
  }
}

const service = new PolicyBasedAuthorizationService();
service.registerPolicy(new DocumentReadPolicy());

const user = { id: "user-1" };
const doc = new Document("doc-1", "user-1");

service.authorize(user, AuthorizationActions.READ, doc).then(result => {
  console.log(result.isAllowed); // true
});
```
