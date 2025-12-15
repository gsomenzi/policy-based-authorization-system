# Introduction

Policy-Based Authorization System is a flexible and extensible library for implementing fine-grained access control in Node.js and NestJS applications.

## Motivation

This package was created primarily to build a simple and flexible authorization system for NestJS that can also be used in plain Node.js projects.

The main motivation was to avoid adopting CASL for this use case: while powerful, it can introduce extra complexity and make authorization flows harder to debug.

It is designed around a small set of concepts:

- **Authorization Policies**: encapsulate the authorization rules for an action on a resource.
- **Authorization Service**: finds the right policy and evaluates authorization requests.
- **Resource Decorator**: marks a class as an authorizable resource to enable type-safe matching.
- **NestJS Integration**: register policies via a module and leverage dependency injection.

## Next Steps

- Install the package: [Installation](/installation)
- Use it in Node.js: [Node.js Usage](/usage/nodejs)
- Use it in NestJS: [NestJS Usage](/usage/nestjs)
- Understand the design: [Architecture Overview](/architecture/overview)