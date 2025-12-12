# Policy-Based Authorization System

A flexible and extensible authorization framework for Node.js and NestJS applications, built with Clean Architecture principles.

---

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Extensibility](#extensibility)
- [Installation](#installation)
- [Usage Examples](#usage-examples)
  - [Node.js Example](#nodejs-example)
  - [NestJS Example](#nestjs-example)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The Policy-Based Authorization System is a flexible and extensible library for implementing fine-grained access control in Node.js and NestJS applications. It enables you to define custom authorization policies for your resources, centralizing and simplifying complex authorization logic.

---

## Architecture

The system is built around the following core concepts:

- **Authorization Policies:** Abstract classes that encapsulate the logic for authorizing actions on resources. Each policy targets a specific resource type and action.
- **Resource Decorators:** Decorators (e.g., `@Authorizable`) are used to mark resource classes, enabling type-safe policy matching.
- **Authorization Service:** A central service that registers policies and evaluates authorization requests by delegating to the appropriate policy.
- **NestJS Integration:** A module (`PolicyBasedAuthorizationModule`) for seamless integration with NestJS, allowing policies to be registered as providers.

### Diagram

```
[User] -> [AuthorizationService] -> [AuthorizationPolicy] -> [Resource]
```

---

## Extensibility

- **Add New Policies:** Simply extend the `AuthorizationPolicy` abstract class and implement your logic.
- **Custom Actions:** Define your own actions (e.g., `READ`, `WRITE`, `DELETE`) as needed.
- **Plug-and-Play:** Register new policies at runtime or via module configuration (NestJS).
- **Type Safety:** Resource and user types are enforced via TypeScript generics.

---

## Installation

```bash
npm install @gsomenzi/policy-based-authorization-system
```

or

```bash
bun add @gsomenzi/policy-based-authorization-system
```

---

## Usage Examples

### Node.js Example

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

### NestJS Example

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

---

## API Reference

### `@Authorizable(resourceType: string)`
Decorator to mark a class as an authorizable resource.

### `AuthorizationPolicy<T>`
Abstract class to implement custom policies. Requires `resourceClass`, `action`, and `can()` method.

### `PolicyBasedAuthorizationService`
Central service to register policies and evaluate authorization.

### `PolicyBasedAuthorizationModule`
NestJS module for registering policies as providers.

---

## Contributing

1. Fork the repository
2. Create a new branch for your feature or fix
3. Write tests and ensure code is linted
4. Open a pull request with a clear description

For major changes, open an issue to discuss your proposal first.

---

## License

MIT
