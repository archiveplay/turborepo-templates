# Turborepo Nest Starter

A monorepo starter built with **Turborepo**, designed for scalable backend-first development using **NestJS**, **Prisma**, shared packages, and a generated API client SDK derived from an OpenAPI contract.

---

## Architecture Overview

This repository follows a contract-driven monorepo structure:

apps/api/ → NestJS backend (Prisma + Zod validation)
packages/api/ → OpenAPI contract + generated SDK client

The system combines:

- **Prisma** for database access and schema management
- **Zod validation pipe** for runtime request validation
- **OpenAPI contract** as the API source of truth
- **Generated SDK** for type-safe client consumption

---

## Prerequisites

- Node.js >= 18
- pnpm >= 9
- PostgreSQL (or compatible DB supported by Prisma)

---

## Environment Variables

For template usage you need to provide `.env` files required for configuration

See `apps/{app-name}/example.env` for a reference template.

## Getting Started

1. Clone the repository
2. Install dependencies:

   pnpm install

3. Setup database:

   pnpm db:generate
   pnpm db:migrate:dev

4. Generate clients sdk

   pnpm generate:openapi:sdk

5. Build the project (optional on first setup):

   pnpm build

This will build all packages and generate the SDK if the OpenAPI contract has changed.

---

## Development

Run the full monorepo in development mode:

pnpm dev

This starts all applications using Turborepo’s task graph, caching, and parallel execution.

---

## API Layer

The backend is built with **NestJS** and uses:

### Prisma

- Database ORM
- Schema-driven migrations
- Type-safe database client

### Zod Validation Pipe

- Runtime request validation
- Ensures DTO correctness at runtime
- Prevents invalid data from reaching services

---

## API Client SDK

The SDK is generated from the OpenAPI specification.

It is:

- Automatically generated during `pnpm build` when the contract changes
- Can be generated manually using:

  pnpm generate:sdk

Output location:

packages/api/client.ts

This file is generated and should not be edited manually.

---

## Scripts

- pnpm dev – start all apps in development mode
- pnpm build – build all apps and packages
- pnpm lint – run linting across the monorepo
- pnpm test – run tests across the monorepo
- pnpm check-types – run TypeScript checks
- pnpm generate:sdk – generate API client
- pnpm generate:openapi – generate OpenAPI contract
- pnpm db:generate – generate prisma,
- pnpm db:migrate:dev: migrate prisma,
- pnpm prisma generate – generate Prisma client
- pnpm prisma migrate dev – run database migrations

---

## Build Pipeline

NestJS API (Prisma + Zod) → OpenAPI generation → packages/api/openapi.json → SDK generation → packages/api/client.ts

Turborepo ensures tasks only run when their inputs change, enabling fast incremental builds and caching.

---

## Key Concepts

### Contract-first development

OpenAPI defines the API boundary between backend and clients.

### Validation layer

Zod ensures all incoming requests are validated at runtime before reaching business logic.

### Database layer

Prisma provides type-safe database access and schema migrations.

### Deterministic builds

Outputs are reproducible and only regenerate when inputs change.

### Task orchestration

Turborepo manages caching, dependencies, and execution order.

---

## Project Structure

apps/api → NestJS backend (Prisma + Zod)  
packages/api → OpenAPI contract + generated SDK

---

## Recommended Workflow

1. Implement API changes in `apps/api`
2. Update database schema via Prisma if needed
3. Ensure OpenAPI contract is updated
4. Run `pnpm build`
5. SDK regenerates automatically if contract changed
6. Consume SDK from `packages/api`

---

## Notes

- Do not edit generated SDK files manually
- Prisma schema is the source of truth for database structure
- OpenAPI is the source of truth for API contracts
- Zod ensures runtime validation safety
- Prefer `pnpm build` for full synchronization
