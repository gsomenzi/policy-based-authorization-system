# Installation

## System Requirements

- **Node.js**: 18+ 
- **TypeScript**: 4.8+ (5.x recommended)
- **NestJS**: 9+ (optional, for NestJS integration)

## Package Installation

Install the package using your preferred package manager:

::: code-group

```bash [npm]
npm install @gsomenzi/policy-based-authorization-system
```

```bash [bun]  
bun add @gsomenzi/policy-based-authorization-system
```

```bash [pnpm]
pnpm add @gsomenzi/policy-based-authorization-system
```

:::

## Required Dependencies

The library requires `reflect-metadata` to be installed and imported:

```bash
npm install reflect-metadata
```

For **NestJS projects**, this is already included. For **standalone Node.js** projects, import it at the top of your main file:

```typescript
import 'reflect-metadata';
```

## TypeScript Configuration

Add these configurations to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs", // or "nodenext" for ESM
    "moduleResolution": "node", // or "nodenext" for ESM
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  }
}
```

::: warning Important
**`experimentalDecorators`** and **`emitDecoratorMetadata`** are required for the `@Authorizable` decorator to work properly.
:::

## Verify Installation

Create a simple test to verify everything is working:

```typescript
import 'reflect-metadata';
import { AuthorizationResult } from "@gsomenzi/policy-based-authorization-system";

console.log(AuthorizationResult.allow()); // Should work without errors
```

## Troubleshooting

### Decorator Errors

If you get errors like *"Unable to resolve signature of class decorator"*, ensure you have:

1. `experimentalDecorators: true` in tsconfig.json
2. `emitDecoratorMetadata: true` in tsconfig.json
3. `reflect-metadata` imported at the top of your main file

### Module Resolution Issues

For ESM projects, use these tsconfig settings:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext"
  }
}
```

### NestJS Integration Issues

Make sure you're importing from the correct path:

```typescript
// ✅ Correct
import { PolicyBasedAuthorizationModule } from "@gsomenzi/policy-based-authorization-system/nestjs";

// ❌ Wrong
import { PolicyBasedAuthorizationModule } from "@gsomenzi/policy-based-authorization-system";
```

Next: [Learn about the architecture →](/architecture/overview)