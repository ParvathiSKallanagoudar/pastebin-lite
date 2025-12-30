# Pastebin-Lite

A simple Pastebin-like application where users can create text pastes and share a URL to view them.

## Features
- Create a paste with optional expiry time (TTL)
- Optional view-count limits
- Shareable URL for each paste
- Safe HTML rendering (no script execution)

## Tech Stack
- Next.js (Pages Router)
- Node.js
- Upstash Redis (persistence)
- Deployed on Vercel

## Running Locally

1. Install dependencies:
```bash
npm install
2. Create .env.local
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
NEXT_PUBLIC_BASE_URL=http://localhost:3000
TEST_MODE=0
3. Start the development server
npm run dev


Open:

http://localhost:3000

API Endpoints
Health Check
GET /api/healthz

Create Paste
POST /api/pastes


Request body:

{
  "content": "Hello world",
  "ttl_seconds": 3600,
  "max_views": 5
}

Fetch Paste
GET /api/pastes/:id

HTML View
GET /p/:id


Displays the paste content safely as plain text.

Persistence Layer

The application uses Upstash Redis to store paste data, expiry times, and remaining view counts.
This ensures data persistence across serverless function invocations.

Deployment

The application is deployed on Vercel with environment variables configured for production.

Design Decisions

Next.js API routes were used to avoid a separate backend server

Redis chosen for fast access and serverless compatibility

View count decremented only on API fetch

Environment variables sanitized to handle deployment edge cases


---

