# Usage in NestJS

Install the package:

```bash
npm install @gsomenzi/policy-based-authorization-system
```

### Example

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

You can now inject the authorization service using the provided token and use it in your controllers/services.