# Watch Out JA

## Push server

This project now includes a lightweight VAPID-compatible push server for browser subscriptions.

### Start the push server

```bash
npm run server
```

The app will request a browser notification permission and register a push subscription against `/api/subscribe` using the public VAPID key from `/api/public-key`.

### Develop locally

```bash
npm install
npm run dev
npm run server
```

> The push backend and the Vite app are separate processes in local development.
