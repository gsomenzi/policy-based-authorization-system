# Policy-Based Authorization System

# Policy-Based Authorization System

[📚 **Complete Documentation**](https://gsomenzi.github.io/policy-based-authorization-system/) | [🚀 Quick Start](#usage-with-nestjs)
A flexible and extensible policy-based authorization system for Node.js and NestJS applications. This library allows you to define fine-grained access control policies for your resources, making it easy to enforce complex authorization logic in a clean and maintainable way.

## Features
- Policy-based design for maximum flexibility
- Easy integration with NestJS (as a module)
- Type-safe and extensible policy definitions
- Decorators for resource identification
- Centralized authorization service

## Installation

```bash
npm install @gsomenzi/policy-based-authorization-system
```

or

```bash
bun add @gsomenzi/policy-based-authorization-system
```

## Usage with NestJS

1. **Define your resource and policy:**

```typescript
import { Authorizable } from "@gsomenzi/policy-based-authorization-system";
import { AuthorizationPolicy, AuthorizationContext, AuthorizationResult, AuthorizationActions, AuthorizationUser } from "@gsomenzi/policy-based-authorization-system";

@Authorizable("Document")
class Document {
  constructor(public id: string, public userId: string) {}
}

class DocumentReadPolicy extends AuthorizationPolicy<Document> {
  readonly resourceClass = Document;
  readonly action = AuthorizationActions.READ;

  can(context: AuthorizationContext<Document, AuthorizationUser>): AuthorizationResult {
    const { resource, user } = context;
    if (resource.userId === user.id) {
      return this.allow();
    }
    return this.deny("Not the owner");
  }
}
```

2. **Register the policy in your NestJS module:**

```typescript
import { Module } from "@nestjs/common";
import { PolicyBasedAuthorizationModule } from "@gsomenzi/policy-based-authorization-system/nestjs";

@Module({
  imports: [
    PolicyBasedAuthorizationModule.forRoot({
      policies: [DocumentReadPolicy],
    }),
  ],
})
export class AppModule {}
```

## Contributing

Contributions are welcome! To contribute:
- Fork the repository
- Create a new branch for your feature or fix
- Open a pull request with a clear description
- Ensure your code is tested and linted

For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
