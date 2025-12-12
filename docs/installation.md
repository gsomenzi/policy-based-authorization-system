# Installation

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

## Requirements

- Node.js 18+ 
- TypeScript 4.8+
- NestJS 9+ (optional, for NestJS integration)

## Verify Installation

Create a simple test to verify the installation:

```typescript
import { AuthorizationResult } from "@gsomenzi/policy-based-authorization-system";

console.log(AuthorizationResult.allow()); // Should log success
```

Next: [Learn about the architecture →](/architecture/overview)