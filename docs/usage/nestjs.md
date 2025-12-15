# Usage in NestJS

Install the package:

```bash
npm install @gsomenzi/policy-based-authorization-system @nestjs/common
```

::: tip
NestJS already includes `reflect-metadata`, so no additional installation is needed.
:::

### Step 1: Create Your Policy

```typescript
import { Injectable } from '@nestjs/common';
import {
  Authorizable,
  ResourceAuthorizationPolicy,
  AuthorizationContext,
  AuthorizationResult,
  AuthorizationActions,
} from "@gsomenzi/policy-based-authorization-system";

type User = { id: string };

@Authorizable("Document") 
export class Document {
  constructor(public id: string, public userId: string) {}
}

@Injectable()
export class DocumentReadPolicy extends ResourceAuthorizationPolicy<User, Document> {
  readonly resourceClass = Document;
  readonly action = AuthorizationActions.READ;

  authorize(context: AuthorizationContext<User, Document>): AuthorizationResult {
    const { resource, user } = context;
    return resource.userId === user.id 
      ? this.allow() 
      : this.deny("Not the owner");
  }
}
```

### Step 2: Register the Module

```typescript
import { Module } from "@nestjs/common";
import { PolicyBasedAuthorizationModule } from "@gsomenzi/policy-based-authorization-system/nestjs";
import { DocumentReadPolicy } from './policies/document-read.policy';

@Module({
  imports: [
    PolicyBasedAuthorizationModule.forRoot({
      policies: [DocumentReadPolicy],
    }),
  ],
})
export class AppModule {}
```

### Step 3: Use in Controllers/Services

```typescript
import { Controller, ForbiddenException, Get, Inject, Param, Req } from '@nestjs/common';
import { AUTHZ_SERVICE } from '@gsomenzi/policy-based-authorization-system/nestjs';
import type { AuthorizationService } from '@gsomenzi/policy-based-authorization-system';
import { AuthorizationActions } from '@gsomenzi/policy-based-authorization-system';

@Controller('documents')
export class DocumentsController {
  constructor(
    @Inject(AUTHZ_SERVICE) 
    private readonly authzService: AuthorizationService
  ) {}

  @Get(':id')
  async getDocument(@Param('id') id: string, @Req() req: any) {
    const document = await this.findDocument(id);
    const user = req.user; // From your auth system
    
    const result = await this.authzService.authorize(
      user, 
      AuthorizationActions.READ, 
      document
    );
    
    if (!result.isAllowed) {
      throw new ForbiddenException(result.reason);
    }
    
    return document;
  }
}