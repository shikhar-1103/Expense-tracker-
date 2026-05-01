# Full-Stack Expense Tracker

A minimal full-stack Expense Tracker with a backend API and a simple frontend UI.

**Live Demo**: [https://expense-tracker-ruddy-phi-85.vercel.app](https://expense-tracker-ruddy-phi-85.vercel.app)

## Tech Stack
- **Framework**: Next.js (App Router) — unified backend API routes and frontend React components in a single repository.
- **Database**: PostgreSQL (hosted on Neon via Vercel Storage)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR (Client-side cache revalidation)
- **Deployment**: Vercel

## Key Design Decisions

### Monorepo Architecture
I chose Next.js App Router to co-locate the backend API routes (`/api/expenses`) and the frontend React components in a single, easily deployable repository. This eliminates CORS issues and simplifies the build process.

### PostgreSQL + Prisma
PostgreSQL was chosen as the production database because it works seamlessly with serverless platforms like Vercel. Prisma provides a robust, type-safe interface to the database with automatic schema management via `prisma db push`.

### Idempotency (Handling Duplicate Requests)
To handle the requirement that "the API should behave correctly even if the client retries the same request," the frontend generates a UUID (`idempotencyKey`) on every form submission. The backend checks this key before creating an expense — if an expense with the same key already exists, it returns the existing record instead of creating a duplicate. This prevents double charges from network retries, page reloads, or accidental double-clicks.

### Money Handling
Amounts are stored as **integers (cents)** in the database (e.g., $10.50 is stored as `1050`). This prevents floating-point inaccuracies that would occur if we used `FLOAT` or `DECIMAL` types when summing large numbers of transactions.

### Per-User Isolation
Each browser session gets a unique user ID (stored in `localStorage`). All expenses are tagged with this ID, so each visitor only sees their own data — no authentication system required.

## Trade-offs and What I Intentionally Did Not Do
- **Full Authentication**: I used browser-based `localStorage` user IDs instead of a full auth system (e.g., NextAuth, OAuth). This keeps the app simple while still providing per-user data isolation.
- **Automated Tests**: Given the timebox, I focused on building a robust idempotency system, a clean UI, and a strongly-typed schema rather than setting up Jest/Vitest.
- **Pagination**: The `GET /expenses` endpoint currently returns all expenses matching the filter. In a real-world scenario with thousands of expenses, cursor-based pagination would be necessary.

## API Endpoints

### `POST /api/expenses`
Create a new expense.

**Request body:**
```json
{
  "idempotencyKey": "uuid-string",
  "userId": "uuid-string",
  "amount": 1050,
  "category": "Food",
  "description": "Lunch at cafe",
  "date": "2025-05-01"
}
```

### `GET /api/expenses`
Return a list of expenses for a user.

**Query parameters:**
- `userId` (required) — filter by user
- `category` (optional) — filter by category (e.g., `Food`, `Transportation`)
- `sort` (optional) — `date_desc` (default, newest first) or `date_asc`

## How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables (create a `.env` file):
   ```bash
   POSTGRES_PRISMA_URL="your-postgres-connection-string"
   POSTGRES_URL_NON_POOLING="your-postgres-direct-connection-string"
   ```

3. Push the schema to your database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.
