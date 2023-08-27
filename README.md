# Vite React SSR server on Express 🚀

Dev server for modern development with lightning-fast performance and cutting-edge features.

## Features
- **Custom SSR with Express**
- **HTML streaming**: delivering content to users in a smooth and efficient manner
- **Lazy loading**: ensure that resources are fetched only when needed
- **Bundle Splitting and Content Hashing**: content hashing guarantees efficient caching and content delivery
- **Fast Dev Server with Hot Module Replacement**: hot reload capabilities for every module, including `client`, `server`, and `server-api`
- **Lightning-Fast Dev Server Start Time** - 300ms

## Get Started

### Dev server
```
yarn dev
```

### Build
```
yarn build && yarn start
```

### Structure

- `apps/frontend`
  - `src/`
    - `client` - Client-side React application
    - `server` - Express server that renders App from `client`, streams it to user and serves static
    - `server-api` - Express server to handle `/api/*` routes (BFF)
  - `vite/` - vite config files
