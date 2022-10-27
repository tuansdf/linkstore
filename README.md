# Linkstore

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `server`: backend using NestJS
- `web`: web frontend using ReactJS
- `types`: a shared types library
- `ui`: a React component library
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Build

To build all apps and packages, run the following command:

```
cd linkstore
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd linkstore
pnpm run dev
```
