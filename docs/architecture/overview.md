# Architecture Overview

The Policy-Based Authorization System is designed with Clean Architecture principles, separating domain logic from infrastructure and application concerns.

## Core Components

- **Authorization Policies**: Encapsulate rules for resource access
- **Resource Decorators**: Mark classes as authorizable resources  
- **Authorization Service**: Central service to evaluate policies
- **NestJS Module**: Seamless integration with NestJS DI and modules

## System Flow

```mermaid
graph TB
    User[User Request] --> AuthService[Authorization Service]
    AuthService --> PolicyMap[Policy Registry]
    PolicyMap --> Policy[Specific Policy]
    Policy --> Resource[Resource Check]
    Resource --> Result[Authorization Result]
    
    subgraph "Domain Layer"
        Policy
        Resource
    end
    
    subgraph "Infrastructure Layer"
        AuthService
        PolicyMap
    end
    
    subgraph "Integration Layer"
        NestJS[NestJS Module]
    end
    
    NestJS -.-> AuthService
```

This separation ensures testability, maintainability, and extensibility by keeping business logic independent of framework concerns.